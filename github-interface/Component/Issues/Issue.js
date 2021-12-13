import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  View,
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";

const Issue = ({ route, navigation, octokit }) => {
  const issue = route.params.issue;

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
        <Button 
        onPress={() => {navigation.navigate("Comment", {issue: issue})}}
        title="Comment" type="outline" />
        <Button onPress={() => {
            closeIssue()
        }} title =
        { issue.state === "open" ? "Close Issue" : "Reopen Issue"}
        />
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
});
const mapStateToProps = (state) => state;

const connectComponent = connect(mapStateToProps, undefined);
export default connectComponent(Issue);
