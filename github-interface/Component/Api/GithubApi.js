import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github = async () => {
  const octokit = new Octokit({
    auth: "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",
  });
  return octokit;
};
