import {i18n} from '../localization'

export const ballColor= {
    y: require('../assets/img/yellow_ball.png'),
    b: require('../assets/img/blue_ball.png'),
    r: require('../assets/img/red_ball.png'),
    gr: require('../assets/img/gray_ball.png'),
    g: require('../assets/img/green_ball.png'),
    w: require('../assets/img/white_ball.png'),
    go: require('../assets/img/gold_ball.png'),
    s: require('../assets/img/sky_ball.png'),
}

export const makeLottoBallColor = (name, number, index) => {
        
    switch (name) {
        case 'lotto':
            if ((number > 0) && (number <=10))
                return ballColor.y
            else if ((number > 10) && (number <=20))
                return ballColor.b
            else if ((number > 20) && (number <=30))
                return ballColor.r
            else if ((number > 30) && (number <=40))
                return ballColor.g
            else if ((number > 34) && (number <=45))
                return ballColor.g
        case 'mm':
            if (index >= 5)
                return ballColor.go
            else
                return ballColor.w
        case 'pb':
            if (index >= 5)
                return ballColor.r
            else
                return ballColor.w
        case 'ss':
        case 'j5':
            return ballColor.s
        case 'tb':
            if (index >= 5)
                return ballColor.r
            else
                return ballColor.s
        default:
            return ballColor.s
    }


}

export const lottoRealName = (lottoName) =>{
    switch (lottoName){
        case 'lotto':
            return i18n.t('title_lotto')
        case 'mm':
            return i18n.t('title_mm')
        case 'pb':
            return i18n.t('title_pb')
        case 'tb':
            return i18n.t('title_tb')    
        case 'ss':
            return i18n.t('title_ss')    
        case 'j5':
            return i18n.t('title_j5')    
    }
      
}