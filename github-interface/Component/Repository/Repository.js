import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Image, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Repository() {
    const [repoName, setRepoName] = useState("Repository");
    const [orgName, setOrgName] = useState("Organization");
    const [link, setLink] = useState("reactjs.org");
    const [stars, setStars] = useState("177k stars");
    const [forks, setForks] = useState("35.8k forks");
    const [numberOfLines, setNumberOfLines] = useState(5);
    const [watchers, setWatchers] = useState(26);
    const [repositories, setRepositories] = useState(null);
    const [starred, setStarred] = useState(null);
    const [readme, setReadme] = useState("README \n\nNunc nulla. Suspendisse non nisl sit amet velit hendrerit rutrum. Praesent turpis. \n\nCras dapibus. Pellentesque ut neque. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.\n\nSed lectus. In ut quam vitae odio lacinia tincidunt. Etiam ut purus mattis mauris sodales aliquam.");
    const [contributors, setContributors] = useState(12);
    const [imageUrl, setImageUrl] = useState("https://alrigh.com/wp-content/uploads/2020/06/19-tom-profile-picture.jpg");
    const [description, setDescription] = useState("A declarative, efficient, and flexible JavaScript library for building user interfaces\n\nMaecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.\n\nSed lectus. In ut quam vitae odio lacinia tincidunt. Etiam ut purus mattis mauris sodales aliquam.");

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginTop: 30}}>

                    {/* Head: Image, repo & organization names */}
                  <View style={{flexDirection: "row", marginLeft: 30}}>

                    <Image source={{uri: imageUrl}} style={{width: 72.53, height: 72.53, borderRadius: 72.53/ 2}} />

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
                    <View style={styles.statBar}>
                        <Text style={styles.title}>
                            Repositories
                        </Text>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={styles.title}>
                                {repositories}
                            </Text>
                            <Icon style={{marginRight: 20, marginLeft: 10}} name='folder' />
                        </View>
                    </View>
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
        color: '#99879D',
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
        color: '#99879D',
        fontStyle: "normal",
        fontSize: 20,
        lineHeight: 30,
    },
    infos: {
        color: '#99879D',
        fontSize: 20,
        marginLeft: 10
    }
})