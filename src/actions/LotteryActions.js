import { Lottery } from './types';

export function addLuckyWords (luckyword) {
    return {
        type: Lottery.LUCKY_WORD_ADDED,
        payload: luckyword

    }
}

export function changeCurrentLotto(currentLotto){
    return {
        type: Lottery.CURRENT_LOTTO_CHANGED,
        payload: currentLotto
    }

}

export function addLottoNumbers(LottoNumber){
    return {
        type: Lottery.LOTTO_NUMBERS_CHANGED,
        payload: LottoNumber
    }

}

export function clickedGenButton(count){
    return {
        type: Lottery.GEN_BUTTON_CLICKED,
        payload: count
    }

}

// export function addStorageKey(key){
//     return {
//         type: Lottery.ADD_STORAGE_KEY,
//         payload: key
//     }
// }

// export function addStorageKeys(keys){
//     return {
//         type: Lottery.ADD_STORAGE_KEYS,
//         payload: keys
//     }
// }
