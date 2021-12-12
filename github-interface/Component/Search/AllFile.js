import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import CardCells from '../../ComponentScreen/SearchComponent/Card/CardCells';

const AllFile = ({route, navigation}) => {
    const data = route.params.data;
    const name = route.params.name;

    const nav= () => {
        navigation.navigate("Details")
    }
    return (
        <ScrollView>
            {data.map(res => (       
                <CardCells item={res} key={res.id} nav={nav} theme={name}/>
                ))}
        </ScrollView>
    )
}

export default AllFile
