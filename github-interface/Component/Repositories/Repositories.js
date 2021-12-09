import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'


const Repositories = ({route, navigation, octokit}) => {
    const data = route.params;

    const [repositories, setRepositories] = useState([]);


    const getRepos = async() => {
        const {data} = await octokit.request('GET /user/repos')
        return data
    }

    useEffect(() => {
        getRepos().then(repos => {
            setRepositories(repos)
        })
    }, [octokit])
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 15}}>

                  {/* Repo list */}
                  {repositories.map(repo => (
                    <TouchableOpacity key={repo.name} onPress={() => {navigation.navigate("Repository", {repo: repo})}}>
                        <View style={styles.statBar}>
                            <Text style={styles.cardTitle}>
                                {repo.name}
                            </Text>
                            <View style={{alignItems: "center"}}>
                                <Icon style={{marginRight: 20, marginLeft: 10}} name='arrow-right' />
                            </View>
                        </View>

                    </TouchableOpacity>
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
    cardTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 20
    },
})

const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(Repositories)