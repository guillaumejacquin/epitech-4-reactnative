import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";

const Forks = ({ route, octokit }) => {
  const repo = route.params.repo;
  const [refreshing, setRefreshing] = useState(false);
  const [forks, setForks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPage(1);
    getForks(1).then(() => setRefreshing(false));
  }, []);

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

  const getForks = async (page = 1) => {
    if (loading) return;
    setLoading(true);
    await octokit
      .request("GET /repos/{owner}/{repo}/forks", {
        owner: repo.owner.login,
        repo: repo.name,
        page: page,
      })
      .then((res) => {
        if (page > 1) {
          if (res.data[0]) {
            setForks(forks.concat(res.data));
            setPage(page);
          }
        } else {
          setForks(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    mounted.current = true;
    getForks();
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        scrollEventThrottle={1000}
        onScroll={({ nativeEvent }) => {
          if (mounted.current && isCloseToBottom(nativeEvent))
            getForks(page + 1);
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flexDirection: "column", marginVertical: 15 }}>
          {forks.map((fork, index) => (
            <View key={index} style={styles.statBar}>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                  style={styles.cardTitle}
                >
                  {fork.owner.login}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                  style={styles.login}
                >
                  {fork.name}
                </Text>
              </View>
            </View>
          ))}
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
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 20,
  },
  login: {
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 20,
  },
});

const mapStateToProps = (state) => state;

const connectComponent = connect(mapStateToProps, undefined);
export default connectComponent(Forks);
