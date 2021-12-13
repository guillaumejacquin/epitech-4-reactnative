import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";

const Issue = ({ route, navigation, octokit }) => {
  const issue = route.params.issue;
  //const [issue, setIssue] = useState()
//
  //const getIssue = async () => {
  //  await octokit.rest.issues.get({
  //    owner: oldIssue.repository.owner.login,
  //    repo: oldIssue.repository.name,
  //    issue_number: oldIssue.number,
  //  }).then(res => {setIssue(res)})
  //    .catch( error => console.log(error));
  //}

  const description = () => {
    if (issue.body) {
      return issue.body;
    }
    return "No description provided";
  };

  const closeIssue = async () => {
    await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
        owner: issue.repository.owner.login,
        repo: issue.repository.name,
        issue_number: issue.number,
        state: issue.state === "closed" ? "open" : "closed"
    }).then(res =>
        console.log(res)
        ).catch(error => {
            console.log("An error occured: ", error)
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
        )): "";
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

    const getComments = async() => {
      console.log("test")
        await octokit.rest.issues.listComments({
            owner: issue.repository.owner.login,
            repo: issue.repository.name,
            issue_number: issue.number,
        }).then(res =>
            setComments(res.data))
        .catch(error =>
                console.log("an error occured", error)
        );
  }

    useEffect(() => {
      getIssue()
      getComments()
  }, [octokit/*, issue*/])

  if (issue)
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
            <Text>Assignees: </Text>
            {getAssignees()}
          </View>
          <ScrollView>
            <View style={{margin:10}}>
                <Text>Created at: {(Date(issue.created_at)).split("G")[0]}</Text>
                <Text>Author: {issue.repository.owner.login}</Text>
            </View>
        </ScrollView>
        </View>
        {comments.map((comment, index) => (
            <View key={index} style={styles.statBar}>
            <Text style={styles.cardTitle}>
                  {comment.body}
            </Text>
            </View>
        ))}
        <Button 
        onPress={() => {navigation.navigate("postComment", {issue: issue})}}
        title="Comment" type="outline" />
        <Button onPress={() => {
            closeIssue()
        }} title =
        { issue.state === "open" ? "Close Issue" : "Reopen Issue"}
        />
      </ScrollView>
    </SafeAreaView>
  );
  else {
    return <ActivityIndicator/>
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
});
const mapStateToProps = (state) => state;

const connectComponent = connect(mapStateToProps, undefined);
export default connectComponent(Issue);
