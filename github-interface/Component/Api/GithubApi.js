import { Octokit } from "@octokit/rest";

export const auth_github= async() => {
    const octokit = new Octokit({
        auth: "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",
      });
      return octokit
}