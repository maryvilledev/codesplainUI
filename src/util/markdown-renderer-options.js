import hljs from 'highlight.js';

export default {
  langPrefix: 'hljs language-',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        console.log('foo');
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }
    console.log('bar');
    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}
    console.log('baz');
    return ''; // use external default escaping
  }
}
