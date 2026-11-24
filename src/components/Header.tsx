import { STORE_NAME } from "../storeConfig";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight text-slate-950 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-md"
        >
          {STORE_NAME}
        </a>

        {/* Zone 2: Concise Navigation Links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <a
            href="#benefits"
            className="hover:text-slate-950 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            المزايا
          </a>
          <a
            href="#how-cod-works"
            className="hover:text-slate-950 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            كيف يعمل الدفع عند الاستلام
          </a>
          <a
            href="#faq"
            className="hover:text-slate-950 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            الأسئلة الشائعة
          </a>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#how-cod-works"
            className="md:hidden text-xs font-medium text-slate-600 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
          >
            كيف يعمل؟
          </a>
          <a
            href="#order-form"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-slate-950 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            اطلب الآن
          </a>
        </div>
      </div>
    </header>
  );
}
