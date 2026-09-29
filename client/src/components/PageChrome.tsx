import { ReactNode } from "react";

export function PageChrome({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs opacity-50 mb-8 border-b border-dashed border-gray-800 pb-2">
        <span>ROOT</span>
        <span>/</span>
        <span className="uppercase">{slug}</span>
        <span className="ml-auto">LAST_MODIFIED: {new Date().toLocaleDateString()}</span>
      </div>

      {children}

      <div className="mt-16 pt-8 border-t border-white">
        <div className="text-xs text-center opacity-50 uppercase">
          *** END OF FILE ***
        </div>
      </div>
    </div>
  );
}
