import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux'

const Issue = ({route, navigator, octokit}) => {
    const issue = route.params.issue;
    const [comment, setComment] = useState({})
    const description = () => {
        if (issue.body) {
            return issue.body;
        }
        return "No description provided"
    }

    const openClosed = () => {
        if ((issue.state) == "open") {
            return (<View style={{paddingHorizontal:10, paddingVertical:10, backgroundColor:'#2da44e', borderRadius:10}}>
                <Text style={{fontSize:15, color:'white'}}>Open</Text>
            </View>)
        } else {
            return (<View style={{paddingHorizontal:10, paddingVertical:10, backgroundColor:'#5c5de5', borderRadius:10}}>
                <Text style={{fontSize:15, color:'white'}}>Closed</Text>
            </View>)
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
                <View style={styles.body}>
                    <View style={{borderBottomWidth: 1, padding:15, flexDirection:"row", justifyContent:"space-between"}}>
                        <Text>{issue.title}</Text>
                        {openClosed()}
                    </View>
                <View style={{padding:20, backgroundColor:"white"}}>
                    <Text>
                        {description()}
                    </Text>
                </View>
                <View style={{borderTopWidth:1, padding:10}}>
                    <Text>Assignee</Text>
                    {console.log(issue)}
                {
                    issue.assignees ?
                        (issue.assignees).map(assignee => (<Image 
                        source={
                        {uri: assignee.avatar_url}}
                        style={{width: 50, height: 50, borderRadius: 50 / 2}}
                        />)) : ""
                }
                    </View>
                </View>
                <Input placeholder="Comment..." style={styles} onChangeText={value => setComment({ comment: value })}  />
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
    },
    body:{
        borderWidth:1,
        margin:10,
        borderRadius:10
    }
})
const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(Issue)