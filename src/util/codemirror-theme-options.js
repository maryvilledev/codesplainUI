/* Schema for a theme:
 * [ ${Display name}, ${menuItem value} ]
 */
export default [
  ['Codesplain', 'codesplain'],
  ['3024 Day', '3024-day'],
  ['3024 Night', '3024-night'],
  ['ABCDEF', 'abcdef'],
  ['Ambiance', 'ambiance'],
  ['Base 16 Dark', 'base16-dark'],
  ['Base 16 Light', 'base16-light'],
  ['Bespin', 'bespin'],
  ['Blackboard', 'blackboard'],
  ['Cobalt', 'cobalt'],
  ['Colorforth', 'colorforth'],
  ['Dracula', 'dracula'],
  ['Duotone Dark', 'duotone-dark'],
  ['Duotone Light', 'duotone-light'],
  ['Eclipse', 'eclipse'],
  ['Elegant', 'elegant'],
  ['Erlang Dark', 'erlang-dark'],
  ['Hopscotch', 'hopscotch'],
  ['Icecoder', 'icecoder'],
  ['Isotope', 'isotope'],
  ['Lesser Dark', 'lesser-dark'],
  ['Liquibyte', 'liquibyte'],
  ['Material', 'material'],
  ['Mbo', 'mbo'],
  ['MDN-like', 'mdn-like'],
  ['Midnight', 'midnight'],
  ['Monokai', 'monokai'],
  ['Neat', 'neat'],
  ['Neo', 'neo'],
  ['Night', 'night'],
  ['Panda Syntax', 'panda-syntax'],
  ['Paraiso Dark', 'paraiso-dark'],
  ['Paraiso Light', 'paraiso-light'],
  ['Pastel On Dark', 'pastel-on-dark'],
  ['Railscasts', 'railscasts'],
  ['Rubyblue', 'rubyblue'],
  ['Seti', 'seti'],
  ['Solarized Dark', 'solarized-dark'],
  ['Solarized Light', 'solarized-light'],
  ['The Matrix', 'the-matrix'],
  ['Tomorrow Night Bright', 'tomorrow-night-bright'],
  ['Tomorrow Night Eighties', 'tomorrow-night-eighties'],
  ['TTCN', 'ttcn'],
  ['Twilight', 'twilight'],
  ['Vibrant Ink', 'vibrant-ink'],
  ['XQ Dark', 'xq-dark'],
  ['XQ Light', 'xq-light'],
  ['Yeti', 'yeti'],
  ['Zenburn', 'zenburn'],
];

const codeMirrorThemes = {
  'solarized-dark': 'solarized dark',
  'solarized-light': 'solarized light',
};

export const getCodeMirrorTheme = (theme) => {
  if (codeMirrorThemes[theme] !== undefined) {
    return codeMirrorThemes[theme];
  }
  return theme;
};
