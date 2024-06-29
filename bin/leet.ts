#! /usr/bin/env bun

import { createPrompt } from "bun-promptx";
import dedent from "dedent";
import { mkdir } from "node:fs/promises";

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

const addProblem = async (problemId: string, url: string) => {
  console.log(`\nAdding ${problemId} 🥳\n`);

  const basePath = `${process.cwd()}/problems/${problemId}`;

  const problemName = problemId.split("-").map(capitalize).join(" ");

  await mkdir(basePath);

  await Bun.write(`${basePath}/index.ts`, "");
  await Bun.write(
    `${basePath}/README.md`,
    dedent`
    # ${problemName}

    **Problem Description:** ${url}

    <img src="./result.png" />`
  );

  console.log(`Done! 🎉`);
};

const leetcodeUrlMatcher =
  /^(https:\/\/leetcode\.com\/problems\/([^\/]+)\/?)(?:.*)?$/;

const url = createPrompt("Leetcode problem URL: ", { required: true });

if (url.error || !url.value) {
  console.error(url.error);
  process.exit(1);
} else {
  const matchUrl = url.value.match(leetcodeUrlMatcher);
  if (!matchUrl) {
    console.error("Invalid URL:", url.value);
    process.exit(1);
  } else {
    const [_, url, problemId] = matchUrl;

    await addProblem(problemId, url);
  }
}
