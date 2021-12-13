import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Image, View, TouchableOpacity, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'


const Contributors = ({route, navigation, octokit}) => {
    const repo = route.params.repo;

    const [refreshing, setRefreshing] = useState(false);
    const [contributors, setContributors] = useState([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getContributors().then(() => setRefreshing(false));
      }, []);

    const getContributors = async () => {
        await octokit.request('GET /repos/{owner}/{repo}/contributors', {
            owner: repo.owner.login,
            repo: repo.name,
          }).then(res => {
              setContributors(res.data)
          })
    }
    useEffect(() => {
        getContributors()
    }, [])
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
              <View style={{flexDirection: "column", marginVertical: 15}}>

                  {/* Repo list */}
                  {contributors.map((watcher, index) => (
                    <View key={index} style={styles.statBar}>
                        { watcher.avatar_url ? 
                        <Image marginLeft={10} source={{uri: watcher.avatar_url}} style={{width: 40, height: 40, borderRadius: 40/ 2}} />
                        : null }
                        <Text style={styles.cardTitle}>
                            {watcher.login}
                        </Text>
                    </View>

                  ))}
                  

              </View>
          </ScrollView>
        </SafeAreaView>
    )
}

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
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 5,
            height: 5}
        },
    cardTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 10
    },
})

const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(Contributors)