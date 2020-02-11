import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import FastImage from 'react-native-fast-image';
import Theme from '../Theme';
import { changeCurrentLotto, clickedGenButton } from '../actions';
import { connect } from 'react-redux';
import * as RNLocalize from "react-native-localize";

const lottoInfoList = [
    // 로또이름 , 나라, Ball 갯수, 로고 이미지 
    ['lotto', 'KR', [6, 1], [45, 45], require('../assets/img/lotto.png')],
    ['mm', 'US', [5, 1], [70, 25], require('../assets/img/mm.png')],
    ['pb', 'US', [5, 1], [69, 26], require('../assets/img/pb.png')],
    ['tb', 'IN', [5, 1], [42, 15], require('../assets/img/tb.png')],
    ['ss', 'IN', [6, 0], [49, 0], require('../assets/img/ss.png')],
    ['j5', 'IN', [5, 0], [36, 0], require('../assets/img/j5.png')],
]

class CardSwiper extends Component {
    initLogo = 0
    lottoLogoList = lottoInfoList.map((item, index) => (item[4]))
    componentDidMount(){
        let initLangTag = RNLocalize.findBestAvailableLanguage(['en', 'ko', 'hi']).languageTag
        if (initLangTag == 'ko')
            this.initLogo = 0
        else if ((initLangTag == 'en'))
            this.initLogo = 1
        else if ((initLangTag == 'hi'))
            this.initLogo = 3
        else
            this.initLogo = 0
        console.log('Swiper:', initLangTag, 'initLogo', this.initLogo)
        this.onLogoChange(this.initLogo)
    }
    renderCardList = () =>{
        return(
            this.lottoLogoList.map((item, index) => (
                <View>
                    <FastImage
                        style={styles.lotteryLogo}
                        source={item}
                        resizeMode="contain"
                    />
                </View>
            ))
        )
    }

    onLogoChange = index => {
        
        obj = {
            name: lottoInfoList[index][0],
            country: lottoInfoList[index][1],
            ballCount: lottoInfoList[index][2],
            ballRange: lottoInfoList[index][3],
        }
        this.props.changeCurrentLotto(obj)
        this.props.clickedGenButton({name: '', show: false})
    }

    
    render() {
        return (
            <View style={{ width: null, height: 200 }}>
                <Swiper 
                    style={styles.wrapper} 
                    showsButtons={true}
                    index={this.initLogo}
                    onIndexChanged = {this.onLogoChange}>
                    {            
                        this.renderCardList()
                    }
                </Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {},

    lotteryLogo: {
        width: null,
        height: 100,
        marginTop: Theme.spacing.small * 2,
        marginBottom: Theme.spacing.small,
        marginLeft: Theme.spacing.large * 2,
        marginRight: Theme.spacing.large * 2,
      },
  })

// const mapStateToProps = (state) => ({
//     luckyWord: state.LotteryReducer.luckyWord,
//     currentLotto: state.LotteryReducer.currentLotto
// })
const mapStateToProps = ({ lottoReducer }) => lottoReducer;

export default connect(mapStateToProps, {changeCurrentLotto, clickedGenButton})(CardSwiper)