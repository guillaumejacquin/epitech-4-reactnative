import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github= async() => {
    const octokit = new Octokit({
        auth: "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",
      });
      return octokit
}