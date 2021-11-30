import { Octokit } from "@octokit/rest";

export const auth_github= async() => {
    const octokit = new Octokit({
        auth: "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",
      });
    //   const { data } = await octokit.request("/user");
      return octokit
}