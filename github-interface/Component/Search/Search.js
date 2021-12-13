import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Card from '../../ComponentScreen/SearchComponent/Card/Card'
import Input from '../../ComponentScreen/SearchComponent/Input/Input'

const Search = ({navigation, octokit}) => {
    const [input, setInput] = useState(undefined)
    const [user, setuser] = useState(undefined)
    const [repositories, setrepositories] = useState(undefined)
    const [issues, setissues] = useState([])
    const nav= (data) => {
        // navigation.navigate("Details", {data})
        console.log(data)
        navigation.navigate("Issue", { issue: data });
    }

    const navRepository = (data) => {
        navigation.navigate("Repository", {repo: data})
    }

    const navUser = (data) => {
        navigation.navigate("UserDetail", {data})
    }
    
    const navAllFile= (data, name) => {
        navigation.navigate("AllFile", {data, name})
    }

    const search_user = () => {
            octokit.rest.search.users({
                q: input,
            }).then(res => {
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
        octokit.request('GET /search/issues', {
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
                        <Card title={"Repositories"} data={repositories} nav={navRepository} navAllFile={() => {navigation.navigate("Repositories", {input: input})}}/>
                        <Card title={"Users"} data={user} nav={navUser} navAllFile={() => {navigation.navigate("Users", {input: input})}}/>
                        <Card title={"Issues"} data={issues} nav={nav} navAllFile={() => {navigation.navigate("Issues", {input: input})}}/>
                    </View> :  <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
                        <Text>Please perform a search ...</Text>
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