import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white p-4 font-mono">
      <div className="border-2 border-white p-8 max-w-md w-full relative">
        {/* Decorative corner squares */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white"></div>
        
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-16 h-16 animate-pulse" />
        </div>
        
        <h1 className="text-4xl font-display font-bold mb-2 text-center tracking-tighter">
          FATAL ERROR
        </h1>
        
        <div className="h-px bg-white w-full my-4"></div>
        
        <div className="space-y-4 text-sm mb-8">
          <p>SYSTEM HALTED :: ADDRESS NOT FOUND</p>
          <p className="opacity-70">
            A fatal exception 404 has occurred at 0028:C0011E36 in VXD VMM(01) +
            00010E36. The current application will be terminated.
          </p>
          <ul className="list-disc pl-5 space-y-1 opacity-70">
             <li>Press any key to terminate the current application.</li>
             <li>Press CTRL+ALT+DEL again to restart your computer.</li>
          </ul>
        </div>
        
        <div className="text-center">
          <Link href="/" className="inline-block bg-white text-black px-6 py-3 font-bold hover:bg-gray-300 uppercase tracking-widest">
             System Reboot
          </Link>
        </div>
      </div>
    </div>
  );
}
