import React from 'react';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { View, FlatList, StyleSheet, PanResponder, Text,  KeyboardAvoidingView} from 'react-native';
import Theme from '../Theme';
import { AppText, AppButton } from '../components/common';
//import { FormLabel, FormInput } from 'react-native-elements' 
import { Input } from 'react-native-elements' 
import Icon from 'react-native-vector-icons/FontAwesome';
import { addLuckyWords } from '../actions';
import RouteNames from '../RouteNames';
import {i18n} from '../localization'


class LuckyWords extends React.Component {
 

  onChangeText = (key, text) => {
    this.props.addLuckyWords({[key]: text})
  }

  onPressButton = () => {
    const {navigation} = this.props
    console.log('go home stack')
    navigation.navigate('Lotto');
  }

  render() {
    return (
        <View style={styles.container}>
            <AppText style={styles.welcomeText} type="title1">
              {i18n.t('title_ask_input_lucky_word')}
            </AppText>
            <AppText style={styles.welcomeCaption} type="titleCaption">
                {i18n.t('title_explain_lucky_word')}
            </AppText>
            <View style={styles.inputTextContainer}>
              <Input
                containerStyle = {{marginTop: Theme.spacing.tiny}}
                onChangeText = {val => this.onChangeText('w1', val)}
                placeholderTextColor = {Theme.gray.lighter}
                labelStyle = {styles.labelStyle}
                inputStyle = {styles.labelStyle}
                placeholder={i18n.t('placeholder_word1')}
                leftIcon={
                  <Icon
                    name='hashtag'
                    color= {Theme.gray.lighter}
                    size = {20}
                  />
                }
              />
              <Input
                containerStyle = {{marginTop: Theme.spacing.tiny}}
                onChangeText = {val => this.onChangeText('w2', val)}
                placeholderTextColor = {Theme.gray.lighter}
                labelStyle = {styles.labelStyle}
                inputStyle = {styles.labelStyle}
                placeholder={i18n.t('placeholder_word2')}
                leftIcon={
                  <Icon
                    name='hashtag'
                    color= {Theme.gray.lighter}
                    size = {20}
                  />
                }
              />
              <Input
                containerStyle = {{marginTop: Theme.spacing.tiny}}
                onChangeText = {val => this.onChangeText('w3', val)}
                placeholderTextColor = {Theme.gray.lighter}
                labelStyle = {styles.labelStyle}
                inputStyle = {styles.labelStyle}
                placeholder={i18n.t('placeholder_word3')}
                leftIcon={
                  <Icon
                    name='hashtag'
                    color= {Theme.gray.lighter}
                    size = {20}
                  />
                }
              />
            </View>
            <View style={styles.buttonContainer}>
                <AppButton 
                    style={styles.loginButton} 
                    onPress= {this.onPressButton}>
                    {i18n.t('btn_finish')}
                </AppButton>
            </View>
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
  welcomeText: {
    marginTop: Theme.spacing.large,
    textAlign: 'center'
  },
  welcomeCaption: {
    marginTop: Theme.spacing.xTiny,
    color: Theme.gray.lighter,
    textAlign: 'center'
  },
  labelStyle: {
    color: Theme.gray.lighter
  },

  inputTextContainer: {
    //flexDirection: 'row',
    margin: Theme.spacing.base,
    alignSelf: 'stretch'
  },
  buttonContainer: {
    
    alignSelf: 'center',
    justifyContent: 'flex-end',
    margin: Theme.spacing.tiny
  },
  loginButton: {
    
    marginVertical: Theme.spacing.large,
    height: Theme.spacing.large,
    
  },
});

const mapStateToProps = (state) => ({
  luckyWord: state.lottoReducer.luckyWord
})
//const mapStateToProps = ({ lottoReducer }) => lottoReducer;

export default connect(mapStateToProps, {addLuckyWords})(LuckyWords)