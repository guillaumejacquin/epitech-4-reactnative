import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github = async () => {
  const octokit = new Octokit({
    auth: "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",
  });
  return octokit;
};
