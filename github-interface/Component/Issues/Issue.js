import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { connect } from "react-redux";

const Issue = ({ route, navigation, octokit }) => {
  const [refreshing, setRefreshing] = useState(false);
  const issue = route.params.issue;
  const repo = route.params.repo;

  const description = () => {
    if (issue.body) {
      return issue.body;
    }
    return "No description provided";
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getComments().then(() => setRefreshing(false));
  }, []);

  const closeIssue = async () => {
    await octokit
      .request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
        owner: repo ? repo.owner.login : issue.repository.owner.login,
        repo: repo ? repo.name : issue.repository.name,
        issue_number: issue.number,
        state: issue.state === "closed" ? "open" : "closed",
      })
      .then((res) => navigation.dispatch(CommonActions.goBack()))
      .catch((error) => {
        console.log("An error occured: ", error);
      });
  };

  const getAssignees = () => {
    return issue.assignees
      ? issue.assignees.map((assignee, index) => (
          <Image
            key={index}
            source={{ uri: assignee.avatar_url }}
            style={{ width: 30, height: 30, borderRadius: 30 / 2 }}
          />
        ))
      : "";
  };

  const openClosed = () => {
    if (issue.state == "open") {
      return (
        <View
          style={{
            height: 40,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: "#2da44e",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 15, color: "white" }}>Open</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            height: 40,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: "#5c5de5",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 15, color: "white" }}>Closed</Text>
        </View>
      );
    }
  };

  const [comments, setComments] = useState([]);

  const getComments = async () => {
    await octokit.rest.issues
      .listComments({
        owner: repo ? repo.owner.login : issue.repository.owner.login,
        repo: repo ? repo.name : issue.repository.name,
        issue_number: issue.number,
      })
      .then((res) => setComments(res.data))
      .catch((error) => console.log("an error occured", error));
  };

  useEffect(() => {
    getComments();
  }, [octokit]);

  if (issue)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.body}>
            <View
              style={{
                borderBottomWidth: 1,
                padding: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <View style={{ width: "70%", height: "100%" }}>
                <Text>{issue.title}</Text>
              </View>
              {openClosed()}
            </View>
            <View style={{ padding: 20, backgroundColor: "white" }}>
              <Text>{description()}</Text>
            </View>
            <View style={{ borderTopWidth: 1, padding: 10 }}>
              <Text>Assignees: </Text>
              {getAssignees()}
            </View>
            <ScrollView>
              <View style={{ margin: 10 }}>
                <Text>Created at: {Date(issue.created_at).split("G")[0]}</Text>
                <Text>Author: </Text>
                <Image
                  source={{
                    uri: repo
                      ? repo.owner.avatar_url
                      : issue.repository.owner.avatar_url,
                  }}
                  style={{ width: 30, height: 30, borderRadius: 30 / 2 }}
                />
              </View>
            </ScrollView>
          </View>
          <Text style={styles.title}>Comments :</Text>
          {comments.map((comment, index) => (
            <View key={index} style={styles.statBar}>
              <Text style={styles.cardTitle}>{comment.body}</Text>
            </View>
          ))}
          <View style={{ marginVertical: 10 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("postComment", { issue: issue });
              }}
            >
              <View style={styles.commentView}>
                <Text style={styles.closeTitle}>Comment</Text>
              </View>
            </TouchableOpacity>
          </View>

          {issue.repository || repo ? (
            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  closeIssue();
                }}
              >
                <View style={styles.closeView}>
                  <Text style={styles.closeTitle}>
                    {issue.state == "open" ? "Close" : "Open"} issue
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  else {
    return <ActivityIndicator />;
  }
};

const styles = StyleSheet.create({
  statBar: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderRadius: 10,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  body: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
  },
  closeView: {
    alignItems: "center",
    marginHorizontal: 60,
    paddingVertical: 12,
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
  commentView: {
    alignItems: "center",
    marginHorizontal: 60,
    paddingVertical: 12,
    backgroundColor: "green",
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
});
const mapStateToProps = (state) => state;

const connectComponent = connect(mapStateToProps, undefined);
export default connectComponent(Issue);
