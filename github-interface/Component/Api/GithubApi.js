import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github = async () => {
  const octokit = new Octokit({
    auth: "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",
  });
  return octokit;
};
