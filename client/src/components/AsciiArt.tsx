import { useMemo } from "react";

// Dynamically import all txt files from ascii directory
const logoFiles = import.meta.glob('../../../ascii/*.txt', { 
  query: '?raw', 
  import: 'default',
  eager: true 
}) as Record<string, string>;

const logos = Object.values(logoFiles);

export function AsciiArt({
  variant = "logo",
}: {
  variant?: "logo" | "separator";
}) {
  // Randomly select a logo on mount (not on every render)
  const randomLogo = useMemo(() => {
    if (logos.length === 0) return "";
    const index = Math.floor(Math.random() * logos.length);
    return logos[index];
  }, []);

  if (variant === "separator") {
    return (
      <div className="font-mono text-[10px] leading-3 whitespace-pre opacity-50 my-8 overflow-hidden select-none">
        {"+--------------------------------------------------------------------------------+"}
      </div>
    );
  }

  if (variant === "logo" && randomLogo) {
    return (
      <div className="font-mono text-[8px] md:text-[10px] leading-[8px] md:leading-[10px] whitespace-pre opacity-80 mb-8 select-none text-center md:text-left overflow-hidden">
        {randomLogo}
      </div>
    );
  }

  return null;
}
