import React, { Component } from 'react'
import { StyleSheet, 
    TouchableHighlight, 
    TouchableWithoutFeedback,
    View } from 'react-native';
import Theme from '../Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {makeLottoBallColor, lottoRealName} from '../utils/balls'
import FastImage from 'react-native-fast-image';
import { AppText } from '../components/common';

export default class LottoItem extends Component{
    render() {
        const {lottoData} = this.props
        return (
            <TouchableHighlight
                underlayColor= {this.props.underlayColor}
                style = {this.props.style}
            >
                <View style={styles.lottoDataContainer}>
                    <View style={styles.lottoStringContainer}>
                    <AppText style={{fontWeight:'bold', fontSize:20}}>{lottoRealName(lottoData.name)}</AppText>
                    {
                        Object.values(lottoData.luckyWords).map((word, idx) => (
                        <View style={styles.luckyWordStyle}>
                            <Icon name="hashtag" size={16} color={Theme.gray.lightest}/>
                            <AppText>{word}</AppText>
                        </View>
                        ))
                        
                    }
                    </View>

                    <View style={styles.lottoBallContainer}>
                    {
                        lottoData.numbers.map((item2, index2) => {
                            return(
                                <FastImage
                                    style={styles.lottoBall}
                                    source={makeLottoBallColor(lottoData.name, item2, index2)}
                                    resizeMode="contain"
                                >
                                    <AppText style={styles.ballNumber} type="caption1">{item2}</AppText>
                                </FastImage>
                            )
                    
                        })    
                    }
                    </View>
                </View>
            </TouchableHighlight>            
        )
    }

}

const styles = StyleSheet.create({
    lottoDataContainer: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: Theme.gray.lighter,
       
    },
    lottoStringContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },  
    luckyWordStyle:{
        alignItems: 'center',
        justifyContent:'center',
        marginLeft:10,
        flexDirection:'row'
    },
    lottoBallContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
        //alignSelf: 'flex-start'
    },
    lottoBall: {
        width: 40,
        height: 40,
        margin: Theme.spacing.small,
        // marginBottom: Theme.spacing.small,
        marginLeft: Theme.spacing.tiny,
        marginRight: Theme.spacing.xTiny,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ballNumber: {
        color: Theme.gray.darkest,
        fontWeight: 'bold',
        fontSize: 24,
        textShadowColor: 'white',
        textShadowRadius: 5
    },
})