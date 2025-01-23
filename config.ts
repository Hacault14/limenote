import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "FormFloow",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: "Create stunning forms that convert in minutes.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "formflow.app",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_456",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Starter",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Perfect for small projects",
        // The price you want to display, the one user will be charged on Stripe.
        price: 99,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: 149,
        features: [
          {
            name: "NextJS boilerplate",
          },
          { name: "User oauth" },
          { name: "Database" },
          { name: "Emails" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_456",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        name: "Advanced",
        description: "You need more power",
        price: 149,
        priceAnchor: 299,
        features: [
          {
            name: "NextJS boilerplate",
          },
          { name: "User oauth" },
          { name: "Database" },
          { name: "Emails" },
          { name: "1 year of updates" },
          { name: "24/7 support" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `FormFlow <noreply@formflow.app>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Admin at FormFlow <admin@formflow.app>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "support@formflow.app",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: "#9723CC",    // Primary color
    accent: "#9723CC",  // Accent color
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
  landing: {
    hero: {
      title: "Forms that",
      titleAccent: "actually convert",
      description: "Create stunning forms in minutes. Just pure conversion-focused forms that get results.",
      cta: {
        primary: "Start Building",
        secondary: "View Examples"
      },
      stats: [
        { text: "Just $X today" },
        { text: "Unlimited everything" }
      ]
    },
    builtBy: {
      description: [
        "We're on a mission to end subscription fatigue. The form builder industry has become a money-grabbing machine, with Typeform charging $600/year for basic features!",
        "Our solution? Create a powerful form builder with all the essential features you need, offered for a one-time payment. No bloat, no monthly fees—just pure value.",
        "MangoForm is part of our growing collection of subscription-free alternatives, offering all the features you actually use at a fraction of the lifetime cost."
      ],
      features: [
        "One-time $7 payment",
        "Essential features only",
        "Forever yours"
      ],
      cta: {
        text: "Discover our other tools",
        href: "https://fcksubscription.com"
      }
    },
    features: {
      title: "All the features you need,",
      titleAccent: "none that you don't",
      description: "Simple, powerful, and beautiful forms without the bloat of traditional form builders.",
      items: [
        {
          name: "Advanced Question Types",
          description: "Create engaging forms with multiple choice, rating scales, file uploads, text inputs, and more. All the question types you need.",
          icon: "list"
        },
        {
          name: "Conditional Logic",
          description: "Create dynamic forms that adapt to responses. Show or hide questions based on previous answers for a personalized experience.",
          icon: "sparkles"
        },
        {
          name: "Beautiful Themes",
          description: "Customize your form's look with beautiful themes and animations. Match your brand with custom colors and styles.",
          icon: "palette"
        },
        {
          name: "Analytics & Insights",
          description: "Track completion rates, average response time, and drop-off points. Get actionable insights to improve your forms.",
          icon: "chart"
        },
        {
          name: "Integrations",
          description: "Connect your forms with your favorite tools. Export responses to Google Sheets, Notion, or any other platform via Zapier.",
          icon: "puzzle"
        },
        {
          name: "Unlimited Everything",
          description: "No limits on responses, forms, or questions. Create as many forms as you need and collect unlimited responses.",
          icon: "infinity"
        }
      ]
    },
    why: {
      title: "Why choose",
      titleAccent: "MangoForm?",
      description: "We've reimagined what a form builder should be: simple, fast, and affordable.",
      items: [
        {
          name: "No Subscription Trap",
          description: "Unlike Typeform's $600/year, pay just $15 once and own it forever. No recurring fees, no surprise charges, just pure value.",
          icon: "shield"
        },
        {
          name: "Zero Learning Curve",
          description: "No need for tutorials or documentation. Our intuitive interface lets you create beautiful forms in minutes, not hours.",
          icon: "academic"
        },
        {
          name: "No Feature Bloat",
          description: "We've stripped away the unnecessary complexity. Every feature is there because you need it, not because it looks good in a comparison table.",
          icon: "beaker"
        },
        {
          name: "Built for Speed",
          description: "Lightning-fast forms that load instantly. No more waiting for heavy scripts or unnecessary features to load.",
          icon: "bolt"
        }
      ]
    },
    testimonials: {
      title: "They love",
      titleAccent: "the simplicity",
      description: "Discover why professionals choose MangoForm for their forms.",
      items: [
        {
          name: "Thomas Laurent",
          role: "Product Manager",
          company: "TechCorp",
          text: "MangoForm has revolutionized the way we collect customer feedback. The interface is so intuitive that we were able to create complex forms in just a few minutes.",
          avatar: "/testimonials/thomas.jpg",
          rating: 5
        },
        {
          name: "Marie Chen",
          role: "UX Researcher",
          company: "DesignPro",
          text: "Finally a form tool that doesn't waste my time! No more paying for expensive monthly subscriptions for features I never use.",
          avatar: "/testimonials/marie.jpg",
          rating: 5
        },
        {
          name: "David Martin",
          role: "Marketing Director",
          company: "InnovateLabs",
          text: "MangoForm's conditional logic is incredible. Our conversion rates have increased by 40% since we started using it for our lead gen forms.",
          avatar: "/testimonials/david.jpg",
          rating: 5
        },
        {
          name: "Sophie Dubois",
          role: "Startup Founder",
          company: "GrowthTech",
          text: "The one-time price is unbeatable. I'm saving hundreds of euros per year compared to Typeform, and I have all the features I need.",
          avatar: "/testimonials/sophie.jpg",
          rating: 5
        }
      ]
    },
    pricing: {
      title: "One price,",
      titleAccent: "everything included.",
      description: "Pay once, own forever. No subscriptions, no tiers, no limits.",
      card: {
        title: "Lifetime Access",
        subtitle: "Early access special price",
        price: {
          amount: 7,
          label: "one-time",
          comparison: "$600/year on Typeform"
        },
        features: [
          "Unlimited Forms",
          "Unlimited Responses",
          "All Question Types",
          "Custom Themes & Branding",
          "Conditional Logic",
          "File Uploads",
          "Advanced Analytics",
          "Export to Excel/CSV",
          "Form Animations",
          "Email Notifications",
          "Zapier Integration",
          "API Access"
        ],
        cta: "Get Early Access",
        priceIncreaseNotice: "Price will increase to $15 after early access period"
      },
      footer: {
        text: "Questions? Need help?",
        linkText: "Contact us"
      }
    },
    footer: {
      logo: "/logo.svg",
      description: "Simple, powerful, and beautiful forms without the bloat of traditional form builders.",
      social: [
        {
          name: "Twitter",
          href: "https://twitter.com/martinbonan_",
          icon: "twitter"
        },
        {
          name: "GitHub",
          href: "https://github.com/martinbonan",
          icon: "github"
        },
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/in/martinbonan/",
          icon: "linkedin"
        }
      ],
      legal: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" }
      ],
      links: [
        {
          title: "Product",
          items: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Examples", href: "/examples" }
          ]
        },
        {
          title: "Company",
          items: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" }
          ]
        }
      ],
      bottomText: "© 2024 FormFlow. All rights reserved."
    }
  }
} as ConfigProps;

export default config;
