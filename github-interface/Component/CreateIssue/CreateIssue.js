import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native';



const CreateIssue = ({route, navigation, octokit}) => {
    const repo = route.params.repo
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const createIssue = async () => {
        await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: repo.owner.login,
            repo: repo.name,
            title: title,
            body: body,
          }).then(
              navigation.dispatch(CommonActions.goBack({ repo: repo }))
            ).catch(err => {
                Alert.alert(
                    "Error",
                    err.message,
                    [
                      {
                        text: "Ok",
                        style: "cancel",
                      },
                    ],
                    {
                      cancelable: true,
                    }
                  );
            })
    }


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
           
          <ScrollView>
              <View style={{flexDirection: "column", marginTop: 10}}>

              <Text style={styles.inputTitle}>Title</Text>

              <View style={styles.statBar}>
                <TextInput placeholder="Title" style={styles.input} onChangeText={(t) => setTitle(t)} value={title}/>
                </View>

                <Text style={styles.inputTitle}>Body</Text>

              <View style={styles.statBar}>
                <TextInput multiline placeholder="Body" style={styles.input} onChangeText={(t) => setBody(t)} value={body}/>
                </View>

                {title && body ?
                
                <TouchableOpacity onPress={() => {createIssue()}}>
                    <View style={styles.createView}>
                        <Text style={styles.createTitle}>
                            Create
                        </Text>
                    </View>
                </TouchableOpacity>
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
    title: {
        fontSize: 15,
        fontWeight: "400",
        marginLeft: 20
    },
    input: {
        width: "85%",
        fontSize: 15,
        fontWeight: "400",
        marginLeft: 20
    },
    inputTitle: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: 'center'
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
export default connectComponent(CreateIssue)