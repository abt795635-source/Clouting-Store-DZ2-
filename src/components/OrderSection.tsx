import { useState, type FormEvent } from "react";
import { AlertCircle, Check, CheckCircle2, Loader2, Minus, Plus, ShieldCheck } from "lucide-react";
import {
  CURRENCY,
  DEFAULT_COUNTRY,
  PRICE_PER_UNIT,
  PRODUCT_NAME,
  VARIANTS,
  type ProductVariant,
} from "../storeConfig";
import { submitCodOrder } from "../lib/supabaseClient";
import { ProductImage } from "./ProductImage";

interface OrderSectionProps {
  selectedVariantId: string;
  onSelectVariant: (variantId: string) => void;
}

interface FormValues {
  customer_name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  country: string;
  notes: string;
}

interface FormErrors {
  customer_name?: string;
  phone?: string;
  email?: string;
  city?: string;
  address?: string;
  country?: string;
}

const INITIAL_VALUES: FormValues = {
  customer_name: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  country: DEFAULT_COUNTRY,
  notes: "",
};

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US").format(amount);
}

export function OrderSection({ selectedVariantId, onSelectVariant }: OrderSectionProps) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [quantity, setQuantity] = useState<number>(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [lastOrderSummary, setLastOrderSummary] = useState<{
    customerName: string;
    variant: string;
    quantity: number;
    total: number;
  } | null>(null);

  const activeVariant: ProductVariant =
    VARIANTS.find((v) => v.id === selectedVariantId) ?? VARIANTS[0];

  const totalAmount = PRICE_PER_UNIT * quantity;

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!values.customer_name.trim() || values.customer_name.trim().length < 2) {
      nextErrors.customer_name = "يرجى إدخال الاسم الكامل.";
    }

    const digitsOnly = values.phone.replace(/[^\d+]/g, "");
    if (!digitsOnly || digitsOnly.length < 8) {
      nextErrors.phone = "يرجى إدخال رقم هاتف صحيح للتواصل عند التوصيل.";
    }

    if (values.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email.trim())) {
        nextErrors.email = "يرجى إدخال بريد إلكتروني صحيح أو تركه فارغاً.";
      }
    }

    if (!values.city.trim()) {
      nextErrors.city = "يرجى تحديد الولاية أو المدينة.";
    }

    if (!values.address.trim() || values.address.trim().length < 5) {
      nextErrors.address = "يرجى إدخال عنوان التوصيل بالتفصيل.";
    }

    if (!values.country.trim()) {
      nextErrors.country = "يرجى إدخال اسم البلد.";
    }

    return nextErrors;
  };

  const handleFieldChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitStatus === "error") {
      setSubmitStatus("idle");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus("idle");
      return;
    }

    setErrors({});
    setSubmitStatus("idle");
    setIsSubmitting(true);

    try {
      await submitCodOrder({
        customer_name: values.customer_name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        city: values.city.trim(),
        address: values.address.trim(),
        country: values.country.trim(),
        product_name: PRODUCT_NAME,
        product_variant: activeVariant.id,
        quantity,
        notes: values.notes.trim(),
        status: "pending",
      });

      setLastOrderSummary({
        customerName: values.customer_name.trim(),
        variant: activeVariant.id,
        quantity,
        total: totalAmount,
      });
      setSubmitStatus("success");
      setValues(INITIAL_VALUES);
      setQuantity(1);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-16 sm:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <p className="text-xs font-semibold text-slate-500 mb-2">
            طلب مباشر · الدفع نقداً عند الاستلام
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight text-balance">
            أكمل بياناتك لتأكيد الطلب الآن
          </h2>
          <p className="mt-2.5 text-base text-slate-600 leading-relaxed">
            لا يتطلب بطاقة بنكية. املأ النموذج أدناه وسيتواصل معك فريقنا لتأكيد التوصيل.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Order Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.08)] p-6 sm:p-8">
            {submitStatus === "success" && (
              <div
                role="status"
                className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 sm:p-5 text-emerald-950"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-emerald-950">
                      تم استلام طلبك بنجاح!
                    </p>
                    <p className="text-emerald-800 leading-relaxed">
                      شكراً لك{lastOrderSummary ? ` يا ${lastOrderSummary.customerName}` : ""}.
                      تم تسجيل طلبك ({lastOrderSummary?.variant} ×{" "}
                      <span className="tabular-nums">{lastOrderSummary?.quantity}</span>) بقيمة{" "}
                      <span className="font-semibold tabular-nums font-display">
                        {lastOrderSummary ? `${formatPrice(lastOrderSummary.total)} ${CURRENCY}` : ""}
                      </span>
                      ، وسنتصل بك قريباً لتأكيد الشحن.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div
                role="alert"
                className="mb-6 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 sm:p-5 text-rose-950"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-rose-950">تعذر إرسال الطلب حالياً</p>
                    <p className="text-rose-800">
                      حدث خطأ أثناء تسجيل طلبك. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Variant Selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  اختر اللون / النسخة المطلوبة
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {VARIANTS.map((variant) => {
                    const isSelected = variant.id === activeVariant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => onSelectVariant(variant.id)}
                        className={`relative flex items-center gap-3 p-3 rounded-2xl border text-right transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          isSelected
                            ? "border-slate-950 bg-slate-50/80 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-full border border-black/10 shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: variant.swatchHex }}
                          aria-hidden="true"
                        >
                          {isSelected && (
                            <Check
                              className={`w-3.5 h-3.5 ${
                                variant.id === "Variant A" ? "text-white" : "text-slate-900"
                              }`}
                            />
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-xs font-semibold text-slate-900 truncate">
                            {variant.label}
                          </span>
                          <span className="block text-xs text-slate-500 truncate">
                            {variant.colorName}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between gap-4 py-3.5 px-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div>
                  <span className="block text-sm font-semibold text-slate-900">الكمية</span>
                  <span className="block text-xs text-slate-500">
                    سعر القطعة:{" "}
                    <span className="font-display font-medium tabular-nums">
                      {formatPrice(PRICE_PER_UNIT)} {CURRENCY}
                    </span>
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
                  <button
                    type="button"
                    aria-label="إنقاص الكمية"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || isSubmitting}
                    className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-display text-sm font-semibold text-slate-950 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="زيادة الكمية"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    disabled={quantity >= 20 || isSubmitting}
                    className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Customer Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customer_name" className="block text-sm font-medium text-slate-800 mb-1.5">
                    الاسم الكامل <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="customer_name"
                    name="customer_name"
                    type="text"
                    autoComplete="name"
                    value={values.customer_name}
                    onChange={(e) => handleFieldChange("customer_name", e.target.value)}
                    placeholder="مثال: أمين بن علي"
                    aria-invalid={Boolean(errors.customer_name)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                      errors.customer_name
                        ? "border-rose-400 focus:ring-rose-200"
                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900/10"
                    }`}
                  />
                  {errors.customer_name && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.customer_name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-800 mb-1.5">
                    رقم الهاتف <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    placeholder="0550 12 34 56"
                    aria-invalid={Boolean(errors.phone)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 text-right transition-colors focus:outline-none focus:ring-2 tabular-nums ${
                      errors.phone
                        ? "border-rose-400 focus:ring-rose-200"
                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900/10"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-slate-800 mb-1.5">
                    الولاية / المدينة <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={values.city}
                    onChange={(e) => handleFieldChange("city", e.target.value)}
                    placeholder="مثال: الجزائر العاصمة"
                    aria-invalid={Boolean(errors.city)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                      errors.city
                        ? "border-rose-400 focus:ring-rose-200"
                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900/10"
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.city}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-slate-800 mb-1.5">
                    البلد <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    value={values.country}
                    onChange={(e) => handleFieldChange("country", e.target.value)}
                    placeholder="الجزائر"
                    aria-invalid={Boolean(errors.country)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                      errors.country
                        ? "border-rose-400 focus:ring-rose-200"
                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900/10"
                    }`}
                  />
                  {errors.country && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.country}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-800 mb-1.5">
                  عنوان التوصيل الكامل <span className="text-rose-600">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  value={values.address}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                  placeholder="البلدية، الحي، الشارع أو نقطة دالة قريبة"
                  aria-invalid={Boolean(errors.address)}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                    errors.address
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:border-slate-900 focus:ring-slate-900/10"
                  }`}
                />
                {errors.address && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.address}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-800 mb-1.5">
                  البريد الإلكتروني{" "}
                  <span className="text-xs font-normal text-slate-400">(اختياري)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  placeholder="name@example.com"
                  aria-invalid={Boolean(errors.email)}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 text-right transition-colors focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:border-slate-900 focus:ring-slate-900/10"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-800 mb-1.5">
                  ملاحظات إضافية{" "}
                  <span className="text-xs font-normal text-slate-400">
                    (اختياري — مثل المقاس المطلوب M / L / XL)
                  </span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={values.notes}
                  onChange={(e) => handleFieldChange("notes", e.target.value)}
                  placeholder="أضف المقاس المطلوب أو الوقت المناسب للاتصال بك..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-slate-950 text-white text-sm sm:text-base font-semibold shadow-sm hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري إرسال الطلب...</span>
                  </>
                ) : (
                  <>
                    <span>تأكيد الطلب الآن —</span>
                    <span className="font-display tabular-nums">
                      {formatPrice(totalAmount)} {CURRENCY}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 bg-gradient-to-b from-slate-50 to-slate-100/70 rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <h3 className="text-lg font-bold text-slate-950">ملخص الطلب</h3>
              <span className="text-xs font-medium text-slate-500">الدفع عند الاستلام</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-24 rounded-2xl bg-white border border-slate-200/80 p-1.5 shrink-0 overflow-hidden">
                <ProductImage
                  src={activeVariant.imageUrl}
                  alt={`${PRODUCT_NAME} - ${activeVariant.label}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="font-display text-sm font-bold text-slate-950 truncate">
                  {PRODUCT_NAME}
                </p>
                <p className="text-xs text-slate-600">
                  الخيار:{" "}
                  <span className="font-display font-medium text-slate-800">
                    {activeVariant.label}
                  </span>{" "}
                  · {activeVariant.colorName}
                </p>
                <p className="text-xs text-slate-500">
                  الكمية: <span className="font-display font-semibold tabular-nums">{quantity}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200/80 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>سعر الوحدة</span>
                <span className="font-display font-medium text-slate-900 tabular-nums">
                  {formatPrice(PRICE_PER_UNIT)} {CURRENCY}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>الكمية</span>
                <span className="font-display font-medium text-slate-900 tabular-nums">
                  × {quantity}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>طريقة الدفع</span>
                <span className="font-medium text-slate-900">نقداً عند الاستلام</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-base font-bold text-slate-950">المجموع الكلي</span>
              <span className="font-display text-2xl font-bold text-slate-950 tabular-nums">
                {formatPrice(totalAmount)} {CURRENCY}
              </span>
            </div>

            <div className="pt-2 flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <span>
                طلبك محمي بالكامل: لا يتم خصم أي مبلغ إلكترونياً، وتدفع فقط عند استلام الطرد.
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
