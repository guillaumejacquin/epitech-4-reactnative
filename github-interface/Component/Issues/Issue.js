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
import { Input, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";

const Issue = ({ route, navigator, octokit }) => {
  const issue = route.params.issue;
  const repos = route.params.repos;

  const [comment, setComment] = useState({});
  const [closed, setClosed] = useState();
  const description = () => {
    if (issue.body) {
      return issue.body;
    }
    return "No description provided";
  };

  const closeIssue = async () => {
    console.log("test this", repos);
    //await octokit.rest.issues.lock({
    //    owner: issue.user.login,
    //    repo: issue.name,
    //    issue_number: issue.number,
    //}).then(res =>
    //    setClosed(res)
    //);
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

  const getComments = async () => {
    console.log(issue);
    //console.log(issue.number)
    //const data = issue.comments_url;
    //console.log("TESTTTT",data)
    //        await octokit.rest.issues.listComments({
    //        owner: issue.owner.login,
    //        repo: issue.repository.name,
    //        issue_number: issue.number,
    //      }).then(res =>
    //        setComments(res))
    //        .catch(error =>
    //            console.log("an error occured", error)
    //        );
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

  useEffect(() => {
    getComments();
  }, [octokit]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
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
            <Text>Assignees</Text>
            {getAssignees()}
          </View>
        </View>
        <View style={styles.statBar}>
          <Input
            placeholder="Comment..."
            onChangeText={(value) => setComment({ comment: value })}
          />
          <Icon reserve name="sc-telegram" type="evilicon" color="#517fa4" />
        </View>

        <View style={{ marginVertical: 10 }}>
            <TouchableOpacity
              onPress={() => {
                closeIssue()
              }}
            >
              <View style={styles.commentView}>
                <Text style={styles.closeTitle}>Comment</Text>
              </View>
            </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 10 }}>
            <TouchableOpacity
              onPress={() => {
                closeIssue()
              }}
            >
              <View style={styles.closeView}>
                <Text style={styles.closeTitle}>{issue.state == "open" ? "Close" : "Open"} pull request</Text>
              </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statBar: {
    alignItems: "center",
    flexDirection: "row",
    //marginHorizontal: 20,
    marginVertical: 12,
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
  cardTitle: {
    fontSize: 20,
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
