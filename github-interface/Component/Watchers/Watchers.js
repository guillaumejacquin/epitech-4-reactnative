import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";

const Watchers = ({ route, octokit }) => {
  const repo = route.params.repo;
  const [refreshing, setRefreshing] = useState(false);
  const [watchers, setWatchers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPage(1);
    getWatchers(1).then(() => setRefreshing(false));
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

  const getWatchers = async (page = 1) => {
    if (loading) return;
    setLoading(true);
    await octokit
      .request("GET /repos/{owner}/{repo}/subscribers", {
        owner: repo.owner.login,
        repo: repo.name,
        page: page,
      })
      .then((res) => {
        if (page > 1) {
          if (res.data[0]) {
            setWatchers(watchers.concat(res.data));
            setPage(page);
          }
        } else {
          setWatchers(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    mounted.current = true;
    getWatchers();
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
            getWatchers(page + 1);
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flexDirection: "column", marginVertical: 15 }}>
          {/* Repo list */}
          {watchers.map((watcher, index) => (
            <View key={index} style={styles.statBar}>
              {watcher.avatar_url ? (
                <Image
                  marginLeft={10}
                  source={{ uri: watcher.avatar_url }}
                  style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
                />
              ) : null}
              <Text style={styles.cardTitle}>{watcher.login}</Text>
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
    justifyContent: "flex-start",
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
    marginLeft: 10,
  },
});

const mapStateToProps = (state) => state;

const connectComponent = connect(mapStateToProps, undefined);
export default connectComponent(Watchers);
