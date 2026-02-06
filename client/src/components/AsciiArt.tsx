export function AsciiArt({ variant = "logo" }: { variant?: "logo" | "separator" | "box" }) {
  if (variant === "separator") {
    return (
      <div className="font-mono text-[10px] leading-3 whitespace-pre opacity-50 my-8 overflow-hidden select-none">
        {"+--------------------------------------------------------------------------------+"}
      </div>
    );
  }
  
  if (variant === "logo") {
    return (
      <div className="font-mono text-[8px] md:text-[10px] leading-[8px] md:leading-[10px] whitespace-pre opacity-80 mb-8 select-none text-center md:text-left overflow-hidden">
{`
    ____  ____  ____  ________  ____  __    ______  
   / __ \\/ __ \\/ __ \\/_  __/ / / __ \\/ /   /  _/ /  
  / /_/ / / / / /_/ / / / / /_/ / / / /    / // /   
 / ____/ /_/ / _, _/ / / / __  / /_/ /____/ // /___ 
/_/    \\____/_/ |_| /_/ /_/ /_/\\____/_____/___/_____/
`}
      </div>
    );
  }

  return null;
}
