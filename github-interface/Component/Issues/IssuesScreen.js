import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Issues from '../../ComponentScreen/Issues/Issues'


const Body = ({title, author, body, status}) => {
    return (
        <View style={styles.body}>
            <View style={{borderBottomWidth: 1, padding:10, flexDirection:"row", justifyContent:"space-between"}}>
                <Text>{title}</Text>
                <Text>{status}</Text>
            </View>
            <View style={{padding:20, backgroundColor:"white"}}>
                {
                    body ? <Text>{body}</Text> : <Text>No body</Text>
                }
            </View>
            <View style={{borderTopWidth:1, padding:10}}>
                <Text>{author}</Text>
            </View>
        </View>
    )
}
const IssuesScreen = ({data}) => {
    console.log(data.labels);
    return (
        <ScrollView>
            <Body status={data.state} title={data.title} author={data.user.login} body={data.body}/>
            <View style={{margin:10}}>
                <Text>{data.created_at}</Text>
                <Text>comments: {data.comments}</Text>
            </View>
        </ScrollView>
    )
}

export default IssuesScreen

const styles = StyleSheet.create({
    body:{
        borderWidth:1,
        margin:10,
        borderRadius:10
    }
})
