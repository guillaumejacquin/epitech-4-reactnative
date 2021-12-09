import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'

const RepositoryBrowser = ({route, navigation, octokit}) => {
    const [repo, setRepo] = useState(route.params.repo);
    const [branch, setBranch] = useState("master");
    const [branches, setBranches] = useState([]);
    const [path, setPath] = useState("");
    const [files, setFiles] = useState([]);

    useEffect(() => {
      getFiles("")
      getAllBranches()
      getBranch(branch)
    }, [])

    const getFiles = async (p) => {
      await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: repo.owner.login,
        repo: repo.name,
        path: p
      }).then(res => {
        setFiles(res.data)
      })

    }

    const getAllBranches = async () => {
      await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: repo.owner.login,
        repo: repo.name,
      }).then(res => {
        setBranches(res.data)
      })
    }

    const getBranch = async (branch) => {
      await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
        owner: repo.owner.login,
        repo: repo.name,
        branch: branch
      }).then(res => {
        console.log(res.data)
        setBranches(res.data)
        setBranch(branch)
      })
    }

    const navigateDir = async (dir) => {
      const newPath = path + (path ? "/" : '') + dir
      getFiles(newPath)
      setPath(newPath)
    }

    const dirBack = () => {
      if (path.includes('/')) {
        const newPath = path.substring(-1, path.lastIndexOf('/'))
        getFiles(newPath)
        setPath(newPath)
      } else {
        getFiles("")
        setPath("")
      }
    }
    
    const openFile = (file) => {
      octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: repo.owner.login,
        repo: repo.name,
        path: path + '/' + file
      }).then(res => {
        navigation.navigate("FileViewer", {file: res.data})
      })
    }


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <View style={styles.statBar}>
            {path ? 
            <TouchableOpacity onPress={() => {dirBack()}}>
              <View style={{alignItems: "center"}}>
                  <Icon style={{marginRight: 20, marginLeft: 10}} name='arrow-left' />
              </View>
            </TouchableOpacity>
            : null
          }
              <Text style={styles.cardTitle}>
                  {path}
              </Text>
              <View style={{alignItems: "center"}}>
                  <Icon style={{marginRight: 20, marginLeft: 10}} name='folder' />
              </View>
          </View>
          <ScrollView>
              <View style={{flexDirection: "column", marginTop: 30}}>
                  {/* Stats */}
                  <View style={{marginVertical: 20}}>
                  {files.map(file => (

                    file.type == "dir" ? 

                    <TouchableOpacity key={file.name} onPress={() => {navigateDir(file.name)}}>
                        <View style={styles.statBar}>
                            <Text style={styles.cardTitle}>
                                {file.name}

                            </Text>
                            <View style={{alignItems: "center"}}>
                                <Icon style={{marginRight: 20, marginLeft: 10}} name='folder' />
                            </View>
                        </View>

                    </TouchableOpacity>

                    : 

                    <TouchableOpacity key={file.name} onPress={() => {openFile(file.name)}}>
                        <View style={styles.statBar}>
                            <Text style={styles.cardTitle}>
                                {file.name}

                            </Text>
                            {/* <View style={{alignItems: "center"}}>
                                <Icon style={{marginRight: 20, marginLeft: 10}} name='none' />
                            </View> */}
                        </View>

                    </TouchableOpacity>
                    
                  ))}
                  </View>
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
            height: 5
          }
    },
    cardTitle: {
      marginLeft: 10
    }
})

const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(RepositoryBrowser)