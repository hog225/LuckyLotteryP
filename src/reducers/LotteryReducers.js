import { Lottery } from '../actions/types';

const INITIAL_STATE = {
  luckyWords: {},
  currentLotto: {},
  lottoNumbers: [],
  genButtonClicked: {show: false},
//   storageKeys: []
};

//currentLotto = {name, country, ballCount}
//lottoNumbers = [{name, show: bool, numbers: array }]
//

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Lottery.LUCKY_WORD_ADDED:
      console.log(state)
      
      return {...state, luckyWords: { ...state.luckyWords, ...action.payload}}
    case Lottery.CURRENT_LOTTO_CHANGED:
      return { ...state, currentLotto:  action.payload};
    case Lottery.LOTTO_NUMBERS_CHANGED:
      
      if (state.lottoNumbers.length == 0){
        state.lottoNumbers.push(action.payload)
      }
      else{
        let update = false
        state.lottoNumbers.map((item, index) => {
          if (item.name == action.payload.name){
            state.lottoNumbers[index] = action.payload
            update = true
            return
          }
        })
        if (update == false)
          state.lottoNumbers.push(action.payload)
      }
      
      return state;
    case Lottery.GEN_BUTTON_CLICKED:
      return { ...state, genButtonClicked:  action.payload};
    // case Lottery.ADD_STORAGE_KEY:
    //   state.storageKeys.push(action.payload)
    //   return state
    // case Lottery.ADD_STORAGE_KEYS:  
    //   return { ...state, storageKeys:  action.payload};
    default:
      return state;
  }
};
