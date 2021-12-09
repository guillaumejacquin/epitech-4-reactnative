import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, TouchableOpacity, Picker} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'

const RepositoryBrowser = ({route, navigation, octokit}) => {
    const [repo, setRepo] = useState(route.params.repo);
    const [selectBranch, setSelectBranch] = useState(false);
    const [branch, setBranch] = useState("master");
    const [branches, setBranches] = useState([]);
    const [path, setPath] = useState("");
    const [files, setFiles] = useState([]);
    const [max, setMax] = useState(30 - branch.length);

    useEffect(() => {
      getFiles()
      getAllBranches()
    }, [])

    const getFiles = async (p = "", b = "master") => {
      await octokit.request('GET /repos/{owner}/{repo}/contents/{path}?ref={ref}', {
        owner: repo.owner.login,
        repo: repo.name,
        path: p,
        ref: b
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

    const getCommits = async (branch) => {
      await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
        owner: repo.owner.login,
        repo: repo.name,
        branch: branch
      }).then(res => {
        setCommits(res.data)
      })
    }

    const navigateDir = async (dir) => {
      const newPath = path + (path ? "/" : '') + dir
      getFiles(newPath, branch)
      setPath(newPath)
    }

    const dirBack = () => {
      if (path.includes('/')) {
        const newPath = path.substring(-1, path.lastIndexOf('/'))
        getFiles(newPath, branch)
        setPath(newPath)
      } else {
        getFiles("", branch)
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

    const setBranchRefresh = (b) => {
      setSelectBranch(false)
      setBranch(b)
      setMax(30 - b.length)
      getFiles(path, b)
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          
          <View style={styles.statBar}>
            {path ? 
              <TouchableOpacity onPress={() => {dirBack()}}>
                <View style={{alignItems: "center"}}>
                    <Icon style={{ marginLeft: 10}} name='arrow-left' />
                </View>
              </TouchableOpacity>
            : null
            }

              <Text style={styles.path} >{ ((path).length > max) ? 
                  (('...' + path.slice().substring((path).length - max, (path).length))) : 
                  path }
              </Text>
              
              <TouchableOpacity onPress={() => {setSelectBranch(!selectBranch)}}>
                <View style={styles.branch}>
                  <Text style={styles.branchTitle}>
                      {branch}
                  </Text>
                </View>
              </TouchableOpacity>
          </View>
          {selectBranch ? 
          <Picker
              selectedValue={branch}
              onValueChange={(itemValue, itemIndex) => setBranchRefresh(itemValue)}
            >
              {branches.map(b => (
                <Picker.Item label={b.name} value={b.name} />
              ))}
            </Picker>
          : null}
          <ScrollView>
              <View style={{flexDirection: "column", marginTop: 30}}>
                  
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
    
    branch: {
      alignItems: "center",
      flexDirection: "row",
      padding: 3,
      marginRight: 5,
      textAlign: 'center',
      backgroundColor: "blue",
      borderRadius: 10,
      shadowRadius: 10,
      shadowColor: 'blue',
      shadowOpacity: 0.2,
      shadowOffset: {
          width: 5,
          height: 5
        }
    },
    cardTitle: {
      marginLeft: 10,
    },
    path: {
      fontSize: 13
    },
    branchTitle: {
      textAlign: 'center',
      color: 'white',
    }
})

const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(RepositoryBrowser)