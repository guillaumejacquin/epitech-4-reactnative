import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";

const PullRequests = ({ route, navigation, octokit }) => {
  const repo = route.params.repo;
  const max = 8;
  const [refreshing, setRefreshing] = useState(false);
  const [pullRequestsOpen, setPullRequestsOpen] = useState([]);
  const [pullRequestsClose, setPullRequestsClose] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setPullRequestsOpen([]);
      setPullRequestsClose([]);
      getPullRequests();
    });
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setPullRequestsClose([]);
    setPullRequestsOpen([]);
    setRefreshing(true);
    setPage(1);
    getPullRequests(1).then(() => setRefreshing(false));
  }, []);

  const getPullRequests = async (page = 1) => {
    if (loading) return;
    await octokit
      .request("GET /repos/{owner}/{repo}/pulls", {
        owner: repo.owner.login,
        repo: repo.name,
        state: "open",
        page: page,
      })
      .then((res) => {
        if (page > 1) {
          if (res.data[0]) {
            setPullRequestsOpen(pullRequestsOpen.concat(res.data));
            setPage(page);
          } else setPullRequestsOpen([]);
        } else {
            console.log(res.data[0].state);
            setPullRequestsOpen(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    await octokit
      .request("GET /repos/{owner}/{repo}/pulls", {
        owner: repo.owner.login,
        repo: repo.name,
        state: "close",
      })
      .then((res) => {
        if (page > 1) {
          if (res.data[0]) {
            setPullRequestsClose(pullRequestsClose.concat(res.data));
            setPage(page);
          } else setPullRequestsClose([]);
        } else {
            console.log(res.data[0].state);
            setPullRequestsClose(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        scrollEventThrottle={1000}
        onScroll={({ nativeEvent }) => {
          if (mounted.current && isCloseToBottom(nativeEvent))
            getPullRequests(page + 1);
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Create pull request", { repo: repo });
          }}
        >
          <View style={styles.createView}>
            <Text style={styles.createTitle}>Create a new pull request</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "column" }}>
          {/* Stats */}
          <View style={{ marginVertical: 10 }}>
            {pullRequestsOpen?.length ? (
              <View style={styles.statBar2}>
                <View style={{ maxWidth: "70%" }}>
                  <Text style={styles.title}>Open</Text>
                </View>
                {pullRequestsOpen.map((pr, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("Pull request", { pullRequest: pr });
                    }}
                  >
                    <View style={styles.statBar}>
                      <View style={{ maxWidth: "70%" }}>
                        <Text
                          style={styles.title}
                          ellipsizeMode={"tail"}
                          numberOfLines={1}
                        >
                          {pr.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 10,
                        }}
                      >
                        <View style={{ flexDirection: "column" }}>
                          <Text style={styles.branch}>
                            {pr.head.ref.length > max
                              ? "..." +
                                pr.head.ref
                                  .slice()
                                  .substring(
                                    pr.head.ref.length - max,
                                    pr.head.ref.length
                                  )
                              : pr.head.ref}
                          </Text>
                          <Text style={styles.branch}>
                            {pr.base.ref.length > max
                              ? "..." +
                                pr.base.ref
                                  .slice()
                                  .substring(
                                    pr.base.ref.length - max,
                                    pr.base.ref.length
                                  )
                              : pr.base.ref}
                          </Text>
                        </View>
                        <Icon
                          name="level-down-alt"
                          type="font-awesome-5"
                          size={14}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>

          <View>
            {pullRequestsClose?.length ? (
              <View style={styles.statBar2}>
                <View style={{ maxWidth: "70%" }}>
                  <Text style={styles.title}>Close</Text>
                </View>

                {pullRequestsClose.map((pr, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("Pull request", { pullRequest: pr });
                    }}
                  >
                    <View style={styles.statBar}>
                      <View style={{ maxWidth: "70%" }}>
                        <Text
                          style={styles.title}
                          ellipsizeMode={"tail"}
                          numberOfLines={1}
                        >
                          {pr.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 10,
                        }}
                      >
                        <View style={{ flexDirection: "column" }}>
                          <Text style={styles.branch}>
                            {pr.head.ref.length > max
                              ? "..." +
                                pr.head.ref
                                  .slice()
                                  .substring(
                                    pr.head.ref.length - max,
                                    pr.head.ref.length
                                  )
                              : pr.head.ref}
                          </Text>
                          <Text style={styles.branch}>
                            {pr.base.ref.length > max
                              ? "..." +
                                pr.base.ref
                                  .slice()
                                  .substring(
                                    pr.base.ref.length - max,
                                    pr.base.ref.length
                                  )
                              : pr.base.ref}
                          </Text>
                        </View>
                        <Icon
                          name="level-down-alt"
                          type="font-awesome-5"
                          size={14}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
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
  title: {
    fontSize: 15,
    fontWeight: "400",
    marginLeft: 20,
  },
  branch: {
    textAlign: "right",
    fontSize: 10,
    fontWeight: "400",
    marginRight: 3,
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
    marginLeft: 10,
  },
});

const mapStateToProps = (state) => state;

const connectComponent = connect(mapStateToProps, undefined);
export default connectComponent(PullRequests);
