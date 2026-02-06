import ReactMarkdown from 'react-markdown';

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-p:font-mono max-w-none">
      <ReactMarkdown 
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-display font-bold uppercase border-b-2 border-white pb-4 mb-8" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl md:text-2xl font-display font-bold uppercase mt-8 mb-4 flex items-center gap-2 before:content-['#'] before:opacity-50" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg md:text-xl font-display font-bold uppercase mt-6 mb-3 border-b border-dashed border-gray-600 pb-1 inline-block" {...props} />,
          code: ({node, ...props}) => <code className="bg-white text-black px-1 py-0.5 text-sm font-bold" {...props} />,
          pre: ({node, ...props}) => <pre className="bg-[#111] border border-white p-4 overflow-x-auto mb-6 text-sm" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-white pl-4 italic opacity-80 my-6 bg-[#0a0a0a] py-2 pr-2" {...props} />,
          hr: ({node, ...props}) => <div className="border-t border-dashed border-white opacity-50 my-8" {...props} />,
          img: ({node, ...props}) => (
            <div className="border-2 border-white p-1 inline-block bg-white max-w-full my-4">
              <img className="grayscale contrast-125 block" {...props} />
            </div>
          ),
          table: ({node, ...props}) => <div className="overflow-x-auto mb-6"><table className="w-full border-collapse border border-white text-left" {...props} /></div>,
          th: ({node, ...props}) => <th className="border border-white p-2 bg-white text-black font-bold uppercase text-xs" {...props} />,
          td: ({node, ...props}) => <td className="border border-white p-2 text-sm" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
