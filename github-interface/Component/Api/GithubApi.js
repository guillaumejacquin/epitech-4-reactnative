import { Octokit } from "@octokit/rest";

export const auth_github = async () => {
  const octokit = new Octokit({
    auth: "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",
  });
  return octokit;
};
