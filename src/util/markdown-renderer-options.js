import hljs from 'highlight.js';

export default {
  langPrefix: 'hljs language-',
  highlight: function (str, lang) {
    try {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, str).value;
      }
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  }
}
