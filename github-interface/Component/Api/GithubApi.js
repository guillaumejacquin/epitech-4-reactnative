import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github = async () => {
  const octokit = new Octokit({
    auth: "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",
  });
  return octokit;
};
