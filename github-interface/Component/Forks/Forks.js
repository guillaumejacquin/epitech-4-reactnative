import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'


const Forks = ({route, navigation, octokit}) => {
    const repo = route.params.repo;

    const [forks, setForks] = useState([]);


    const getForks = async () => {
        await octokit.request('GET /repos/{owner}/{repo}/forks', {
            owner: repo.owner.login,
            repo: repo.name,
          }).then(res => {
              setForks(res.data)
          })
    }
    useEffect(() => {
        getForks()
    }, [])
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 15}}>

                  {forks.map(fork => (
                    <View style={styles.statBar}>
                        <View>
                            <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.cardTitle}>
                                {fork.owner.login}
                            </Text>
                            <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.login}>
                                {fork.name}
                            </Text>
                        </View>
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
    login: {
        fontSize: 20,
        fontWeight: "400",
        marginLeft: 20
    },
})

const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(Forks)