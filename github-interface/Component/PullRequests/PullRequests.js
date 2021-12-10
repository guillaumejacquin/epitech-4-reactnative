import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { Buffer } from 'buffer';


const PullRequests = ({route, navigation, octokit}) => {
    const repo = route.params.repo;

    const [pullRequests, setPullRequests] = useState([]);

    useEffect(() => {
        getPullRequests()
    }, [navigation])

    const getPullRequests = async () => {
        await octokit.request('GET /repos/{owner}/{repo}/pulls', {
            owner: repo.owner.login,
            repo: repo.name,
          }).then(res => {
              console.log(res.data)
              setPullRequests(res.data)
          })
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <TouchableOpacity onPress={() => {navigation.navigate("Create pull request", {repo: repo})}}>
                        <View style={styles.createView}>
                            <Text style={styles.createTitle}>
                                Create a new pull request
                            </Text>
                        </View>
                    </TouchableOpacity>
          <ScrollView>
              <View style={{flexDirection: "column"}}>

                  {/* Stats */}
                  <View style={{marginVertical: 20}}>
                      {pullRequests.map(pr => (
                    <TouchableOpacity onPress={() => {navigation.navigate("Pull request", {pullRequest: pr})}}>
                        <View style={styles.statBar}>
                            <Text style={styles.title} ellipsizeMode={"tail"} numberOfLines={2}>
                                {pr.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                        ))}
                    
                  </View>
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
        justifyContent: "space-between",
        paddingVertical: 12,
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 5,
            height: 5}
        },
    title: {
        fontSize: 15,
        fontWeight: "400",
        marginLeft: 20
    },
    title: {
        fontSize: 15,
        fontWeight: "400",
        marginLeft: 20
    },
    createView: {
        alignItems: "center",
        marginHorizontal: 40,
        paddingVertical: 12,
        marginTop: 10,
        backgroundColor: "green",
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 5,
            height: 5
        }
    },
    createTitle: {
        fontSize: 15,
        fontWeight: "600",
        textAlign: 'center',
        color: 'white',
    },
    organizationText: {
        color: 'darkgray',
        fontStyle: "normal",
        fontSize: 20,
        lineHeight: 19,
    },
    repositoryText: {
        fontSize: 30,
        fontWeight: "700"
    },
    descriptionText: {
        marginVertical: 30,
        marginHorizontal: 20,
        color: 'darkgray',
        fontStyle: "normal",
        fontSize: 20,
        lineHeight: 30,
    },
    infos: {
        color: 'darkgray',
        fontSize: 20,
        marginLeft: 10
    }
})

const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(PullRequests)