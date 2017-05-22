// Default hljs isn't imported as it contains ALL languages (which totals to
// ~520 kb).
import hljs from 'highlight.js/lib/highlight';

// Each language needs to be imported like so:
import bash from 'highlight.js/lib/languages/bash';
import cs from 'highlight.js/lib/languages/cs';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import r from 'highlight.js/lib/languages/r';
import ruby from 'highlight.js/lib/languages/ruby';
import x86asm from 'highlight.js/lib/languages/x86asm';

// Register each language to the hljs instance
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('cs', cs);
hljs.registerLanguage('go', go);
hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('php', php);
hljs.registerLanguage('python', python);
hljs.registerLanguage('r', r);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('x86asm', x86asm);

export default hljs;
