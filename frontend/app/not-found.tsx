import NextLink from "next/link";

const BrainMark = ({ className = "w-8 h-8", size = 32 }: any) => {
  const pixelSize = typeof className === 'string' && className.includes('w-8') ? 32 : size;
  return (
    <svg 
      width={pixelSize} 
      height={pixelSize} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      style={{ width: pixelSize, height: pixelSize, maxWidth: '100%', flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
      <path d="M12 4.5V19.5" />
      <path d="M9.5 12H12" />
      <path d="M14.5 12H12" />
      <path d="M10.5 8H12" />
      <path d="M13.5 8H12" />
      <path d="M10.5 16H12" />
      <path d="M13.5 16H12" />
    </svg>
  );
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F7F9] font-sans text-slate-900 antialiased px-6 py-16">
      <div className="flex flex-col items-center text-center bg-white rounded-[24px] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] px-10 py-12 sm:px-16 max-w-md w-full">
        <div className="w-16 h-16 rounded-2xl bg-[#EBF3FF] text-[#2563EB] flex items-center justify-center mb-6">
          <BrainMark className="w-8 h-8" />
        </div>
        <p className="text-[13px] font-bold tracking-widest text-[#2563EB] uppercase mb-2">Error 404</p>
        <h1 className="text-[26px] font-bold text-slate-900 tracking-tight">Page not found</h1>
        <p className="text-[14px] text-slate-500 font-medium mt-2 mb-8">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <NextLink
          href="/"
          className="w-full bg-[#2563EB] hover:bg-blue-700 text-white text-[14px] font-semibold py-3 px-5 rounded-xl transition-colors"
        >
          Back to Dashboard
        </NextLink>
        <NextLink
          href="/admin"
          className="text-[13px] font-semibold text-slate-500 hover:text-[#2563EB] mt-4 transition-colors"
        >
          Go to Admin Console
        </NextLink>
      </div>
    </div>
  );
}
