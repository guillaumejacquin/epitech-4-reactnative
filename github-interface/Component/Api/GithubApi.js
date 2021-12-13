import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github = async () => {
  const octokit = new Octokit({
    auth: "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",
  });
  return octokit;
};
