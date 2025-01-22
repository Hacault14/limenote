export type Theme =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "garden"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "dracula"
  | "";

export interface ConfigProps {
  // REQUIRED
  appName: string;
  appDescription: string;
  domainName: string;

  // Colors configuration
  colors: {
    theme: string;
    main: string;    // Primary color
    accent: string;  // Accent color
  };

  // Landing page configuration
  landing: {
    hero: {
      title: string;
      titleAccent: string;
      description: string;
      cta: {
        primary: string;
        secondary: string;
      };
      stats: Array<{
        text: string;
      }>;
    };
    builtBy: {
      description: Array<string>;
      features: Array<string>;
      cta: {
        text: string;
        href: string;
      };
    };
    features: {
      title: string;
      titleAccent: string;
      description: string;
      items: Array<{
        name: string;
        description: string;
        icon: "list" | "sparkles" | "palette" | "chart" | "puzzle" | "infinity";  // Predefined icon set
      }>;
    };
    why: {
      title: string;
      titleAccent: string;
      description: string;
      items: Array<{
        name: string;
        description: string;
        icon: "shield" | "academic" | "beaker" | "bolt";
      }>;
    };
    testimonials: {
      title: string;
      titleAccent: string;
      description: string;
      items: Array<{
        name: string;
        role: string;
        company: string;
        text: string;
        avatar: string;
        rating: number;
      }>;
    };
    pricing: {
      title: string;
      titleAccent: string;
      description: string;
      card: {
        title: string;
        subtitle: string;
        price: {
          amount: number;
          label: string;
          comparison: string;
        };
        features: string[];
        cta: string;
        priceIncreaseNotice: string;
      };
      footer: {
        text: string;
        linkText: string;
      };
    };
    footer: {
      logo: string;
      description: string;
      social: Array<{
        name: string;
        href: string;
        icon: "twitter" | "github" | "linkedin";
      }>;
      legal: Array<{
        name: string;
        href: string;
      }>;
      bottomText: string;
      links: Array<{
        title: string;
        items: Array<{
          label: string;
          href: string;
        }>;
      }>;
    };
  };

  // Other existing configurations
  stripe: {
    plans: Array<{
      priceId: string;
      name: string;
      description: string;
      price: number;
      priceAnchor?: number;
      features: Array<{
        name: string;
      }>;
      isFeatured?: boolean;
    }>;
  };
  aws: {
    bucket: string;
    bucketUrl: string;
    cdn: string;
  };
  resend: {
    fromNoReply: string;
    fromAdmin: string;
    supportEmail: string;
  };
  auth: {
    loginUrl: string;
    callbackUrl: string;
  };
  crisp?: {
    id: string;
    onlyShowOnRoutes?: string[];
  };
}
