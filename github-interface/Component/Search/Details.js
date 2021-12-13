import React from 'react'
import { View, Text } from 'react-native'
import IssuesScreen from '../Issues/IssuesScreen'
import Repository from '../Repository/Repository'

const Details = ({route}) => {
    return (
        <View>
            <IssuesScreen data={route.params.data}/>
        </View>
    )
}

export default Details
