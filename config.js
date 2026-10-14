// مفاتيح عامة (آمنة تظهر في المتصفح). ممنوع تحط هنا service_role أبدًا.
const SB_URL = 'https://btviglpxeukwypkantqi.supabase.co';
const SB_KEY = 'sb_publishable_BNa7U9vB8kY1myFvEnW9Mg_KZfah44K';
// بعد ما تعمل Turnstile في Cloudflare حط الـ Site Key هنا (ده كمان عام). سيبه فاضي لحد وقتها.
const TURNSTILE_SITE_KEY = '0x4AAAAAAFT-wV5m0gEbuj1d';
// الإيميل الداخلي المشتق من رقم الموبايل (مفيش رسايل بتتبعت عليه). لازم يطابق الـ SQL.
const PHONE_EMAIL_DOMAIN = 'phone.ibnrushdy.app';

// رابط الـ Edge Function اللي بتبعت رابط تغيير كلمة المرور (الأدمن بيستخدمه)
const RESET_FN_URL = 'https://btviglpxeukwypkantqi.supabase.co/functions/v1/request-reset-gmail';
