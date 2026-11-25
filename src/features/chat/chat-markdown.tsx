import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import sql from 'highlight.js/lib/languages/sql';
import csharp from 'highlight.js/lib/languages/csharp';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import hljs from 'highlight.js/lib/core';

let languagesRegistered = false;
function ensureLanguages() {
  if (languagesRegistered) return;
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('js', javascript);
  hljs.registerLanguage('typescript', typescript);
  hljs.registerLanguage('ts', typescript);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('sql', sql);
  hljs.registerLanguage('csharp', csharp);
  hljs.registerLanguage('cs', csharp);
  hljs.registerLanguage('bash', bash);
  hljs.registerLanguage('sh', bash);
  hljs.registerLanguage('json', json);
  hljs.registerLanguage('html', xml);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('markup', xml);
  languagesRegistered = true;
}

/** Blocks unsafe URL schemes for chat link rendering and tests. */
export function safeChatHref(href?: string | null): string | undefined {
  if (!href) return undefined;
  const url = href.trim();
  if (!url || url.startsWith('//')) return undefined;
  if (/^(javascript|data|vbscript):/i.test(url)) return undefined;
  return url;
}

export function ChatMarkdown({ markdown, streaming = false }: { markdown: string; streaming?: boolean }) {
  ensureLanguages();
  return (
    <div className="chat-markdown">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        skipHtml
        components={{
          a: ({ href, children }) => {
            const safe = safeChatHref(href);
            if (!safe) return <span>{children}</span>;
            const external = /^https?:\/\//i.test(safe);
            return <a href={safe} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
          },
        }}
      >
        {markdown}
      </Markdown>
      {streaming && <span className="chat-stream-caret" aria-hidden="true" />}
    </div>
  );
}