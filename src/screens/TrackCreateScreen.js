import '../_mockLocation'
import React, { useContext, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { SafeAreaView, withNavigationFocus } from 'react-navigation'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'
import { FontAwesome } from '@expo/vector-icons'

const TrackCreateScreen = ({ isFocused }) => {
    const { state: { recording }, addLocation } = useContext(LocationContext)
    const callback = useCallback(location => {
        addLocation(location, recording)
    }, [recording])
    const [err] = useLocation(isFocused || recording, callback)
    
    return (
        <View style={styles.container}>
        {/* <SafeAreaView force={{ top: 'always' }}> */}
            <Text h3>Create a Track</Text>
            <Map />
            {err ? <Text>Please enable Location Services</Text> : null}
            <TrackForm />
        {/* </SafeAreaView> */}
        </View>
    )
}

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name="plus"  size={20} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    }
})

export default withNavigationFocus(TrackCreateScreen)