/**
 * Created by luojiafeng on 2017/5/9.
 */
export default {
  //'locale': 'en',
  'locale': process.env.NODE_ENV === 'productionen' ? 'en' : 'zh-CN', // local language
  'languages': ['en', 'zh-CN'] // packaged languages
};