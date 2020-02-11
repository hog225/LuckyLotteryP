import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import {
    I18nManager,
  } from "react-native";


const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    en: () => require("./languages/en.json"),
    ko: () => require("./languages/ko.json"),
};
  


i18n.fallback = { languageTag: "en", isRTL: false };

const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

// update layout direction
I18nManager.forceRTL(isRTL);

// set i18n-js config
i18n.translations = { [languageTag]: translationGetters[languageTag]() };
i18n.locale = languageTag;


export {i18n}
