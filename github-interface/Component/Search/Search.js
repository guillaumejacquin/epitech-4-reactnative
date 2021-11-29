import React from 'react'
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
    const nav= () => {
        navigation.navigate("Details")
    }
    
    const navAllFile= (data) => {
        navigation.navigate("AllFile", {data})
    }
    return (
        <ScrollView>
            <View>
                <Input />
            </View>
            <View>
                <Card title={"Repositories"} data={DataRepositories} nav={nav} navAllFile={navAllFile}/>
                <Card title={"Users"} data={DataUser} nav={nav} navAllFile={navAllFile}/>
                <Card title={"Issues"} data={DataIssues} nav={nav} navAllFile={navAllFile}/>
            </View>
        </ScrollView>
    )
}

// export default Search

const styles = StyleSheet.create({})
const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(Search)