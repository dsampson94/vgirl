# VGirl - Premium AI Virtual Companions

A Next.js application for creating, customizing, and interacting with premium AI virtual companions.

## 🚀 Features

- **AI Virtual Companions**: Create and customize AI personalities
- **Premium Content**: Exclusive content packs and experiences
- **User Authentication**: Secure login and registration system
- **Dashboard**: Personal management interface
- **SEO Optimized**: Complete SEO setup with metadata, sitemaps, and structured data
- **Responsive Design**: Mobile-first responsive design
- **PWA Ready**: Progressive Web App capabilities

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.3 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **TypeScript**: Full TypeScript support
- **Authentication**: Ready for NextAuth.js integration

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/dsampson94/vgirl.git
   cd vgirl
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database URL and other configurations.

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 SEO Features

### Metadata & Open Graph
- Complete meta tags for all pages
- Open Graph tags for social media sharing
- Twitter Card support
- Structured JSON-LD data

### Technical SEO
- Dynamic sitemap generation (`/api/sitemap`)
- Robots.txt configuration
- Canonical URLs
- PWA manifest file
- Optimized image handling

### Performance
- Next.js optimizations
- Font optimization with Geist
- Image optimization
- Static generation where possible

## 📁 Project Structure

```
app/
├── api/                 # API routes
├── auth/               # Authentication pages
├── dashboard/          # User dashboard
├── create-vgirl/       # VGirl creation
├── landing.tsx         # Landing page component
├── layout.tsx          # Root layout with SEO
└── page.tsx            # Home page

components/
└── ui/                 # Reusable UI components

lib/
└── prisma.ts          # Database connection

prisma/
└── schema.prisma      # Database schema

public/
├── robots.txt         # Search engine instructions
├── sitemap.xml        # Static sitemap
└── site.webmanifest   # PWA manifest
```

## 🌐 API Routes

- `/api/users` - User management
- `/api/vgirls` - VGirl CRUD operations  
- `/api/content-packs` - Content management
- `/api/conversations` - Chat functionality
- `/api/messages` - Message handling
- `/api/posts` - Social posts
- `/api/subscriptions` - User subscriptions
- `/api/transactions` - Payment handling
- `/api/sitemap` - Dynamic sitemap generation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment
```bash
npm run build
npm start
```

## 🔒 Environment Variables

See `.env.example` for required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_APP_URL` - Your domain URL
- `NEXTAUTH_SECRET` - Authentication secret
- Additional verification codes for SEO

## 📊 SEO Checklist

- ✅ Meta titles and descriptions for all pages
- ✅ Open Graph tags
- ✅ Twitter Card tags  
- ✅ Structured data markup
- ✅ Sitemap generation
- ✅ Robots.txt configuration
- ✅ Canonical URLs
- ✅ PWA manifest
- ✅ Performance optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and build
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Live Demo](https://vgirl.app)
- [GitHub Repository](https://github.com/dsampson94/vgirl)
- [Next.js Documentation](https://nextjs.org/docs)
