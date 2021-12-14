import React from 'react'
import { View } from 'react-native'
import IssuesScreen from '../Issues/IssuesScreen'

const Details = ({route}) => {
    return (
        <View>
            <IssuesScreen data={route.params?.data}/>
        </View>
    )
}

export default Details
