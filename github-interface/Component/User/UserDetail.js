import React,{useEffect, useState} from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux';

const UserDetail = ({route, octokit}) => {
    const {data} = route.params;
    const [user, setuser] = useState(undefined)

    useEffect(() => {
        octokit.rest.users.getByUsername({
            username: data.login,
          }).then(res =>
            {
                setuser(res.data)
            });
    }, [])

    if(user)
        return (
            <View>
                <View style={{flexDirection:"row", padding:20}}>
                    <Image source={{uri: data.avatar_url}} style={{width:100, height:100, borderRadius:10}} />
                    <View style={{marginLeft:10}}>
                        <Text style={{fontSize:17, fontWeight:"bold"}}>{data.login}</Text>
                        <Text>{user.name ? user.name : "No name"}</Text>
                        <Text>{user.email ? user.email : "No mail"}</Text>
                        <Text>{user.twitter_username ? "@"+ user.twitter_username : "No twiter name"}</Text>
                    </View>
                </View>
                <View style={{padding:20}}>
                    <View>
                        <Text style={{fontSize:16, color:"#ABABAB"}}>{user.bio ? user.bio : "No bio"}</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text>{user.company ? user.company : "No company"}</Text>
                        <Text>{user.blog ? user.blog : "No blog"}</Text>
                        <Text>{user.location? user.location : "No location"}</Text>
                    </View>
                    <View style={{flexDirection:"row", marginTop:10}}>
                        <Text>followers : {user.followers}</Text>
                        <View style={{marginLeft:10}}>
                            <Text>following : {user.following}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    else{
        return(
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator />
            </View>
        )
    }
}


const styles = StyleSheet.create({})

const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(UserDetail)