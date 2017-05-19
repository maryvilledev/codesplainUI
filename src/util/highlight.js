// Default hljs isn't imported as it contains ALL languages (which totals to
// ~520 kb).
import hljs from 'highlight.js/lib/highlight';

// Each language needs to be imported like so:
import bash from 'highlight.js/lib/languages/bash';
import clojure from 'highlight.js/lib/languages/clojure';
import cs from 'highlight.js/lib/languages/cs';
import fortran from 'highlight.js/lib/languages/fortran';
import go from 'highlight.js/lib/languages/go';
import haskell from 'highlight.js/lib/languages/haskell';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import lisp from 'highlight.js/lib/languages/lisp';
import lua from 'highlight.js/lib/languages/lua';
import matlab from 'highlight.js/lib/languages/matlab';
import perl from 'highlight.js/lib/languages/perl';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import r from 'highlight.js/lib/languages/r';
import ruby from 'highlight.js/lib/languages/ruby';
import scala from 'highlight.js/lib/languages/scala';
import sql from 'highlight.js/lib/languages/sql';
import x86asm from 'highlight.js/lib/languages/x86asm';
import xml from 'highlight.js/lib/languages/xml';

// Register each language to the hljs instance
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('clojure', clojure);
hljs.registerLanguage('cs', cs);
hljs.registerLanguage('fortran', fortran);
hljs.registerLanguage('go', go);
hljs.registerLanguage('haskell', haskell);
hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('lisp', lisp);
hljs.registerLanguage('lua', lua);
hljs.registerLanguage('matlab', matlab);
hljs.registerLanguage('perl', perl);
hljs.registerLanguage('php', php);
hljs.registerLanguage('python', python);
hljs.registerLanguage('r', r);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('scala', scala);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('x86asm', x86asm);
hljs.registerLanguage('xml', xml);

export default hljs;
