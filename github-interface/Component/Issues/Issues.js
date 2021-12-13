import { ExecutionEnvironment } from "expo-constants";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";

const Issues = ({ route, navigation, octokit }) => {
  const repo = route.params?.repo;
  const [openIssues, setOpenIssues] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [closedIssues, setClosedIssues] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getIssues().then(() => setRefreshing(false));
  }, []);

  const getIssues = async () => {
    if (repo) {
        console.log("repo")
      await octokit
        .request("GET /repos/{owner}/{repo}/issues", {
          owner: repo.owner.login,
          repo: repo.name,
          state: "open",
          filter: "all",
        })
        .then((res) => {
          setOpenIssues(res.data);
        })
        .catch((error) => {
          console.log("an error occured: ", error);
        });
      await octokit
        .request("GET /repos/{owner}/{repo}/issues", {
          owner: repo.owner.login,
          repo: repo.name,
          state: "closed",
          filter: "all",
        })
        .then((res) => {
          setClosedIssues(res.data);
        })
        .catch((error) => {
          console.log("an error occured: ", error);
        });
    } else {
        console.log("no repo")
      await octokit
        .request("GET /issues", {
          state: "open",
          filter: "all",
        })
        .then((res) => {
          setOpenIssues(res.data);
        })
        .catch((error) => {
          console.log("an error occured: ", error);
        });
      await octokit
        .request("GET /issues", {
          state: "closed",
          filter: "all",
        })
        .then((res) => {
          setClosedIssues(res.data);
        })
        .catch((error) => {
          console.log("an error occured: ", error);
        });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getIssues()
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {repo ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Create issue", { repo: repo });
            }}
          >
            <View style={styles.createView}>
              <Text style={styles.createTitle}>Create a new issue</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        <View style={{ flexDirection: "column", marginVertical: 15 }}>
          {openIssues.length ? (
            <View style={styles.statBar2}>
              <View style={{ maxWidth: "70%" }}>
                <Text style={styles.title}>Open</Text>
              </View>
              {openIssues.map((issue, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("Issue", { issue: issue });
                  }}
                >
                  <View style={styles.statBar}>
                    <Text style={styles.cardTitle}>{issue.title}</Text>
                    <View style={{ alignItems: "center" }}>
                      <Icon
                        style={{ marginRight: 20, marginLeft: 10 }}
                        name="arrow-right"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
          {closedIssues.length ? (
            <View style={styles.statBar2}>
              <View style={{ maxWidth: "70%" }}>
                <Text style={styles.title}>Closed</Text>
              </View>
              {closedIssues.map((issue, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("Issue", { issue: issue });
                  }}
                >
                  <View style={styles.statBar}>
                    <Text style={styles.cardTitle}>{issue.title}</Text>
                    <View style={{ alignItems: "center" }}>
                      <Icon
                        style={{ marginRight: 20, marginLeft: 10 }}
                        name="arrow-right"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
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
  statBar2: {
    flexDirection: "column",
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
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: "400",
    marginLeft: 20,
  },
  createView: {
    alignItems: "center",
    marginHorizontal: 40,
    paddingVertical: 12,
    marginTop: 10,
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
  createTitle: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
});
const mapStateToProps = (state) => state;

const connectComponent = connect(mapStateToProps, undefined);
export default connectComponent(Issues);
