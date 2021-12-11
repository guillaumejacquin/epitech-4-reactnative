import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'


const Watchers = ({route, navigation, octokit}) => {
    const repo = route.params.repo;

    const [watchers, setWatchers] = useState([]);


    const getWatchers = async () => {
        await octokit.request('GET /repos/{owner}/{repo}/subscribers', {
            owner: repo.owner.login,
            repo: repo.name,
          }).then(res => {
              setWatchers(res.data)
          })
    }
    useEffect(() => {
        getWatchers()
    }, [])
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 15}}>

                  {/* Repo list */}
                  {watchers.map(watcher => (
                    <View style={styles.statBar}>
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
export default connectComponent(Watchers)