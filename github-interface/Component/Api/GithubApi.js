import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github = async () => {
  const octokit = new Octokit({
    auth: "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",
  });
  return octokit;
};
