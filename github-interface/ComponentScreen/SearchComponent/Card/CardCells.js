import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CardCells = ({item, nav, theme}) => {
    const themes = () => {
        if(theme === "Repositories"){
            return <Text>{item.full_name}</Text>
        }
        else if(theme === "Users"){
            return <Text>{item.login}</Text>
        }
        else {
            return <Text>{item.id}</Text>
        }
    }
    return (
        <View style={styles.cells}>
            {themes()}
            {/* <Text>{item.login}</Text> */}
            <TouchableOpacity onPress={()=>nav(item)}>
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
