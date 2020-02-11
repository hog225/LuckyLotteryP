import React, { Component } from 'react'
import { connect } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight } from 'react-native'
import FastImage from 'react-native-fast-image';
import Theme from '../Theme';
import { AppText, AppButton } from './common';
import { addLottoNumbers, clickedGenButton } from '../actions';
import * as Animatable from 'react-native-animatable';
import AppToast from '../components/AppToast';
import AsyncStorage from '@react-native-community/async-storage'
import {i18n} from '../localization'
import {makeLottoBallColor} from '../utils/balls'


//const maxNumber = 45
var AniView = []
class LottoBalls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonClicked: 0
        }
        this.onGenerateLottoNumbers = this.onGenerateLottoNumbers.bind(this)
        //this.lottoBallsChange = React.createRef();
        
    }

    onToastRef = ref => (this.toast = ref);
    showToast = message => {
        this.toast.show(message, 1000)
    }

    componentDidMount(){
        
        console.log('LottoBalls is mounted..')
        
        
    }
    
    onPressSave = () => {
        const { lottoNumbers, luckyWords} = this.props
        const { name } = this.props.currentLotto
        let lottoNumberData = this.getCurrentLottoNumbers(name)
        if (lottoNumberData.show == false){
            this.showToast(i18n.t('toast_no_numbers'))
            return
        }
            

        obj = {
            name: lottoNumberData.name,
            numbers: lottoNumberData.numbers,
            luckyWords: luckyWords
        }
        console.log('onPressSave', obj)
        //AsyncStorage.getAllKeys((error, keys) => {
        let id = String(new Date().getTime())
        AsyncStorage.setItem(id, JSON.stringify(obj))
        .then(() => {  
                this.showToast('Saved')
                console.log('Storage Update', id)
        })
        .catch(e => {
                console.log('e :', e)
                this.showToast('Fail')
        })
        //})
        
    }

    onGenerateLottoNumbers () {
        const { lottoNumbers} = this.props
        const { name } = this.props.currentLotto
        const { show } = this.props.genButtonClicked
        if (show == false)
            AniView = []
        console.log('AniView Count: ', AniView.length)
        if (AniView.length  != 0)
        {
            for (let i=0; i< AniView.length; i++)
            {
                if (AniView[i] != null)
                {
                    AniView[i].animate("zoomOutRight", 300, i*10).then(() => {
                        AniView[i].animate("zoomInLeft", 1000, i*10)
                    })
                }
            }
        }
        this.props.clickedGenButton({
          name: name,
          show: true
        })

    }
    ref= null
    handleViewRef = ref => {
        const {ballCount, name} = this.props.currentLotto
        //console.log('Ref : ', ballCount, name)
        if (AniView.length <= (ballCount[0] + ballCount[1]))
            AniView.push(ref);
    };

    randNumber = () => {
        let totalNumbers = [];
        let i;
        const { name, ballCount, ballRange } = this.props.currentLotto
        const { show } = this.props.genButtonClicked
        if (ballCount == undefined)
            return
        for (i=0; i< ballCount.length; i++)
            this.makeRandomNumber(ballCount[i], ballRange[i], totalNumbers)
        

        this.addLottoNumberToProps(
            name, show, totalNumbers
        )
    };


    makeRandomNumber = (ballCount, maxNum, totalNumbers) =>{
        let i
        let randomNumber = 0
        
        for (i=0; i< ballCount; i++){
            while (true){
                randomNumber = Math.floor(Math.random() * maxNum) + 1 
                if (totalNumbers.findIndex((item)=>item == randomNumber) == -1)
                    break
            }
            
            totalNumbers.push(randomNumber)

        }
        

    }

    addLottoNumberToProps(name, show, lottoNums) {
        obj = {
            name: name,
            show: show,
            numbers: lottoNums
        }
        this.props.addLottoNumbers(obj)
    }

    getCurrentLottoNumbers(name) {
        let lottoNumbers = this.props.lottoNumbers
        //console.log('lottoNumbers: ', lottoNumbers)
        for(let i =0; i<lottoNumbers.length; i++){
            if (lottoNumbers[i].name == name)
                return lottoNumbers[i]
        }
        
        // 아래 처럼 하면 변수 추가될 때 마다 귀찮을 듯 
        return {
            name: name,
            show: false,
            numbers: []
        }

    }



    renderLottoBalls = () => {
        // const {lottoNumbers} = this.state
        const { name } = this.props.currentLotto
        const {show, numbers} = this.getCurrentLottoNumbers(name)
    
        if (show == true)
        {
            //console.log('renderLottoBalls')
            return(
                numbers.map((item, index) => {

                    return(
                        <Animatable.View
                            animation={"zoomInLeft"}
                            duration={1000}
                            delay={index*50}
                            ref={this.handleViewRef}
                        >
                            <FastImage
                                style={styles.lottoBall}
                                source={makeLottoBallColor(name, item, index)}
                                resizeMode="contain"
                            >
                                <AppText style={styles.ballNumber} type="caption1">{item}</AppText>
                            </FastImage>
                        </Animatable.View>
                    )
            
                })    
            )
        }
        else
        {
            return (<View/>)
        }

    }
    
    render() {
        this.randNumber()
        const {ballCount} = this.props.currentLotto // number type
        console.log('LottoBalls', this.props.genButtonClicked, 'ballCount', ballCount)
        return (
                <View style={{flex: 1}}>
                    <View style={styles.lottoBallContainer}>
                        {this.renderLottoBalls()}
                    </View>
                    <View style={styles.buttonContainer}>
                        <AppButton 
                            style={styles.loginButton} 
                            onPress={this.onGenerateLottoNumbers}>
                            {i18n.t('btn_create')}
                        </AppButton>
                        <AppButton 
                            style={styles.loginButton} 
                            onPress={this.onPressSave}>
                            {i18n.t('btn_save')}
                        </AppButton>
                        
                    </View>
                    
                    <AppToast 
                        positionValue = {500}
                        fadeInDuration = {700}
                        fadeOutDuration = {700}
                        refProp={this.onToastRef} />
                    
                </View>
                
                
        )

    }
}

const styles = StyleSheet.create({
    lottoBall: {
        width: 45,
        height: 45,
        margin: Theme.spacing.small * 2,
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
    lottoBallContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center'
        //alignSelf: 'flex-start'
    },
    buttonContainer: {
        
        flexDirection: 'row',
        alignSelf:'center',
        justifyContent: 'flex-end',
        margin: Theme.spacing.tiny
    },
    loginButton: {
        
        height: Theme.spacing.large,
        marginVertical: Theme.spacing.large,
        marginLeft: Theme.spacing.base,
        marginRight: Theme.spacing.base
    },
  })

const mapStateToProps = ({ lottoReducer }) => lottoReducer;

export default connect(mapStateToProps, {
    addLottoNumbers,
    clickedGenButton
})(LottoBalls)