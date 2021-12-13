import React, { useEffect, useState, useRef } from "react";
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

const Users = ({ route, navigation, octokit }) => {
  const input = route.params?.input;
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPage(1);
    getUsers(1).then(() => setRefreshing(false));
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

  useEffect(() => {
    mounted.current = true;
    const unsubscribe = navigation.addListener("focus", () => {
      getUsers();
    });
    return () => {
      mounted.current = false;
    };
  }, [navigation]);

  const getUsers = async (page = 1) => {
    if (loading) return;
    setLoading(true);
    octokit.rest.search
      .users({
        q: input,
        page: page,
      })
      .then((res) => {
        if (page > 1) {
          setUsers(users.concat(res.data.items));
          setPage(page);
        } else {
          setUsers(res.data.items);
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
            getUsers(page + 1);
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flexDirection: "column", marginVertical: 15 }}>
          {/* Repo list */}
          {users.map((user, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("User", { user: user });
              }}
            >
              <View style={styles.statBar}>
                <Text style={styles.cardTitle}>{user.login}</Text>
                <View style={{ alignItems: "center" }}>
                  <Icon
                    style={{ marginRight: 20, marginLeft: 10 }}
                    name="arrow-right"
                  />
                </View>
              </View>
            </TouchableOpacity>
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
});

const mapStateToProps = (state) => state;

const connectComponent = connect(mapStateToProps, undefined);
export default connectComponent(Users);
