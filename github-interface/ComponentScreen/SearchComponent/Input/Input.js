import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const Input = () => {
    return (
        <View>
            <TextInput placeholder="Search" style={styles.inputSearch}/>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputSearch:{
        borderWidth:1,
        padding:15,
        margin:20,
        borderRadius:10,
        backgroundColor:"white"
    }
})
