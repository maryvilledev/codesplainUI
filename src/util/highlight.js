// Default hljs isn't imported as it contains ALL languages (which totals to
// ~520 kb).
import hljs from 'highlight.js/lib/highlight';

// Each language needs to be imported like so:
import fortran from 'highlight.js/lib/languages/fortran';
import clojure from 'highlight.js/lib/languages/clojure';
import lisp from 'highlight.js/lib/languages/lisp';
import lua from 'highlight.js/lib/languages/lua';
import scala from 'highlight.js/lib/languages/scala';
import bash from 'highlight.js/lib/languages/bash';
import x86asm from 'highlight.js/lib/languages/x86asm';
import r from 'highlight.js/lib/languages/r';
import xml from 'highlight.js/lib/languages/xml';
import perl from 'highlight.js/lib/languages/perl';
import matlab from 'highlight.js/lib/languages/matlab';
import sql from 'highlight.js/lib/languages/sql';
import ruby from 'highlight.js/lib/languages/ruby';
import php from 'highlight.js/lib/languages/php';
import javascript from 'highlight.js/lib/languages/javascript';
import cs from 'highlight.js/lib/languages/cs';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import haskell from 'highlight.js/lib/languages/haskell';

// Register each language to the hljs instance
hljs.registerLanguage('haskell', haskell);
hljs.registerLanguage('fortran', fortran);
hljs.registerLanguage('clojure', clojure);
hljs.registerLanguage('lisp', lisp);
hljs.registerLanguage('lua', lua);
hljs.registerLanguage('scala', scala);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('x86asm', x86asm);
hljs.registerLanguage('r', r);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('perl', perl);
hljs.registerLanguage('matlab', matlab);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('php', php);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('cs', cs);
hljs.registerLanguage('go', go);
hljs.registerLanguage('java', java);
hljs.registerLanguage('python', python);

export default hljs;
