# FckSubscription Boilerplate

A modern SaaS boilerplate built with TypeScript, Supabase, and Stripe. Get your subscription-based service up and running quickly with this production-ready template.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Supabase](https://supabase.com/) - Backend and authentication
- [Stripe](https://stripe.com/) - Payment processing
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

## Prerequisites

Before you begin, ensure you have:
- Node.js installed (v16 or higher)
- A Supabase account
- A Stripe account

## Getting Started

1. **Clone and Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   - Rename `.env.example` to `.env.local`
   - Fill in your environment variables:
     - Supabase credentials
     - Stripe API keys
     - Other configuration values

3. **Install Additional Dependencies**
   ```bash
   # Install Framer Motion for animations
   npm install framer-motion

   # Install Tailwind Forms plugin
   npm install -D @tailwindcss/forms
   ```

4. **Supabase Setup**
   - Create a Supabase project
   - Copy your project URL and anon key to `.env.local`
   - Set up your database schema (documentation coming soon)

5. **Customize Assets**
   Before deploying, remember to update:
   - `icon.png`
   - `favicon.ico`
   - OpenGraph images
   - Twitter card images

## Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Documentation

For more detailed documentation, visit [shipfas.st/docs](https://shipfas.st/docs)

## License

C'est oim

