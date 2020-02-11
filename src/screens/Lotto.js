import React from 'react';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { View, FlatList, StyleSheet, PanResponder, Text, TouchableHighlight } from 'react-native';
import Theme from '../Theme';
import { AppText, AppButton } from '../components/common';
import CardSwiper from '../components/CardSwiper';
import LottoBalls from '../components/LottoBalls';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage'
import {i18n} from '../localization'


class Lotto extends React.Component {

  componentDidMount(){
    // AsyncStorage.getAllKeys((error, keys) => {
    //   console.log('Root Mounted ', keys)
    //   AsyncStorage.multiRemove(keys)
      
    // })
  }

  renderLuckyWords = () => {
    let textList = []
    const {luckyWords} = this.props
    
    if (Object.keys(luckyWords).length > 0){
      for (const val of Object.values(luckyWords)){
        textList.push(
          <View style={styles.luckyWordStyle}>
            <Icon name="hashtag" size={16} color={Theme.gray.lightest}/>
            <AppText style={styles.welcomeCaption, {fontStyle:'italic'}} type="titleCaption">
              {val}
            </AppText>
          </View>
        )
      }
    }
    else{
      return (
        <AppText style={styles.welcomeCaption} type="titleCaption">
          {i18n.t("title_catch_lucky")}
        </AppText>
      )
    }

    return textList
  }


  render() {
    
    return (
        <View style={styles.container}>
          <CardSwiper></CardSwiper>
          <View style={styles.luckyWordsContainer}>
            {this.renderLuckyWords()}
          </View>
          <LottoBalls/>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.colors.background
  },
  luckyWordsContainer: {
    flexDirection: 'row'
  },
  luckyWordStyle:{
    alignItems: 'center',
    justifyContent:'center',
    marginLeft:10,
    flexDirection:'row'
  },
  welcomeText: {
    textAlign: 'center'
  },
  welcomeCaption: {
    color: 'white',
    textAlign: 'center'
  },


});

// const mapStateToProps = (state) => ({
//   luckyWord: state.LotteryReducer.luckyWord,
//   currentLotto: state.LotteryReducer.currentLotto
// })
const mapStateToProps = ({ lottoReducer }) => lottoReducer;

export default connect(mapStateToProps)(Lotto)