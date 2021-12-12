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
            return <Text>{item.title}</Text>
        }
    }
    return (
        <TouchableOpacity style={styles.cells} onPress={()=>nav(item)}>
            {themes()}
            {/* <Text>{item.login}</Text> */}
            <View >
                <Text>{">"}</Text>
            </View>
        </TouchableOpacity>
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
