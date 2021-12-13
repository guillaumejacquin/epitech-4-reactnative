import { Octokit } from "@octokit/rest";
import { DrawerActions } from "@react-navigation/routers";

export const auth_github= async() => {
    const octokit = new Octokit({
        auth: "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",
      });
      // const { orgs } = await octokit.request('GET /organizations').then(orgs => {
      //   console.log(orgs.data[3].login)
      //   octokit.request('GET /orgs/{org}/repos', {
      //    org: orgs.data[0].login
      //   }).then(repos => {
      //     // console.log(repos)
      //   })
      // })
      return octokit
}