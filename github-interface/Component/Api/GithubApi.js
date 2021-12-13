import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github = async () => {
  const octokit = new Octokit({
    auth: "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",
  });
  return octokit;
};
