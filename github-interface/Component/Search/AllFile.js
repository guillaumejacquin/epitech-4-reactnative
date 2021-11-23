import React from 'react'
import { View, Text } from 'react-native'
import CardCells from '../../ComponentScreen/SearchComponent/Card/CardCells';

const AllFile = ({route, navigation}) => {
    const data = route.params.data;
    const nav= () => {
        navigation.navigate("Details")
    }
    return (
        <View style={{margin:20}}>
            {Object.values(data).map(res => (       
                // <Text>{res.name}</Text>
                <CardCells item={res} key={res.id} nav={nav} />
                ))}
        </View>
    )
}

export default AllFile
