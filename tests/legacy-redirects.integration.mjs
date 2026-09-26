import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import net from "node:net";
import path from "node:path";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";

import { legacyRedirectManifest } from "../config/legacy-redirects.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const serverEntry = path.join(projectRoot, ".next", "standalone", "server.js");
const requestTimeout = 20_000;

let baseUrl;
let serverProcess;
let serverOutput = "";

function getOpenPort() {
  return new Promise((resolve, reject) => {
    const candidate = net.createServer();
    candidate.unref();
    candidate.on("error", reject);
    candidate.listen(0, "127.0.0.1", () => {
      const address = candidate.address();
      candidate.close(() => resolve(address.port));
    });
  });
}

async function waitForServer(url) {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (serverProcess.exitCode !== null) {
      throw new Error(`Standalone server exited early.\n${serverOutput}`);
    }

    try {
      const response = await fetch(url, {
        redirect: "manual",
        signal: AbortSignal.timeout(1_000),
      });
      if (response.status === 200) return;
    } catch {
      // The standalone server has not started listening yet.
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error(`Timed out waiting for the standalone server.\n${serverOutput}`);
}

async function mapWithConcurrency(items, concurrency, callback) {
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      await callback(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
}

function expectedLocation(destination, search = "") {
  const absolute = /^https?:\/\//.test(destination);
  const url = new URL(destination, baseUrl);
  url.search = search;

  return absolute ? url.href : `${url.pathname}${url.search}${url.hash}`;
}

async function request(pathname) {
  return fetch(`${baseUrl}${pathname}`, {
    redirect: "manual",
    signal: AbortSignal.timeout(requestTimeout),
  });
}

before(async () => {
  assert.ok(
    process.env.CATALOG_API_KEY,
    "CATALOG_API_KEY is required for redirect destination integration tests.",
  );

  const port = await getOpenPort();
  baseUrl = `http://127.0.0.1:${port}`;
  serverProcess = spawn(process.execPath, [serverEntry], {
    cwd: projectRoot,
    env: {
      ...process.env,
      HOSTNAME: "127.0.0.1",
      PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  serverProcess.stdout.on("data", (chunk) => {
    serverOutput += chunk;
  });
  serverProcess.stderr.on("data", (chunk) => {
    serverOutput += chunk;
  });

  await waitForServer(baseUrl);
});

after(async () => {
  if (!serverProcess || serverProcess.exitCode !== null) return;

  serverProcess.kill("SIGTERM");
  await Promise.race([
    once(serverProcess, "exit"),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
});

test("every configured source returns its exact permanent destination", async () => {
  const failures = [];

  await mapWithConcurrency(legacyRedirectManifest, 8, async (redirect) => {
    const response = await request(redirect.source);
    const actual = {
      location: response.headers.get("location"),
      status: response.status,
    };
    const expected = {
      location: expectedLocation(redirect.destination),
      status: 308,
    };

    if (actual.status !== expected.status || actual.location !== expected.location) {
      failures.push({ source: redirect.source, expected, actual });
    }
  });

  assert.deepEqual(failures, []);
});

test("every configured destination succeeds directly without a chain", async () => {
  const uniqueDestinations = [...new Set(legacyRedirectManifest.map(({ destination }) => destination))];
  const failures = [];

  await mapWithConcurrency(uniqueDestinations, 6, async (destination) => {
    const url = new URL(destination, baseUrl);
    url.hash = "";
    const response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(requestTimeout),
    });

    if (response.status < 200 || response.status >= 300) {
      failures.push({
        destination,
        status: response.status,
        location: response.headers.get("location"),
      });
    }
  });

  assert.deepEqual(failures, []);
});

test("query strings are preserved for every redirect", async () => {
  const failures = [];

  await mapWithConcurrency(legacyRedirectManifest, 8, async (redirect) => {
    const response = await request(`${redirect.source}?source=redirect-test`);
    const actual = response.headers.get("location");
    const expected = expectedLocation(redirect.destination, "?source=redirect-test");

    if (response.status !== 308 || actual !== expected) {
      failures.push({ source: redirect.source, expected, actual, status: response.status });
    }
  });

  assert.deepEqual(failures, []);
});

test("case and trailing-slash variants resolve directly", async () => {
  const failures = [];

  await mapWithConcurrency(legacyRedirectManifest, 8, async (redirect) => {
    const variants = [redirect.source.toUpperCase(), `${redirect.source}/`];

    for (const variant of variants) {
      const response = await request(variant);
      const actual = response.headers.get("location");
      const expected = expectedLocation(redirect.destination);

      if (response.status !== 308 || actual !== expected) {
        failures.push({ variant, expected, actual, status: response.status });
      }
    }
  });

  assert.deepEqual(failures, []);
});

test("an unknown legacy path remains not found", async () => {
  const response = await request("/legacy-path-that-never-existed");
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("location"), null);
});
