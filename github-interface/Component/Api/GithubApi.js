import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github= async() => {
    const octokit = new Octokit({
        auth: "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",
      });
      return octokit
}