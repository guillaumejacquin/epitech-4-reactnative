import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Image, View, TouchableOpacity, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { Buffer } from 'buffer';



const Repository = ({route, navigation, octokit}) => {
    const repo = route.params.repo;

    const [repoName, setRepoName] = useState(repo.name);
    const [orgName, setOrgName] = useState("org");
    const [link, setLink] = useState("todo");
    const [stars, setStars] = useState(repo.stargazers_count);
    const [forks, setForks] = useState(repo.forks_count);
    const [numberOfLines, setNumberOfLines] = useState(5);
    const [watchers, setWatchers] = useState(repo.watchers_count);
    // const [repositories, setRepositories] = useState(null);
    const [starred, setStarred] = useState("todo");
    const [readme, setReadme] = useState("");
    const [contributors, setContributors] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState(repo.description);
    const [starsStatus, setstarsStatus] = useState(false)
    const showConfirmDialog = () => {
        return Alert.alert(
          "Are your sure?",
          `Are you sure you want to remove ${repo.name}?`,
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: () => {
                deleteRepo();
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
      };

    const getStars = () => {
        octokit.rest.activity.starRepoForAuthenticatedUser({
            owner: repo.owner.login,
            repo: repo.name
          })
    }

    const getStarsRepo = async() => {

         await octokit.request('GET /user/starred/{owner}/{repo}',{
            owner: repo.owner.login,
            repo: repo.name
          }).then(res => {
              if(res.status === 204)
                  setstarsStatus(true);
          }).catch(e => {
            setstarsStatus(false);
          });
    }

    useEffect(() => {
        getStarsRepo()
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{fontSize:16}} onPress={getStars}>
                    <Text>Add Stars</Text>
                </TouchableOpacity>
            )},
        )
    }, [])

    useEffect(() => {
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
    }, [octokit])

    const deleteRepo = () =>{
        octokit.rest.repos.delete({
            owner:repo.owner.login,
            repo: repo.name,
          }).then(res => {
              navigation.goBack()
              console.log(res);
          });
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginTop: 30}}>

                    {/* Head: Image, repo & organization names */}
                  <View style={{flexDirection: "row", marginLeft: 30}}>
                    { imageUrl ? 
                        <Image source={{uri: imageUrl}} style={{width: 72.53, height: 72.53, borderRadius: 72.53/ 2}} />
                    : null }

                    <View style={{flexDirection: "column", marginLeft: 10, justifyContent: "space-around"}}>
                        <Text style={styles.repositoryText}>{repoName}</Text>
                        <Text style={styles.organizationText}>{orgName}</Text>
                    </View>
                  </View>

                    {/* Description */}
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

                  {/* Infos */}
                  <View style={{flexDirection: "row", marginLeft: 20, marginVertical: 2}}>
                    <Icon name='link' />
                    <Text style={styles.infos}>
                        {link}
                    </Text>
                  </View>
                  <View style={{flexDirection: "row", marginLeft: 20, marginVertical: 2}}>
                    <Icon name='star' />
                    <Text style={styles.infos}>
                        {stars}
                    </Text>
                  </View>
                  <View style={{flexDirection: "row", marginLeft: 20, marginVertical: 2}}>
                    <Icon name='link' />
                    <Text style={styles.infos}>
                        {forks}
                    </Text>
                  </View>

                  {/* Stats */}
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
                    <View style={styles.statBar}>
                        <Text style={styles.title}>
                            Starred
                        </Text>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={styles.title}>
                                {starred}
                            </Text>
                            <Icon style={{marginRight: 20, marginLeft: 10}} name='star' />
                        </View>
                    </View>
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
                  </View>

                  {/* Readme */}
                  <Text style={styles.descriptionText}>
                    {readme}
                  </Text>
              </View>
              <Button title="delete" onPress={showConfirmDialog} />
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
export default connectComponent(Repository)