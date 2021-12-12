import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { Buffer } from 'buffer';


const PullRequests = ({route, navigation, octokit}) => {
    const repo = route.params.repo
    const max = 8

    const [pullRequestsOpen, setPullRequestsOpen] = useState([]);
    const [pullRequestsClose, setPullRequestsClose] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPullRequests()
        })
    }, [navigation])

    const getPullRequests = async () => {
        await octokit.request('GET /repos/{owner}/{repo}/pulls', {
            owner: repo.owner.login,
            repo: repo.name,
            state: 'open'
          }).then(res => {
              setPullRequestsOpen(res.data)
          })
          await octokit.request('GET /repos/{owner}/{repo}/pulls', {
            owner: repo.owner.login,
            repo: repo.name,
            state: 'close'
          }).then(res => {
              setPullRequestsClose(res.data)
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
                  <View style={{marginVertical: 10}}>


                      {pullRequestsOpen.length ? 
                      <View style={styles.statBar2}>
                        <View style={{maxWidth: "70%"}}>
                            <Text style={styles.title}>
                                Open
                            </Text>
                        </View>
                      {pullRequestsOpen.map((pr, index) => (
                        <TouchableOpacity key={index} onPress={() => {navigation.navigate("Pull request", {pullRequest: pr})}}>
                            <View style={styles.statBar}>
                                <View style={{maxWidth: "70%"}}>
                                    <Text style={styles.title} ellipsizeMode={"tail"} numberOfLines={1}>
                                        {pr.title}
                                    </Text>
                                </View>
                                <View style={{flexDirection: "row", alignItems: "center", marginRight: 10}}>
                                    <View style={{flexDirection: "column"}}>
                                        <Text style={styles.branch}>
                                            {((pr.head.ref).length > max) ? 
                                                (('...' + pr.head.ref.slice().substring((pr.head.ref).length - max, (pr.head.ref).length))) : 
                                                pr.head.ref}
                                        </Text>
                                        <Text style={styles.branch}>
                                            {((pr.base.ref).length > max) ? 
                                                (('...' + pr.base.ref.slice().substring((pr.base.ref).length - max, (pr.base.ref).length))) : 
                                                pr.base.ref}
                                        </Text>
                                    </View>
                                    <Icon name='level-down-alt' type='font-awesome-5' size={14}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        ))}
                        </View>
                        : null}
                  </View>
                  
                  <View>
                    {pullRequestsClose.length ?

                      <View style={styles.statBar2}>
                        <View style={{maxWidth: "70%"}}>
                            <Text style={styles.title}>
                                Close
                            </Text>
                        </View>
                    
                      {pullRequestsClose.map((pr, index) => (
                        <TouchableOpacity key={index} onPress={() => {navigation.navigate("Pull request", {pullRequest: pr})}}>
                            <View style={styles.statBar}>
                                <View style={{maxWidth: "70%"}}>
                                    <Text style={styles.title} ellipsizeMode={"tail"} numberOfLines={1}>
                                        {pr.title}
                                    </Text>
                                </View>
                                <View style={{flexDirection: "row", alignItems: "center", marginRight: 10}}>
                                    <View style={{flexDirection: "column"}}>
                                        <Text style={styles.branch}>
                                            {((pr.head.ref).length > max) ? 
                                            (('...' + pr.head.ref.slice().substring((pr.head.ref).length - max, (pr.head.ref).length))) : 
                                            pr.head.ref}
                                        </Text>
                                        <Text style={styles.branch}>
                                            {((pr.base.ref).length > max) ? 
                                            (('...' + pr.base.ref.slice().substring((pr.base.ref).length - max, (pr.base.ref).length))) : 
                                            pr.base.ref}
                                        </Text>
                                    </View>
                                    <Icon name='level-down-alt' type='font-awesome-5' size={14}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        ))}
                        </View>
                    : null}
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
        statBar2: {
            flexDirection: "column",
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
    branch: {
        textAlign: 'right',
        fontSize: 10,
        fontWeight: "400",
        marginRight: 3
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