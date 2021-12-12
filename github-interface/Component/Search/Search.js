import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Card from '../../ComponentScreen/SearchComponent/Card/Card'
import Input from '../../ComponentScreen/SearchComponent/Input/Input'

const DataRepositories = [
    {
        id:0,
        name: "Repositories 1"
    },
    {
        id:1,
        name: "Repositories 2"
    },
    {
        id:2,
        name: "Repositories 3"
    },
]

const DataUser = [
    {
        id:0,
        name: "Lina"
    },
    {
        id:1,
        name: "Raphael"
    },
    {
        id:2,
        name: "Raphael"
    },
    {
        id:3,
        name: "Guillaume la daube"
    },
]

const DataIssues = [
    {
        id:0,
        name: "Issues 1"
    },
    {
        id:1,
        name: "Issues 2"
    }
]
const Search = ({navigation, octokit}) => {
    const [input, setInput] = useState(undefined)
    const [user, setuser] = useState(undefined)
    const [repositories, setrepositories] = useState(undefined)
    const [issues, setissues] = useState([])
    const nav= (data) => {
        navigation.navigate("Details", {data})
    }

    const navRepository = (data) => {
        navigation.navigate("RepositoryView", {repo: data})
    }
    
    const navAllFile= (data, name) => {
        navigation.navigate("AllFile", {data, name})
    }

    const search_user = () => {
            octokit.rest.search.users({
                q: input,
            }).then(res =>{
                setuser(res.data.items);
                // console.log(res.data.items);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const search_repo = () => {
        octokit.rest.search.repos({
            q:input,
        }).then(res =>{
            setrepositories(res.data.items);
        }).catch(e => {
            console.log(e);
        });
    }

    const search_issues = () => {
        octokit.rest.search.issuesAndPullRequests({
            q:input,
        }).then(res =>{
            setissues(res.data.items)
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
      search_user()
      search_repo()
      search_issues()
    }, [input])

        return (
            <ScrollView>
                <View>
                    <Input value={input} changeInput={setInput}/>
                </View>
                {
                    input ? 
                    <View>
                        <Card title={"Repositories"} data={repositories} nav={navRepository} navAllFile={navAllFile}/>
                        <Card title={"Users"} data={user} nav={nav} navAllFile={navAllFile}/>
                        <Card title={"Issues"} data={issues} nav={nav} navAllFile={navAllFile}/>
                    </View> :  <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
                        <Text>Veuillez éffectuer une recherche ...</Text>
                    </View>
                }
            </ScrollView>
        )
}

// export default Search

const styles = StyleSheet.create({})
const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(Search)