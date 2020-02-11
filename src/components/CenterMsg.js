import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import Theme from '../Theme';
import { AppText } from './common';

const CenterMsg = ({message}) => (
    <View style={styles.emptyContainer}>
        <AppText 
            styles={styles.message}
            type="title1"
        >{message}</AppText>

    </View>
)

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.colors.background
    },
    message:{
        fontWeight: 'bold'
    }
})

export default CenterMsg