import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CardCells = ({item, nav}) => {
    return (
        <View style={styles.cells}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={()=>nav()}>
                <Text>{">"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CardCells

const styles = StyleSheet.create({
    cells:{
        padding:15,
        backgroundColor:"white",
        borderTopWidth:0.5,
        borderTopColor:"#C7C7C7",
        flexDirection:"row",
        justifyContent:"space-between",
        borderRadius:5
    }
})
