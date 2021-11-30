import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { auth_github } from '../Api/GithubApi'
import * as Types from '../../store/type'

const SplashScreen = ({navigation, updateAuthInformation}) => {
    useEffect(() => {
        setTimeout(() => {
            auth_github().then(async res => {
                updateAuthInformation(res);
                navigation.replace("Tab")
            })
        }, 3000)
    }, [])
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize:18}}>Github Project</Text>
        </View>
    )
}

// export default SplashScreen

const styles = StyleSheet.create({})
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    updateAuthInformation: (octokit) => dispatch({type: Types.AUTH_GITHUB, payload:{
      octokit
    }}),
})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(SplashScreen)