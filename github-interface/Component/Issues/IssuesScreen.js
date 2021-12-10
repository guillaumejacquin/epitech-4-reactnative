import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Issues from '../../ComponentScreen/Issues/Issues'


const Body = ({title, author, body}) => {
    return (
        <View>
            <Text>{title}</Text>
            <Text>{body}</Text>
            <Text>{author}</Text>
        </View>
    )
}
const IssuesScreen = ({data}) => {
    console.log(data);
    return (
        <ScrollView>
            <Body title={data.title} author={data.user.login} body={data.body}/>
            <Text>{data.created_at}</Text>
            <Text>{data.comments}</Text>
        </ScrollView>
    )
}

export default IssuesScreen

const styles = StyleSheet.create({})
