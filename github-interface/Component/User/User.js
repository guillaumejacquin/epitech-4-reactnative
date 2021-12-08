import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

const User = ({octokit}) => {
    const [user, setuser] = useState(undefined)
    const getData = async() => {
        const {data} = await octokit.request("/user");

        return data
    }
    useEffect(() => {
        getData().then(res => {
            setuser(res);
        })
    }, [octokit])

    if(user)
        return (
            <View>
                <Text>{user.login}</Text>
            </View>
        )
    else{
        return (
            <View>
                <Text>Chargement...</Text>
            </View>
        )
    }
}

// export default User

const styles = StyleSheet.create({})
const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(User)