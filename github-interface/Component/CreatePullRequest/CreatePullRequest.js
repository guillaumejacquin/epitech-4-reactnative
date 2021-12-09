import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Image, View, TouchableOpacity, Picker, TextInput, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { Buffer } from 'buffer';
import { CommonActions } from '@react-navigation/native';



const CreatePullRequest = ({route, navigation, octokit}) => {
    const repo = route.params.repo
    const [branches, setBranches] = useState([]);
    const [pullRequest, setPullRequest] = useState([])
    const [selectHead, setSelectHead] = useState(false);
    const [selectBase, setSelectBase] = useState(false);
    const [head, setHead] = useState('')
    const [base, setBase] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        getAllBranches()
    }, [])

    const getAllBranches = async () => {
        await octokit.request('GET /repos/{owner}/{repo}/branches', {
          owner: repo.owner.login,
          repo: repo.name,
        }).then(res => {
            res.data.push({name: ""})
          setBranches(res.data)
        })
    }

    const setHeadRefresh = (h) => {
        setHead(h)
        setSelectHead(false)
    }

    const setBaseRefresh = (b) => {
        setBase(b)
        setSelectBase(false)
    }

    const createPullRequest = async () => {
        await octokit.request('POST /repos/{owner}/{repo}/pulls', {
            owner: repo.owner.login,
            repo: repo.name,
            head: head,
            base: base,
            title: title
          }).then(
              navigation.dispatch(CommonActions.goBack())
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
              <View style={{flexDirection: "column"}}>

              <Text style={styles.inputTitle}>Title</Text>

              <View style={styles.statBar}>
                <TextInput placeholder="Title" style={styles.input} onChangeText={(t) => setTitle(t)} value={title}/>
                </View>


              <Text style={styles.inputTitle}>Head</Text>

              <TouchableOpacity onPress={() => {setSelectHead(!selectHead)}}>
                <View style={styles.statBar}>
                  <Text style={styles.title}>
                      {head}
                  </Text>
                </View>
              </TouchableOpacity>
              {selectHead ? 
                <Picker
                    selectedValue={head}
                    onValueChange={(itemValue, itemIndex) => setHeadRefresh(itemValue)}
                    >
                    {branches.map(b => (
                        base != b.name ? 
                        <Picker.Item label={b.name} value={b.name} />
                        : null
                    ))}
                    </Picker>
                : null}

                {/* <View style={{alignItems: "center"}}>
                    <Icon style={{marginRight: 20, marginLeft: 10}} name='arrow-down' />
                </View> */}

                <Text style={styles.inputTitle}>Base</Text>

                <TouchableOpacity onPress={() => {setSelectBase(!selectBase)}}>
                    <View style={styles.statBar}>
                        <Text style={styles.title}>
                            {base}
                        </Text>
                    </View>
                </TouchableOpacity>

                {selectBase ? 
                <Picker
                    selectedValue={base}
                    onValueChange={(itemValue, itemIndex) => setBaseRefresh(itemValue)}
                    >
                    {branches.map(b => (
                        head != b.name ?
                        <Picker.Item label={b.name} value={b.name} />
                        : null
                    ))}
                    </Picker>
                : null}

                {title && head && base ?
                
                <TouchableOpacity onPress={() => {createPullRequest()}}>
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
        width: "100%",
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
export default connectComponent(CreatePullRequest)