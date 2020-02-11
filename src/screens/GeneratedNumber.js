import React from 'react';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { View, 
  Animated,
  StyleSheet, 
  Text, 
  SafeAreaView,
  TouchableOpacity,
  Image} from 'react-native';
import Theme from '../Theme';
import CenterMsg from '../components/CenterMsg'
import AsyncStorage from '@react-native-community/async-storage'
import LottoItem from '../components/LottoItem'
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view'
import {i18n} from '../localization'

class GeneratedNumbers extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lottoDatas: []
      
    }    
    this.rowSwipeAnimatedValues = {};
  }

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  }

  deleteRow(rowMap, rowKey) {
    console.log('rowKey', rowKey, 'type', typeof(rowKey))
    this.closeRow(rowMap, rowKey);
    const newData = [...this.state.lottoDatas];
    const prevIndex = this.state.lottoDatas.findIndex(
        item => item.key === rowKey
    );
    newData.splice(prevIndex, 1);
    AsyncStorage.removeItem(rowKey)
    this.setState({ lottoDatas: newData });
  }
  componentDidUpdate(prevProps){
    if(prevProps.isFocused !== this.props.isFocused){
        console.log("Current Props: ", this.props.isFocused)
        this.setLottoDataOnStorage()
        //if (this.props.isFocused == false)
    }
  }

  onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  }
  async setLottoDataOnStorage() {
    console.log("GeneratedNumber Mounted.. Get DB")
    
    let lottoDatas = []
    let all_keys = []
    try {
        await AsyncStorage.getAllKeys((error, keys) =>{
            all_keys = keys;
            all_keys.sort((a,b)=> (b-a))
        })
        for (let i = 0; i<all_keys.length; i++ ){
            let lottoData = await AsyncStorage.getItem(all_keys[i])
            if(lottoData){
              let tmpLottoDataObj = JSON.parse(lottoData)
              tmpLottoDataObj = {...tmpLottoDataObj, key:all_keys[i]}
              lottoDatas.push(tmpLottoDataObj)
              this.rowSwipeAnimatedValues[all_keys[i]] = new Animated.Value(0);
            }  
        }
        this.setState({lottoDatas: lottoDatas})
    }
    catch (e) {
        console.log('error from AsyncStorage: ', e)
    }
  }

  renderView(){
    let lottoDatas = this.state.lottoDatas
    if (lottoDatas.length == 0)
      return(
        <View style={[!lottoDatas.length && styles.vContainer ]}>
          {
            !lottoDatas.length && <CenterMsg message={i18n.t('title_no_number')}></CenterMsg>
          }
        </View>
      )
    else{
      return (
        <SwipeListView
          contentContainerStyle = {[!lottoDatas.length && {flex:1}]}
          data={this.state.lottoDatas}
          renderItem = {(data) => {
            return(
              <LottoItem
                lottoData = {data.item}
                style = {styles.rowFront}
                underlayColor={'#AAA'}/>
            )
          }}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
                <TouchableOpacity
                    style={[
                        styles.backRightBtn,
                        styles.backRightBtnRight,
                    ]}
                    onPress={() =>
                        this.deleteRow(rowMap, data.item.key)
                    }
                >
                    <Animated.View
                        style={[
                            styles.trash,
                            {
                                transform: [
                                    {
                                        scale: this.rowSwipeAnimatedValues[
                                            data.item.key
                                        ].interpolate({
                                            inputRange: [
                                                45,
                                                90,
                                            ],
                                            outputRange: [0, 1],
                                            extrapolate:
                                                'clamp',
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Image
                            source={require('../assets/img/trash.png')}
                            style={styles.trash}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        )}
        rightOpenValue={-75}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        //onRowDidOpen={this.onRowDidOpen}
        onSwipeValueChange={this.onSwipeValueChange}
      />

      )
    }
  }

  render() {
    let lottoDatas = this.state.lottoDatas

    console.log('render', this.state.lottoDatas)
    return (
      <SafeAreaView style={styles.pContainer}>
        {
          this.renderView()
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  pContainer: {
    flex: 1,
    
  },
  container: {
    alignItems: 'center',
    backgroundColor: Theme.colors.background
  },
  vContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.colors.background
  },


  bottomContainer: {
    flex: 1
  },
  trash: {
    height: 30,
    width: 30,
  },
  rowFront: {
    alignItems: 'stretch',
    backgroundColor: Theme.colors.background,
    borderBottomWidth: 2,
    borderBottomColor: Theme.gray.lighter,

  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

const mapStateToProps = ({ lottoReducer }) => lottoReducer;

export default connect(mapStateToProps)(withNavigationFocus(GeneratedNumbers))