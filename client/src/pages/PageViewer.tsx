import { usePage } from "@/hooks/use-pages";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { AsciiArt } from "@/components/AsciiArt";
import { Link } from "wouter";

interface PageViewerProps {
  slug?: string;
}

export default function PageViewer({ slug = "home" }: PageViewerProps) {
  const { data: page } = usePage(slug);

  if (!page) {
    return (
      <div className="border border-white p-8 max-w-md mx-auto text-center mt-12 bg-[#050505]">
        <h1 className="text-2xl font-bold mb-2">ERROR 404</h1>
        <p className="mb-6 opacity-70">
          FILE_NOT_FOUND: The requested document "{slug}" could not be retrieved.
        </p>
        <Link href="/" className="inline-block bg-white text-black px-6 py-2 font-bold hover:bg-gray-200 transition-colors uppercase">
          Return to Root
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-xs opacity-50 mb-8 border-b border-dashed border-gray-800 pb-2">
        <span>ROOT</span>
        <span>/</span>
        <span className="uppercase">{slug}</span>
        <span className="ml-auto">LAST_MODIFIED: {new Date().toLocaleDateString()}</span>
      </div>

      {slug === 'home' && <AsciiArt variant="logo" />}

      <article>
        <MarkdownRenderer content={page.content} />
        
        <div className="mt-16 pt-8 border-t border-white">
           <div className="text-xs text-center opacity-50 uppercase">
             *** END OF FILE ***
           </div>
        </div>
      </article>
    </div>
  );
}
