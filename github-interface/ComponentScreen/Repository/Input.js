import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

const InputRepo = ({name, description, privateRepo, privateBool}) => {
    return (
        <View>
             <View style={{flexDirection: "column", marginVertical: 10}}>
                <Text style={styles.title}>
                    Create Repositories
                </Text>
                <TextInput placeholder="name repo" style={styles.inputName} onChangeText={text => name(text)}/>
                <TextInput multiline placeholder="description" style={styles.inputDescription} onChangeText={text => description(text)}/>
                <Button title="private" onPress={() => privateRepo(!privateBool)}/> 
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
        padding:20,
        margin:20
    },

    inputDescription:{
        borderWidth:1,
        borderRadius:10,
        padding:20,
        margin:20
    }
})

