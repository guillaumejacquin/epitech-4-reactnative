import React, {useEffect, useState} from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native';

const postComment = ({octokit, navigation, route}) => {
    const issue = route.params.issue;
    const [comment, setComment] = useState("");

    const postComments = async() => {
        await octokit.rest.issues.createComment({
            owner: issue.repository.owner.login,
            repo: issue.repository.name,
            issue_number: issue.number,
            body: comment,
        }).then(res =>
            navigation.dispatch(CommonActions.goBack()))
        .catch(error =>
                console.log("an error occured", error)
        );
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
                <View style={{flexDirection: "column", marginVertical: 10}}>
                    <Text style={styles.title}>
                        Comments
                    </Text>
                </View>
                    <View style={styles.statBar}>
                        <TextInput value={comment} onChangeText={(t) => {setComment(t)}} />
                    </View>
                        <TouchableOpacity onPress={() => {postComments()}}>
                            <View style={styles.createView}>
                            <Text style={styles.createTitle}>
                                Post
                            </Text>
                        </View>
                        </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => state;

const connectComponent = connect(mapStateToProps, undefined);
export default connectComponent(postComment);

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
        marginLeft: 10,
        marginVertical: 4,
        marginRight: 20,
    },
    texte: {
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 20
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        padding: 20
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "700",
        padding: 30
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
})