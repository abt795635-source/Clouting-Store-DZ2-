import { useState } from "react";
import { ArrowDown, Banknote, CheckCircle2, ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  BENEFITS,
  COD_STEPS,
  CURRENCY,
  FAQ_ITEMS,
  PRICE_PER_UNIT,
  PRODUCT_ARABIC_SUBTITLE,
  PRODUCT_DESCRIPTION,
  PRODUCT_NAME,
  STORE_NAME,
  STORE_SUBTITLE,
  VARIANTS,
} from "./storeConfig";
import { Header } from "./components/Header";
import { OrderSection } from "./components/OrderSection";
import { ProductImage } from "./components/ProductImage";

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US").format(amount);
}

const BENEFIT_ICONS = {
  craft: CheckCircle2,
  fit: SlidersHorizontal,
  cod: Banknote,
} as const;

export default function App() {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(VARIANTS[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeVariant =
    VARIANTS.find((v) => v.id === selectedVariantId) ?? VARIANTS[0];

  const descriptionBlocks = PRODUCT_DESCRIPTION.split("\n\n")
    .map((block) => {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      return {
        heading: lines[0] ?? "",
        body: lines.slice(1).join(" "),
      };
    })
    .filter((b) => b.heading);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      <main className="flex-1">
        {/* 1) Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-sky-50/35 to-white pt-10 pb-16 sm:pt-14 sm:pb-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[56rem] h-[24rem] rounded-full bg-gradient-to-r from-sky-100/50 via-indigo-100/35 to-stone-100/50 blur-3xl"
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Product Copy & Primary Actions */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
                  <span>{STORE_NAME}</span>
                  <span aria-hidden="true">·</span>
                  <span>الدفع عند الاستلام</span>
                  <span aria-hidden="true">·</span>
                  <span>توصيل لجميع الولايات</span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight leading-tight text-balance">
                  {PRODUCT_NAME}
                </h1>
                <p className="mt-2.5 text-base sm:text-lg text-slate-600 font-medium">
                  {PRODUCT_ARABIC_SUBTITLE}
                </p>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-display text-3xl font-bold text-slate-950 tabular-nums">
                    {formatPrice(PRICE_PER_UNIT)} {CURRENCY}
                  </span>
                  <span className="text-sm text-slate-500">شامل الطقم الكامل (قطعتين)</span>
                </div>

                {/* Product Description Blocks */}
                <div className="mt-6 space-y-4 border-t border-slate-200/80 pt-6">
                  {descriptionBlocks.map((block) => (
                    <div key={block.heading} className="space-y-1">
                      <h2 className="text-sm font-bold text-slate-900">{block.heading}</h2>
                      {block.body && (
                        <p className="text-sm text-slate-600 leading-relaxed">{block.body}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Interactive Variant Selector in Hero */}
                <div className="mt-6 pt-5 border-t border-slate-200/80">
                  <p className="text-xs font-semibold text-slate-500 mb-2.5">
                    الألوان المتوفرة:{" "}
                    <span className="text-slate-900 font-display">{activeVariant.label}</span>{" "}
                    <span className="text-slate-600">({activeVariant.colorName})</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {VARIANTS.map((variant) => {
                      const isSelected = variant.id === activeVariant.id;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => setSelectedVariantId(variant.id)}
                          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                            isSelected
                              ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/40 shrink-0"
                            style={{ backgroundColor: variant.swatchHex }}
                            aria-hidden="true"
                          />
                          <span className="font-display">{variant.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hero CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#order-form"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-950 text-white text-sm sm:text-base font-semibold shadow-sm hover:bg-slate-800 active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                  >
                    <span>اطلب الآن —</span>
                    <span className="font-display tabular-nums">
                      {formatPrice(PRICE_PER_UNIT)} {CURRENCY}
                    </span>
                  </a>

                  <a
                    href="#how-cod-works"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:border-slate-300 hover:text-slate-950 transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    <span>كيف يعمل الدفع عند الاستلام</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Product Studio Showcase */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="flex-1 min-h-[380px] sm:min-h-[480px] rounded-3xl bg-white border border-slate-200/80 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.08)] p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                  <ProductImage
                    src={activeVariant.imageUrl}
                    alt={`${PRODUCT_NAME} - ${activeVariant.label} (${activeVariant.colorName})`}
                    className="w-full h-full max-h-[460px] object-contain transition-opacity duration-200"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {VARIANTS.map((variant) => {
                    const isSelected = variant.id === activeVariant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`group flex items-center gap-2.5 p-2.5 rounded-2xl border bg-white text-right transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          isSelected
                            ? "border-slate-950 shadow-sm"
                            : "border-slate-200/80 hover:border-slate-300"
                        }`}
                      >
                        <div className="w-11 h-14 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0 overflow-hidden">
                          <ProductImage
                            src={variant.imageUrl}
                            alt={variant.colorName}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="block font-display text-xs font-semibold text-slate-900 truncate">
                            {variant.label}
                          </span>
                          <span className="block text-[11px] text-slate-500 truncate">
                            {variant.colorName}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2) Benefits Section (3 Cards) */}
        <section id="benefits" className="py-16 sm:py-20 bg-white scroll-mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mb-10 sm:mb-12">
              <p className="text-xs font-semibold text-slate-500 mb-2">لماذا يختاره عملاؤنا</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight text-balance">
                جودة عملية مصممة للراحة اليومية
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BENEFITS.map((benefit) => {
                const Icon =
                  BENEFIT_ICONS[benefit.id as keyof typeof BENEFIT_ICONS] ?? CheckCircle2;
                return (
                  <div
                    key={benefit.id}
                    className="rounded-3xl bg-slate-50/75 border border-slate-200/75 p-6 sm:p-7 flex flex-col justify-between transition-colors duration-150 hover:bg-slate-50"
                  >
                    <div>
                      <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-900 mb-5 shadow-xs">
                        <Icon className="w-5 h-5 stroke-[1.75]" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3) How COD Works (3 Steps) */}
        <section
          id="how-cod-works"
          className="py-16 sm:py-20 bg-gradient-to-b from-slate-50/90 to-slate-50/40 border-y border-slate-200/60 scroll-mt-16"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mb-10 sm:mb-12">
              <p className="text-xs font-semibold text-slate-500 mb-2">خطوات بسيطة وواضحة</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight text-balance">
                كيف يعمل الدفع عند الاستلام؟
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COD_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.06)]"
                >
                  <span className="inline-block font-display text-sm font-bold text-slate-400 tabular-nums mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4) Order Form + Order Summary */}
        <OrderSection
          selectedVariantId={selectedVariantId}
          onSelectVariant={setSelectedVariantId}
        />

        {/* 5) FAQ (3 Items) */}
        <section
          id="faq"
          className="py-16 sm:py-20 bg-slate-50/60 border-t border-slate-200/60 scroll-mt-16"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-slate-500 mb-2">إجابات سريعة</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                الأسئلة الشائعة
              </h2>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200/80 divide-y divide-slate-200/70 overflow-hidden">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-right hover:bg-slate-50/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-900"
                    >
                      <span className="text-sm sm:text-base font-semibold text-slate-950">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* 6) Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-right">
            <span className="font-display text-base font-bold text-slate-950">{STORE_NAME}</span>
            <span className="hidden sm:inline text-slate-300" aria-hidden="true">
              ·
            </span>
            <span className="text-xs text-slate-500">{STORE_SUBTITLE}</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#benefits" className="hover:text-slate-900 transition-colors">
              المزايا
            </a>
            <a href="#how-cod-works" className="hover:text-slate-900 transition-colors">
              الدفع عند الاستلام
            </a>
            <a href="#order-form" className="hover:text-slate-900 transition-colors">
              اطلب الآن
            </a>
          </div>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} {STORE_NAME}
          </p>
        </div>
      </footer>
    </div>
  );
}
