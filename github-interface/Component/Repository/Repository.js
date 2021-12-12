import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Image, View, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native';
import { Buffer } from 'buffer';



const Repository = ({route, navigation, octokit}) => {
    const repo = route.params.repo;

    const [repoName, setRepoName] = useState(repo.name);
    const [stars, setStars] = useState(repo.stargazers_count);
    const [forks, setForks] = useState(repo.forks_count);
    const [numberOfLines, setNumberOfLines] = useState(5);
    const [watchers, setWatchers] = useState(repo.watchers_count);
    const [readme, setReadme] = useState("");
    const [contributors, setContributors] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState(repo.description);
    const [starsStatus, setstarsStatus] = useState(false)

    

    const getStars = () => {
        if(starsStatus){

            octokit.rest.activity.unstarRepoForAuthenticatedUser({
                owner: repo.owner.login,
                repo: repo.name
            }).then(() => {
                setstarsStatus(false)
            })

        }
        else{
            octokit.rest.activity.starRepoForAuthenticatedUser({
                owner: repo.owner.login,
                repo: repo.name
            }).then(() => {
                setstarsStatus(true)
            })
        }
    }

    const getStarsRepo = async() => {

         var result = await octokit.request('GET /user/starred/{owner}/{repo}',{
            owner: repo.owner.login,
            repo: repo.name
          }).then(res => {
              if(res.status === 204)
                  setstarsStatus(true);
          }).catch(e => {
            setstarsStatus(false);
          });

          return result;
    }
    
    const deleteRepository = () => {
        Alert.alert(
            "Warring",
            "Delete a repository is irreversible, do you really want to delete this repository?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Yes", onPress: () => {
                octokit.request('DELETE /repos/{owner}/{repo}', {
                    owner: repo.owner.login,
                    repo: repo.name
                  }).then(res => {
                    navigation.dispatch(CommonActions.goBack())
                  })
              } }
            ]
          );
    }

    useEffect(() => {
        getStarsRepo()
        console.log(starsStatus);
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{fontSize:16}} onPress={getStars}>
                    {
                        starsStatus ?
                        <Image source={require('../../Image/stars.png')} style={{width:15, height:15}} /> :
                        <Image source={require('../../Image/unstars.png')} style={{width:15, height:15}} /> 

                    }
                </TouchableOpacity>
            )},
        )
        // Get num contributors
        octokit.request('GET /repos/{owner}/{repo}/stats/contributors', {
            owner: repo.owner.login,
            repo: repo.name
          }).then(res => { setContributors(res.data?.length ? res.data.length : 0) })

        // Get the readme; Todo: decode base64
        octokit.request('GET /repos/{owner}/{repo}/readme', {
            owner: repo.owner.login,
            repo: repo.name
          }).then(res => {
            setReadme(res.data.content ? Buffer.from(res.data.content, 'base64').toString('ascii') : '')}).catch(err => {setReadme("")})
        // Get Profile image
        octokit.request('GET /user').then(res => {setImageUrl(res.data.avatar_url)})
    }, [octokit, starsStatus])


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginTop: 30}}>

                  <View style={{flexDirection: "row", marginLeft: 20}}>
                    { imageUrl ? 
                        <Image source={{uri: imageUrl}} style={{width: 72.53, height: 72.53, borderRadius: 72.53/ 2}} />
                    : null }

                    <View style={{flexDirection: "column", marginLeft: 10, justifyContent: "space-around", maxWidth: 200 }}>
                        <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.repositoryText}>{repoName}</Text>
                        <Text style={styles.organizationText}>{repo.owner.login}</Text>
                    </View>
                  </View>

                    {description ? 
                    <Text style={styles.descriptionText}
                    numberOfLines={numberOfLines}
                    ellipsizeMode={"tail"}
                    onPress={() => {
                        if (numberOfLines == 5)
                            setNumberOfLines(0)
                        else
                            setNumberOfLines(5)
                    }}>
                        {description}
                    </Text>
                    : <View marginVertical={15}></View>
                    }

                  {/* Infos */}
                  <View style={{flexDirection: "row", marginHorizontal: 20, marginVertical: 2}}>
                  <View width={30}>
                        <Icon type='font-awesome-5' name='code-branch' />
                      </View>
                    <Text style={styles.infos}>
                        {repo.default_branch}
                    </Text>
                  </View>
                  <View style={{flexDirection: "row", marginHorizontal: 20, marginVertical: 2}}>
                  <View width={30}>
                        <Icon type='font-awesome-5' name='star' />
                      </View>
                    <Text style={styles.infos}>
                        {stars}
                    </Text>
                  </View>

                  <View style={{marginVertical: 20}}>
                    <TouchableOpacity onPress={() => {navigation.navigate("Repository browser", {repo: repo})}}>
                        <View style={styles.statBar}>
                            <Text style={styles.title}>
                                Repository
                            </Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon style={{marginRight: 20, marginLeft: 10}} name='folder' />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate("Pull requests", {repo: repo})}}>
                        <View style={styles.statBar}>
                            <Text style={styles.title}>
                                Pull request
                            </Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon style={{marginRight: 20, marginLeft: 10}} name='folder' />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate("Forks", {repo: repo})}}>
                        <View style={styles.statBar}>
                            <Text style={styles.title}>
                                Forks
                            </Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Text style={styles.title}>
                                    {forks}
                                </Text>
                                <Icon style={{marginRight: 20, marginLeft: 15}} type='font-awesome-5' name='code-branch' />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate("Watchers", {repo: repo})}}>
                        <View style={styles.statBar}>
                            <Text style={styles.title}>
                                Watchers
                            </Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Text style={styles.title}>
                                    {watchers}
                                </Text>
                                <Icon style={{marginRight: 20, marginLeft: 10}} name='group' />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.statBar}>
                            <Text style={styles.title}>
                                Contributors
                            </Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Text style={styles.title}>
                                    {contributors}
                                </Text>
                                <Icon style={{marginRight: 20, marginLeft: 10}} name='group' />
                            </View>
                        </View>
                  </View>

                  {readme ? 
                    <Text style={styles.descriptionText}>
                        {readme}
                    </Text>
                  : null}
                  <TouchableOpacity
                    onPress={() => {
                        deleteRepository()
                    }}
                    >
                    <View style={styles.deleteView}>
                        <Text style={styles.deleteTitle}>Delete repository</Text>
                    </View>
                </TouchableOpacity>
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
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 20
    },
    organizationText: {
        color: 'darkgray',
        fontStyle: "normal",
        fontSize: 20,
        lineHeight: 19,
    },
    repositoryText: {
        fontSize: 25,
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
    },
    deleteView: {
        alignItems: "center",
        marginHorizontal: 60,
        marginBottom: 20,
        paddingVertical: 12,
        marginTop: 10,
        backgroundColor: "red",
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowOffset: {
          width: 5,
          height: 5,
        },
      },
      deleteTitle: {
        fontSize: 15,
        fontWeight: "600",
        textAlign: "center",
        color: "white",
      },
})

const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(Repository)