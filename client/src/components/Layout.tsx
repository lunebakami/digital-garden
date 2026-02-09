import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { usePages } from "@/hooks/use-pages";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { data: pages } = usePages();

  return (
    <div className="h-screen flex flex-col font-mono text-sm crt-flicker selection:bg-white selection:text-black">
      {/* Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-20"></div>

      {/* Main Content Area - takes remaining space, content scrolls */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Navigation - Fixed, no scroll */}
        <nav className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white p-4 md:p-6 shrink-0 bg-black">
          <div className="mb-8">
            <h1 className="text-xl md:text-2xl font-display font-bold uppercase tracking-wider mb-1">
              PORTFOLIO
            </h1>
            <p className="text-xs opacity-60">v2.0.0.1</p>
          </div>

          <div className="space-y-4">
            <div className="text-xs uppercase opacity-50 mb-2 border-b border-gray-800 pb-1">Directory</div>
            <ul className="space-y-2">
              <li>
                <Link href="/" className={`
                  block py-1 px-2 hover:bg-white hover:text-black transition-colors duration-0
                  ${location === "/" ? "bg-white text-black font-bold" : ""}
                `}>
                  &gt; HOME.exe
                </Link>
              </li>
              
              {pages?.filter(p => p.slug !== 'home').map((page) => (
                <li key={page.id}>
                  <Link href={`/${page.slug}`} className={`
                    block py-1 px-2 hover:bg-white hover:text-black transition-colors duration-0 uppercase
                    ${location === `/${page.slug}` ? "bg-white text-black font-bold" : ""}
                  `}>
                    &gt; {page.title}.txt
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 md:mt-auto pt-8 border-t border-dashed border-gray-800">
            <div className="grid grid-cols-2 gap-2 text-xs opacity-60">
              <div>STATUS:</div>
              <div className="text-right">ONLINE</div>
              <div>UPTIME:</div>
              <div className="text-right">99.9%</div>
              <div>LOC:</div>
              <div className="text-right">BRAZIL</div>
            </div>
          </div>
        </nav>

        {/* Content Viewport */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
             {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white p-2 flex justify-between items-center text-xs bg-black z-40">
        <a 
          href="https://github.com/lunebakami/digital-garden" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-mono hover:text-gray-400 transition-colors"
        >
          <span className="opacity-70">&gt; READY</span>
          <span className="cursor-blink">_</span>
        </a>
        <div className="opacity-50">
          © 1999-2025
        </div>
      </footer>
    </div>
  );
}
