import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://tylerlaws0n.github.io/",
  base: "/type-level-leetcode/",
  integrations: [tailwind(), mdx()],
});
