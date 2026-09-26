import type { MetadataRoute } from "next";
import { buildRobots } from "@/config/seo.mjs";

export default function robots(): MetadataRoute.Robots {
  return buildRobots() as MetadataRoute.Robots;
}
