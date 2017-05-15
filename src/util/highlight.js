// Default hljs isn't imported as it contains ALL languages (which totals to
// ~520 kb).
import hljs from 'highlight.js/lib/highlight';

// Each language needs to be imported like so:
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';

// Register each language to the hljs instance
hljs.registerLanguage('java', java);
hljs.registerLanguage('python', python);

export default hljs;
