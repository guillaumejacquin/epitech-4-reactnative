import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'

const CheckBox = ({onPress, privateBool}) => {
    console.log(privateBool);
    return(
        <View style={{flexDirection:"row", margin:20}}>
            <TouchableOpacity onPress={onPress} style={{width:20, height:20, borderWidth:1, borderRadius:5}}>
                {privateBool ? <View style={{backgroundColor: "green", width:18, height:18, borderRadius:5, alignItems:"center", justifyContent:"center"}}/> : <View /> }
            </TouchableOpacity>
            <View style={{marginLeft:10}}>
                <Text>Private</Text>
            </View>
        </View>
    )
}
const InputRepo = ({name, description, privateRepo, privateBool}) => {
    const privateBoolFunction = () => {
        privateRepo(!privateBool)
    } 
    return (
        <View>
             <View style={{flexDirection: "column", marginVertical: 10}}>
                <Text style={styles.title}>
                    Create Repositories
                </Text>
                <TextInput placeholder="name repo" style={styles.inputName} onChangeText={text => name(text)}/>
                <TextInput multiline placeholder="description" style={styles.inputDescription} onChangeText={text => description(text)}/>
                <CheckBox onPress={privateBoolFunction} privateBool={privateBool}/>
                {/* <Button title="private" onPress={() => privateRepo(!privateBool)}/>  */}
            </View>
        </View>
    )
}

export default InputRepo

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "700",
        padding: 20
    },

    inputName:{
        borderWidth:1,
        borderRadius:10,
        padding:10,
        margin:20,
        height:50
    },

    inputDescription:{
        borderWidth:1,
        borderRadius:10,
        padding:20,
        margin:20,
        height:50
    }
})

