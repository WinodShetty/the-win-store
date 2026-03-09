/**
 * Master Configuration for The Win Store
 * Single point of control for the entire website.
 */

export const siteConfig = {
  brandName: "The Win",
  domain: "thewinstore.in",
  whatsappNumber: "+919392158601",
  whatsappMessage: "Hi , I'm interested in 'The Win' eBook bundle. Can you help me?",
  currency: "₹",
  adminRoute: "/admin-vk",
  countdownDate: "2026-12-31T23:59:59", // Set your target date here
  razorpay: {
  key: "import.meta.env.VITE_RAZORPAY_KEY" // we will replace later
},
  // SEO Meta Data
  seo: {
    title: "The Win | Transform Your Mindset with 5 Powerful eBooks",
    description: "Stop wasting years in traditional education without clarity. These 5 books will transform your mindset in just 1 hour.",
    keywords: "mindset, clarity, success, ebooks, personal development, the win store",
    ogImage: "https://picsum.photos/seed/thewin/1200/630",
  },

  // Theme Colors (Panchabhuta Inspired)
  theme: {
    background: "bg-[#050505]", // Midnight dark
    primary: "from-sky-500 to-teal-500", // Deep Sky Blue to Ocean Teal
    secondary: "from-orange-500 to-amber-500", // Fire Orange to Warm Gold
    accent: "text-emerald-400", // Forest Green accent
    text: "text-slate-200",
    heading: "text-white",
    cardBg: "bg-[#0A0A0A]",
    border: "border-white/10",
  },

  socialLinks: {
  instagram: "https://instagram.com/yourusername",
  facebook: "https://facebook.com/yourusername",
  twitter: "https://twitter.com/yourusername"
}
};
