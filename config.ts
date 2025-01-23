import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "LimeNote",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: "Your all-in-one workspace for notes, docs, and collaboration.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "limenote.app",
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
    fromNoReply: `LimeNote <noreply@limenote.app>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Admin at LimeNote <admin@limenote.app>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "support@limenote.app",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: "#32CD32",    // Primary color
    accent: "#32CD32",  // Accent color
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
  landing: {
    hero: {
      title: "Your workspace,",
      titleAccent: "reimagined",
      description: "Create, collaborate, and organize your thoughts in one beautiful workspace.",
      cta: {
        primary: "Get Started",
        secondary: "Learn More"
      },
      stats: [
        { text: "Unlimited pages" },
        { text: "Real-time collaboration" }
      ]
    },
    builtBy: {
      description: [
        "We believe in making powerful workspace tools accessible to everyone.",
        "LimeNote combines the best of document editing, note-taking, and collaboration in one seamless experience.",
        "Built for individuals and teams who value organization, clarity, and efficiency."
      ],
      features: [
        "Unlimited pages",
        "Real-time collaboration",
        "5MB file uploads"
      ],
      cta: {
        text: "Start organizing today",
        href: "/signup"
      }
    },
    features: {
      title: "Everything you need for",
      titleAccent: "seamless productivity",
      description: "A powerful workspace that adapts to your workflow.",
      items: [
        {
          name: "Rich Document Editing",
          description: "Create beautiful documents with our powerful block-based editor. Support for text, images, tables, and more.",
          icon: "list"
        },
        {
          name: "Real-time Collaboration",
          description: "Work together with your team in real-time. See changes as they happen and never lose track of updates.",
          icon: "sparkles"
        },
        {
          name: "Customizable Workspace",
          description: "Organize your content your way with flexible pages and nested structures.",
          icon: "palette"
        },
        {
          name: "Web Publishing",
          description: "Share your work with the world. Publish pages with custom domains and analytics integration.",
          icon: "chart"
        },
        {
          name: "Powerful Search",
          description: "Find anything instantly with our powerful search. Search across all your pages and files.",
          icon: "puzzle"
        },
        {
          name: "Security First",
          description: "Keep your data safe with 2-step verification and comprehensive workspace exports.",
          icon: "infinity"
        }
      ]
    },
    why: {
      title: "Why choose",
      titleAccent: "LimeNote?",
      description: "A workspace that puts your needs first.",
      items: [
        {
          name: "Unlimited Pages",
          description: "Create as many pages as you need. No artificial limits on your workspace.",
          icon: "document"
        },
        {
          name: "Seamless Collaboration",
          description: "Work together in real-time with your team. See changes as they happen.",
          icon: "users"
        },
        {
          name: "Easy Publishing",
          description: "Share your work with custom domains and full analytics integration.",
          icon: "globe"
        },
        {
          name: "Built for Security",
          description: "Keep your data safe with 2-step verification and comprehensive exports.",
          icon: "shield"
        }
      ]
    },
    testimonials: {
      title: "Loved by",
      titleAccent: "productive teams",
      description: "See why teams choose LimeNote for their workspace needs.",
      items: [
        {
          name: "Sophie Martin",
          role: "Product Manager",
          company: "TechStart",
          text: "LimeNote has transformed how our team collaborates. The real-time editing and organization features are exactly what we needed.",
          avatar: "/testimonials/sophie.jpg",
          rating: 5
        },
        {
          name: "Thomas Dubois",
          role: "Content Creator",
          company: "CreativeStudio",
          text: "The unlimited pages and easy publishing features have made content management a breeze.",
          avatar: "/testimonials/thomas.jpg",
          rating: 5
        }
      ]
    },
    pricing: {
      title: "Simple",
      titleAccent: "transparent pricing",
      description: "Everything you need to be productive.",
      card: {
        title: "Premium Access",
        subtitle: "All features included",
        price: {
          amount: 15,
          label: "per month",
          comparison: "No hidden fees"
        },
        features: [
          "Unlimited Pages",
          "5MB File Uploads",
          "Real-time Collaboration",
          "Custom Domain Publishing",
          "Google Analytics Integration",
          "2-Step Verification",
          "API Access",
          "Priority Support",
          "Full Workspace Export",
          "3 Daily Syncs"
        ],
        cta: "Get Started",
        priceIncreaseNotice: "All features included, no restrictions"
      },
      footer: {
        text: "Questions? Need help?",
        linkText: "Contact us"
      }
    },
    footer: {
      logo: "/logo.svg",
      description: "Your all-in-one workspace for notes, docs, and collaboration.",
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
      bottomText: "© 2024 LimeNote. All rights reserved."
    }
  }
} as ConfigProps;

export default config;
