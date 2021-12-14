import { ExecutionEnvironment } from "expo-constants";
import React, { useEffect, useState, useRef } from "react";
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
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";

const Issues = ({ route, navigation, octokit }) => {
  const repo = route.params?.repo;
  const input = route.params?.input;
  const [issues, setIssues] = useState([]);
  const [openIssues, setOpenIssues] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [closedIssues, setClosedIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPage(1);
    getIssues(1).then(() => setRefreshing(false));
  }, []);

  const getIssues = async (page = 1) => {
    if (loading) return;
    setLoading(true);
    if (repo) {
      await octokit
        .request("GET /repos/{owner}/{repo}/issues", {
          owner: repo.owner.login,
          repo: repo.name,
          state: "open",
          filter: "all",
          page: page,
        })
        .then((res) => {
          if (page > 1) {
            setOpenIssues(openIssues.concat(res.data));
            setPage(page);
          } else {
            setOpenIssues(res.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
      await octokit
        .request("GET /repos/{owner}/{repo}/issues", {
          owner: repo.owner.login,
          repo: repo.name,
          state: "closed",
          filter: "all",
          page: page,
        })
        .then((res) => {
          if (page > 1) {
            setClosedIssues(closedIssues.concat(res.data));
            setPage(page);
          } else {
            setClosedIssues(res.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else if (input) {
      await octokit
        .request("GET /search/issues", {
          q: input,
          page: page,
        })
        .then((res) => {
          if (page > 1) {
            setIssues(issues.concat(res.data.items));
            setPage(page);
          } else {
            setIssues(res.data.items);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      await octokit
        .request("GET /issues", {
          state: "open",
          filter: "all",
          page: page,
        })
        .then((res) => {
          if (page > 1) {
            setOpenIssues(openIssues.concat(res.data));
            setPage(page);
          } else {
            setOpenIssues(res.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
      await octokit
        .request("GET /issues", {
          state: "closed",
          filter: "all",
          page: page,
        })
        .then((res) => {
          if (page > 1) {
            setClosedIssues(closedIssues.concat(res.data));
            setPage(page);
          } else {
            setClosedIssues(res.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    mounted.current = true;
    const unsubscribe = navigation.addListener("focus", () => {
      setIssues([]);
      getIssues();
    });
    return () => {
      mounted.current = false;
    };
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        scrollEventThrottle={1000}
        onScroll={({ nativeEvent }) => {
          if (mounted.current && isCloseToBottom(nativeEvent))
            getIssues(page + 1);
        }}
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
                    if (!input)
                      navigation.navigate("Issue", { issue: issue, repo: repo });
                    else navigation.navigate("Details", { data: issue });
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
                    if (!input)
                      navigation.navigate("Issue", { issue: issue, repo: repo });
                    else navigation.navigate("Details", { data: issue });
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
          {issues.length
            ? issues.map((issue, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (!input)
                      navigation.navigate("Issue", { issue: issue, repo: repo });
                    else navigation.navigate("Details", { data: issue });
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
              ))
            : null}
          <ActivityIndicator animating={loading} />
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
