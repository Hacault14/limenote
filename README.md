# LimeNote 📝

A modern, elegant note-taking application built with cutting-edge web technologies. LimeNote combines simplicity with powerful features to help you capture and organize your thoughts effectively.

## 🚀 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **UI/UX**: Framer Motion for smooth animations
- **Styling**: TailwindCSS for modern, responsive design

## 🛠️ Prerequisites

Before you begin, ensure you have:
- Node.js (v16 or higher)
- npm or yarn
- A Supabase account
- Git

## 🏁 Getting Started

1. **Clone the Repository**
   ```bash
   git clone [your-repository-url]
   cd limenote
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env.local`
   - Fill in your environment variables:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 🌟 Features

- ✨ Clean, minimalist interface
- 📱 Fully responsive design
- 🔐 Secure authentication
- 📝 Rich text editing
- 🗂️ Organized note management
- 🌙 Dark/Light mode support
- ⚡ Real-time sync

## 📁 Project Structure

```
limenote/
├── app/                # Next.js app directory
├── components/         # Reusable UI components
├── lib/               # Utility functions and helpers
├── public/            # Static assets
└── styles/            # Global styles and Tailwind config
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape LimeNote
- Built with love using Next.js and Supabase

