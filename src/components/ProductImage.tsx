import { useState } from "react";
import { Shirt } from "lucide-react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 via-slate-50 to-sky-50/60 text-slate-400 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Shirt className="w-12 h-12 stroke-[1.5]" />
        <span className="text-xs font-medium text-slate-500 px-4 text-center">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
