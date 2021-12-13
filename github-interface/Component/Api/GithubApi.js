import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github = async () => {
  const octokit = new Octokit({
    auth: "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",
  });
  return octokit;
};
