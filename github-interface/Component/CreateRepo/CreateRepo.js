import React, {useState} from 'react'
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import InputRepo from '../../ComponentScreen/Repository/Input'

const CreateRepo = ({octokit, navigation}) => {
    const [name, setname] = useState(undefined)
    const [description, setdescription] = useState(undefined)
    const [privateRepo, setprivate] = useState(false)

    const createRepo = () => {
        const obj = {
            name,
            description,
            private: privateRepo
        }
        if(name){
            console.log(obj);
            octokit.rest.repos.createForAuthenticatedUser(obj).then(res => {
                console.log(res);
                alert("Votre repo a été creer avec succes")
                navigation.goBack()
            });
        }
        else{
            alert("Vous devez donner un nom à votre repositories")
        }
    }

    return (
        <View>
            <InputRepo name={setname} description={setdescription} privateRepo={setprivate} privateBool={privateRepo}/>
            <TouchableOpacity onPress={createRepo}>
                <View style={styles.createView}>
                    <Text style={styles.createTitle}>
                        Create a new Repo
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(CreateRepo)
const styles = StyleSheet.create({
    createTitle: {
        fontSize: 15,
        fontWeight: "600",
        textAlign: 'center',
        color: 'white',
    },

    createView: {
        alignItems: "center",
        marginHorizontal: 40,
        paddingVertical: 12,
        marginTop: 10,
        backgroundColor: "green",
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 5,
            height: 5
        }
    },
})
