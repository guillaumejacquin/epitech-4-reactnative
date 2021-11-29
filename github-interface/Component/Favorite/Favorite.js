import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

const Favorite = ({octokit}) => {
    return (
        <View>
            <Text>Favorite</Text>
        </View>
    )
}

// export default Favorite

const styles = StyleSheet.create({})
const mapStateToProps = state => state;

const connectComponent = connect(mapStateToProps, undefined)
export default connectComponent(Favorite)