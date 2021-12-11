import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { CommonActions } from '@react-navigation/native';

const PullRequest = ({ route, navigation, octokit }) => {
  const pr = route.params.pullRequest;
  const [pullRequest, setPullRequest] = useState([]);

  useEffect(() => {
    getPullRequest();
  }, []);

  const getPullRequest = async () => {
    await octokit
      .request("GET /repos/{owner}/{repo}/pulls/{pull_number}", {
        owner: pr.base.repo.owner.login,
        repo: pr.base.repo.name,
        pull_number: pr.number,
      })
      .then((res) => {
        setPullRequest(res.data);
      });
  };

  const closePullRequest = async () => {
    await octokit.request('PATCH /repos/{owner}/{repo}/pulls/{pull_number}', {
        owner: pr.base.repo.owner.login,
        repo: pr.base.repo.name,
        pull_number: pr.number,
        state: pullRequest.state == "open" ? "closed" : "open"
      }).then(res => {
          navigation.dispatch(CommonActions.goBack())
      })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            marginTop: 30,
            marginHorizontal: 10,
          }}
        >
          <View style={{ marginHorizontal: 18 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.status}>Status: {pullRequest.state}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.branch}>{pr.head.ref}</Text>
                  <Text style={styles.branch}>{pr.base.ref}</Text>
                </View>
                <Icon name="level-down-alt" type="font-awesome-5" size={14} />
              </View>
            </View>
            <Text style={styles.prTitle}>{pullRequest.title}</Text>
            <Text style={styles.body}>{pullRequest.body}</Text>
          </View>

          <View style={{ marginVertical: 20 }}>
            <TouchableOpacity
              onPress={() => {
                closePullRequest()
              }}
            >
              <View style={styles.closeView}>
                <Text style={styles.closeTitle}>{pullRequest.state == "open" ? "Close" : "Open"} pull request</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statBar: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 7,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderRadius: 10,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  closeView: {
    alignItems: "center",
    marginHorizontal: 60,
    paddingVertical: 12,
    marginTop: 10,
    backgroundColor: "blue",
    borderRadius: 10,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  closeTitle: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
  prTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 20,
  },
  status: {
    fontSize: 20,
    fontWeight: "700",
  },
  branch: {
    textAlign: "right",
    fontSize: 10,
    fontWeight: "400",
    marginRight: 3,
  },
  body: {
    color: "darkgray",
    fontSize: 15,
    fontWeight: "700",
  },
  organizationText: {
    color: "darkgray",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 19,
  },
  repositoryText: {
    fontSize: 30,
    fontWeight: "700",
  },
  descriptionText: {
    marginVertical: 30,
    marginHorizontal: 20,
    color: "darkgray",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 30,
  },
  infos: {
    color: "darkgray",
    fontSize: 20,
  },
});

const mapStateToProps = (state) => state;

const connectComponent = connect(mapStateToProps, undefined);
export default connectComponent(PullRequest);
