import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

export default function Markdown({ children, className = '' }) {
  return (
    <div
      className={
        'prose prose-ink max-w-none dark:prose-invert ' +
        'prose-headings:font-display prose-headings:tracking-tight ' +
        'prose-a:text-accent-600 dark:prose-a:text-accent-300 prose-a:no-underline hover:prose-a:underline ' +
        'prose-code:rounded prose-code:bg-ink-100 dark:prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 ' +
        'prose-code:before:content-none prose-code:after:content-none ' +
        'prose-pre:rounded-xl prose-pre:border prose-pre:border-ink-200 dark:prose-pre:border-white/10 ' +
        className
      }
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
