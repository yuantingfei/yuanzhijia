/**
 * Created by luojiafeng on 2017/5/8.
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import config from './config';
import enlocale from 'element-ui/lib/locale';
Vue.use(VueI18n);

const locale = config.locale || 'zh-CN';
const languages = config.languages || [];
const messages = {};
languages.map(lang => {
  messages[lang] = Object.assign(require(`./lang/${lang}`), require(`element-ui/lib/locale/lang/${lang}`).default);
});
// Create VueI18n instance with options
const $i18n = new VueI18n({
  locale,      // set locale
  fallbackLocale: 'en', // locale key find nothing, fallbackLocale key instead
  messages     // set locale messages
});

window.$i18n = $i18n; // can use '$i18n.t(key)' outside vue instance
export default $i18n;
enlocale.i18n((key, value) => $i18n.t(key, value));
