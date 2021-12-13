import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github = async () => {
  const octokit = new Octokit({
    auth: "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",
  });
  return octokit;
};
