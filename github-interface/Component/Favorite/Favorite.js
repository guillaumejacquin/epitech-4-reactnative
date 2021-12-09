import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Card from "../Home/Card"

const Favorite = ({octokit, navigation}) => {
    const [user, setFavorites] = useState([])
    const getData = async() => {
        const {data} = await octokit.request("GET /user/repos");
        return data
    }
    useEffect(() => {
        getData().then(res => {
            setFavorites(res);
        })
    }, [octokit])
    const favoritesExists = () => {
        console.log("teeeeeeeeeeeeest")
        if (user) { 
           return <Text style={styles.subTitle}>
                {user.login}
            </Text>
        } else {
            return <Text style={styles.subTitle}>
            REPOSITORIES
        </Text>
        }
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <ScrollView>
              <View style={{flexDirection: "column", marginVertical: 10}}>

                    <Text style={styles.title}>
                        Overview
                    </Text>
                    {favoritesExists()}
                  <Card title={"Repositories"} navigation={navigation} navigate={"Repositories"}/>
                  <Card title={"Projects"} navigation={navigation} navigate={"Issues"}/>
                  <Card title={"Packages"} navigation={navigation} navigate={"PullRequests"}/>
              </View>
          </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = state => state;
const connectComponent = connect(mapStateToProps, undefined)

export default connectComponent(Favorite)

const styles = StyleSheet.create({
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
})