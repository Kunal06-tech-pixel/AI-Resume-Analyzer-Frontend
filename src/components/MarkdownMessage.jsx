import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const MarkdownMessage = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        // Headings
        h1: ({ node, ...props }) => (
          <h1 className="markdown-h1" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="markdown-h2" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="markdown-h3" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="markdown-h4" {...props} />
        ),
        
        // Paragraphs
        p: ({ node, ...props }) => (
          <p className="markdown-p" {...props} />
        ),
        
        // Lists
        ul: ({ node, ...props }) => (
          <ul className="markdown-ul" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="markdown-ol" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="markdown-li" {...props} />
        ),
        
        // Code
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return inline ? (
            <code className="markdown-inline-code" {...props}>
              {children}
            </code>
          ) : (
            <code className={`markdown-code-block ${className || ''}`} {...props}>
              {children}
            </code>
          );
        },
        pre: ({ node, ...props }) => (
          <pre className="markdown-pre" {...props} />
        ),
        
        // Links
        a: ({ node, ...props }) => (
          <a className="markdown-link" target="_blank" rel="noopener noreferrer" {...props} />
        ),
        
        // Blockquotes
        blockquote: ({ node, ...props }) => (
          <blockquote className="markdown-blockquote" {...props} />
        ),
        
        // Tables
        table: ({ node, ...props }) => (
          <div className="markdown-table-wrapper">
            <table className="markdown-table" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="markdown-thead" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="markdown-tbody" {...props} />
        ),
        tr: ({ node, ...props }) => (
          <tr className="markdown-tr" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="markdown-th" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="markdown-td" {...props} />
        ),
        
        // Horizontal rule
        hr: ({ node, ...props }) => (
          <hr className="markdown-hr" {...props} />
        ),
        
        // Strong/Bold
        strong: ({ node, ...props }) => (
          <strong className="markdown-strong" {...props} />
        ),
        
        // Emphasis/Italic
        em: ({ node, ...props }) => (
          <em className="markdown-em" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownMessage;
