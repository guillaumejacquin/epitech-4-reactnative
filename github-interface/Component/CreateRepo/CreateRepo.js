import React, {useState} from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import InputRepo from '../../ComponentScreen/Repository/Input'

const CreateRepo = ({octokit}) => {
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
            });
        }
        else{
            alert("Vous devez donner un nom à votre repositories")
        }
    }

    return (
        <View>
            <InputRepo name={setname} description={setdescription} privateRepo={setprivate} privateBool={privateRepo}/>
            <Button title={"Create Repo"} onPress={createRepo}/>
        </View>
    )
}

const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(CreateRepo)
const styles = StyleSheet.create({})
