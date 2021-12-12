import { ExecutionEnvironment } from 'expo-constants';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'

const Issues = ({navigation, octokit}) => {
    const [issues, setIssues] = useState([]);

    const getIssues = async() => {
        const {data} = await octokit.request('GET /issues', {filter: 'all'})
        console.log("data", data)
        return data
    }

    useEffect(() => {
        getIssues().then(res => {
            setIssues(res)
        });
    }, [octokit])
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 15}}>
                  {issues.map((issue, index) => (
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
        fontSize: 15,
        fontWeight: "700",
        marginLeft: 20
    },
})
const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(Issues)