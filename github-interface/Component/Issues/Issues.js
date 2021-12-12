import { ExecutionEnvironment } from 'expo-constants';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'

const Issues = ({navigation, octokit}) => {
    const [openIssues, setOpenIssues] = useState([]);
    const [closedIssues, setClosedIssues] = useState([]);

    const getIssues = async() => {
        await octokit.request('GET /issues', {
            state: 'open',
            filter: 'all'
        }).then(res => {
            setOpenIssues(res.data)
        }).catch(error => {
            console.log("an error occured: ", error)
        });

        await octokit.request('GET /issues',{
            state: 'closed',
            filter: 'all'
        }).then(res => {
            setClosedIssues(res.data)
        }).catch(error => {
            console.log("an error occured: ", error)
        });
    }

    useEffect(() => {
        getIssues().then(res => {
            console.log(res)
        });
    }, [octokit])
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 15}}>
              {openIssues.length ?
                    <View style={styles.statBar2}>
                    <View style={{maxWidth: "70%"}}>
                        <Text style={styles.title}>
                            Open
                        </Text>
                    </View>
                {openIssues.map((issue, index) => (
                      <TouchableOpacity key={index} onPress={() => {navigation.navigate("Issue", {issue: issue})}}>
                        <View style={styles.statBar}>
                            <Text style={styles.cardTitle}>
                                {issue.title}
                            </Text>
                            <View style={{alignItems: "center"}}>
                                <Icon style={{marginRight: 20, marginLeft: 10}} name='arrow-right' />
                            </View>
                        </View>
                    </TouchableOpacity>
                  ))}
                  </View>
                : null }
                {closedIssues.length ?
                    <View style={styles.statBar2}>
                    <View style={{maxWidth: "70%"}}>
                        <Text style={styles.title}>
                            Closed
                        </Text>
                    </View>
                    { closedIssues.map((issue, index) => (
                        <TouchableOpacity key={index} onPress={() => {navigation.navigate("Issue", {issue: issue})}}>
                            <View style={styles.statBar}>
                                <Text style={styles.cardTitle}>
                                    {issue.title}
                                </Text>
                                <View style={{alignItems: "center"}}>
                                    <Icon style={{marginRight: 20, marginLeft: 10}} name='arrow-right' />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    </View>
                : null}
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
    cardTitle: {
        fontSize: 15,
        fontWeight: "700",
        marginLeft: 20
    },
})
const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(Issues)