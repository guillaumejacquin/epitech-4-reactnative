import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github= async() => {
    const octokit = new Octokit({
        auth: "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",
      });
      return octokit
}