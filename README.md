# Website Profil Desa - Frontend

Modern village profile website built with React, TypeScript, and Tailwind CSS. Features both public website and admin panel for content management.

## 🚀 Features

### Public Website
- **Homepage**: Hero section with village overview and statistics
- **Village Potential**: Showcase local resources and attractions
- **Village Structure**: Display government officials and organization
- **News**: Latest village news and announcements  
- **Contact**: Contact information and location map

### Admin Panel
- **Dashboard**: Overview statistics and recent activity
- **Content Management**: CRUD operations for potential, news, and structure
- **Authentication**: Secure login system with JWT
- **Responsive Design**: Works on all devices

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router v6
- **Authentication**: JWT with localStorage (demo) / httpOnly cookies (production)

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd village-website

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your API configuration

# Start development server
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

### API Integration

The frontend is configured to work with a Flask backend API. Key endpoints:

- `GET /api/potensi` - Village potential data
- `GET /api/berita` - News articles
- `GET /api/struktur` - Village structure
- `GET /api/kontak` - Contact information
- `POST /api/auth/login` - Admin authentication
- `POST /api/upload` - File upload

## 🎨 Design System

The project uses a custom design system with:

- **Colors**: Nature-inspired green palette with earth tones
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Reusable shadcn/ui components with custom variants
- **Animations**: Smooth transitions and hover effects

## 📱 Pages & Routes

### Public Routes
- `/` - Homepage
- `/potensi` - Village potential list
- `/potensi/:id` - Potential detail (TODO)
- `/struktur` - Village structure
- `/berita` - News list (TODO)
- `/berita/:id` - News detail (TODO)  
- `/kontak` - Contact & location

### Admin Routes
- `/admin/login` - Admin login
- `/admin` - Dashboard
- `/admin/potensi` - Manage potential (TODO)
- `/admin/berita` - Manage news (TODO)
- `/admin/struktur` - Manage structure (TODO)

## 🔐 Authentication

### Development Mode
- Uses localStorage for JWT storage
- Demo credentials: `admin` / `password123`

### Production Recommendations
- Use httpOnly cookies for JWT storage
- Implement refresh token mechanism
- Add proper session management

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components (Navbar, Footer)
│   └── admin/          # Admin-specific components
├── pages/              # Page components
│   ├── admin/          # Admin panel pages
│   └── ...             # Public pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API
├── assets/             # Images and static files
└── styles/             # CSS files
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel/Netlify

1. Connect your repository
2. Set environment variables in deployment settings
3. Deploy from main branch

## 🔧 Development Notes

### Mock Data
The application includes mock data for development when the backend API is not available. This allows frontend development to continue independently.

### Image Handling
- Images are generated using AI for demo purposes
- In production, integrate with image upload API
- Consider using CDN for image optimization

### Security Considerations
- Input validation with Zod schemas
- XSS protection through proper sanitization
- CSRF protection for admin actions
- Rate limiting on API endpoints (backend)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: info@desamakmur.go.id
- Phone: +62 123 456 789

---

Built with ❤️ for Indonesian villages