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
  Button,
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";

const Repositories = ({ route, navigation, octokit }) => {
  const org = route.params?.org;
  const [repositories, setRepositories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getRepos().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Createrepo");
          }}
        >
          <Image
            source={require("../../Image/plus.png")}
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const getRepos = async () => {
    await octokit.request("GET /user/repos").then((res) => {
      setRepositories(res.data);
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getRepos();
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flexDirection: "column", marginVertical: 15 }}>
          {/* Repo list */}
          {repositories.map((repo) => (
            <TouchableOpacity
              key={repo.name}
              onPress={() => {
                navigation.navigate("Repository", { repo: repo });
              }}
            >
              <View style={styles.statBar}>
                <Text style={styles.cardTitle}>{repo.name}</Text>
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
export default connectComponent(Repositories);
