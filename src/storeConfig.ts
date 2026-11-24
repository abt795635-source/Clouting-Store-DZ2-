/**
 * ============================================================================
 *  BEGINNER CUSTOMIZATION FILE — ملف تخصيص القالب
 * ============================================================================
 *  Edit the constants below to customize your entire one-product COD store.
 *  قم بتعديل القيم أدناه لتخصيص متجرك بالكامل بسهولة.
 * ============================================================================
 */

// 1) Store & Brand Identity — اسم المتجر والهوية
export const STORE_NAME = "Clothing Store DZ";
export const STORE_SUBTITLE = "ملابس رجالية مختارة بعناية · الدفع عند الاستلام";

// 2) Product Details — تفاصيل المنتج
export const PRODUCT_NAME = "Men's 2 Piece Sweatsuit";
export const PRODUCT_ARABIC_SUBTITLE = "طقم رياضي رجالي عصري من قطعتين بنقشة محبوكة فاخرة";

export const PRODUCT_DESCRIPTION = `كنزة كلاسيكية برقبة دائرية
حواف محكمة، بدون خيوط سائبة، سهلة الارتداء والخلع، لا قيود على الارتداء

أساور أكمام محبوكة مضلعة قابلة للتمدد
توفر الأساور المرنة ملاءمة آمنة ومريحة مع المساعدة في إبقاء الأكمام في مكانها بشكل أنيق

رباط مطاطي
اضبط مقاس الخصر بحرية، مناسب لأشكال الجسم المختلفة`;

// 3) Pricing & Currency — السعر والعملة
export const PRICE_PER_UNIT = 8000;
export const CURRENCY = "DA";
export const DEFAULT_COUNTRY = "الجزائر";

// 4) Product Variants — خيارات / ألوان المنتج
// Note: Keep "id" equal to the exact variant name you want saved in Supabase.
export interface ProductVariant {
  id: string;
  label: string;
  colorName: string;
  swatchHex: string;
  imageUrl: string;
}

export const VARIANTS: ProductVariant[] = [
  {
    id: "Variant A",
    label: "Variant A",
    colorName: "أسود فحمي",
    swatchHex: "#18181b",
    imageUrl: "/assets/aistudio/image_4adb999f.png",
  },
  {
    id: "Variant B",
    label: "Variant B",
    colorName: "أزرق سماوي",
    swatchHex: "#93b7d8",
    imageUrl: "/assets/aistudio/image_0578d45c.png",
  },
  {
    id: "Variant C",
    label: "Variant C",
    colorName: "بيج رملي",
    swatchHex: "#c7b59e",
    imageUrl: "/assets/aistudio/image_6f05f379.png",
  },
];

// 5) Supabase Configuration (INSERT-only) — إعدادات قاعدة البيانات
// Replace these placeholders with your own Supabase Project URL & Publishable Key.
export const SUPABASE_URL = "https://ejfsgrjzuqmhhfsrpkkm.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_X1Bl66-1ML790ROP-f8FrQ_XiMhToEv";

// 6) Benefits Section (3 Cards) — قسم المزايا (3 بطاقات)
export interface BenefitItem {
  id: string;
  title: string;
  description: string;
}

export const BENEFITS: BenefitItem[] = [
  {
    id: "craft",
    title: "خياطة متقنة وحواف محكمة",
    description:
      "تصميم عملي بدون خيوط سائبة مع رقبة دائرية مريحة تحافظ على شكلها الأنيق بعد الغسيل والاستخدام اليومي.",
  },
  {
    id: "fit",
    title: "مرونة عالية ومقاس قابل للتعديل",
    description:
      "أساور مضلعة قابلة للتمدد تثبت الأكمام بأناقة، مع رباط خصر مطاطي يمنحك حرية ضبط المقاس حسب جسمك.",
  },
  {
    id: "cod",
    title: "دفع آمن 100% عند الاستلام",
    description:
      "لا حاجة لبطاقة بنكية أو دفع مسبق؛ اطلب الآن وادفع نقداً فقط عند استلام الطرد أمام باب منزلك.",
  },
];

// 7) How COD Works (3 Steps) — خطوات الدفع عند الاستلام (3 خطوات)
export interface CodStep {
  number: string;
  title: string;
  description: string;
}

export const COD_STEPS: CodStep[] = [
  {
    number: "01",
    title: "أكمل نموذج الطلب",
    description: "اختر اللون والكمية المناسبة ثم أدخل اسمك ورقم هاتفك وعنوان التوصيل في أقل من دقيقة.",
  },
  {
    number: "02",
    title: "تأكيد هاتفي وشحن سريع",
    description: "يتواصل معك فريقنا لتأكيد الطلبية وشحنها فوراً إلى ولايتك مع شركة التوصيل المعتمدة.",
  },
  {
    number: "03",
    title: "الاستلام والدفع نقداً",
    description: "يصل الطرد إلى عنوانك، وتدفع المبلغ الإجمالي نقداً لموزع التوصيل بكل أمان وراحة.",
  },
];

// 8) FAQ Section (3 Items) — الأسئلة الشائعة (3 أسئلة)
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "كم يستغرق وصول الطلبية؟",
    answer:
      "تصل الطلبات عادة خلال 24 إلى 72 ساعة حسب الولاية، وسيتصل بك الموزع قبل الوصول لتنسيق موعد التسليم.",
  },
  {
    question: "هل الدفع يتم عند الاستلام فعلاً؟",
    answer:
      "نعم، الدفع يتم نقداً بالكامل عند استلام الطرد من الموزع، ولا نطلب أي دفعة مسبقة أو بيانات بطاقة بنكية.",
  },
  {
    question: "كيف أختار اللون أو أضيف ملاحظة حول المقاس؟",
    answer:
      "يمكنك اختيار اللون المطلوب (Variant A / B / C) مباشرة من بطاقة المنتج أو نموذج الطلب، كما يمكنك كتابة المقاس المفضل أو أي تفاصيل إضافية في خانة الملاحظات.",
  },
];
