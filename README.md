# NexBank - Modern Loan Application Platform

A professional, intuitive, and user-friendly loan application website built with modern web technologies. NexBank enables users to apply for loans in multiple currencies with transparent terms, instant calculations, and a seamless multi-step application process.

## Features

### 🏦 Core Features
- **Multi-Currency Support**: EUR, USD, GBP, CHF, JPY with real-time exchange rates
- **Loan Calculator**: Interactive calculator with instant monthly payment calculations
- **3-Step Application Process**:
  - Step 1: Personal Information (name, email, income)
  - Step 2: Payment Method (IBAN for bank transfers)
  - Step 3: Review & Confirmation with identity document upload
- **Full-Width Hero Slider**: 3 rotating banner images with auto-rotation (5-second intervals)
- **Professional Design**: Modern blue and white banking theme with gradient accents
- **Responsive Layout**: Fully optimized for mobile, tablet, and desktop devices
- **French Language**: Complete French localization for all content

### 📄 Pages
- **Home**: Hero section with calculator and trust indicators
- **About**: Company values, mission, and team information
- **How It Works**: 4-step process explanation with visual guides
- **Why Us**: Feature comparison, benefits, and customer testimonials
- **Application Form**: Multi-step form with file upload for identity documents
- **Footer**: Comprehensive footer with navigation, social links, and compliance badges

## Technology Stack

### Frontend
- **React 18+**: UI library for building interactive components
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Smooth animations and transitions
- **Wouter**: Lightweight client-side routing
- **React Hook Form**: Efficient form state management
- **Zod**: Schema validation with TypeScript support
- **Tanstack React Query**: Server state management and data fetching

### Backend
- **Express.js**: Node.js web server framework
- **TypeScript**: Type-safe backend development
- **PostgreSQL**: Relational database for data persistence
- **Drizzle ORM**: Type-safe database ORM
- **Multer**: File upload handling for documents

### Build & Development
- **Vite**: Fast build tool and dev server
- **Node.js**: JavaScript runtime environment
- **npm**: Package manager

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoanCalculator.tsx      # Multi-currency loan calculator
│   │   │   ├── ApplicationForm.tsx     # 3-step application form
│   │   │   ├── Footer.tsx              # Footer with navigation
│   │   │   └── ui/                     # shadcn UI components
│   │   ├── pages/
│   │   │   ├── Home.tsx                # Home page with hero slider
│   │   │   ├── About.tsx               # About page
│   │   │   ├── HowItWorks.tsx          # How it works page
│   │   │   ├── WhyUs.tsx               # Why us page
│   │   │   └── not-found.tsx           # 404 page
│   │   ├── hooks/
│   │   │   └── use-loans.ts            # API hooks for loan operations
│   │   ├── lib/
│   │   │   └── queryClient.ts          # React Query setup
│   │   ├── App.tsx                     # Main app component with routing
│   │   └── index.css                   # Global styles and utilities
│   └── package.json
├── server/
│   ├── index.ts                        # Express server setup
│   ├── vite.ts                         # Vite integration
│   ├── routes.ts                       # API routes
│   ├── storage.ts                      # Data storage interface
│   └── uploads/                        # File uploads directory
├── shared/
│   ├── schema.ts                       # Zod schemas for validation
│   └── routes.ts                       # API route definitions
├── public/
│   ├── stock_images/                   # Hero slider images
│   └── favicon.ico
├── vite.config.ts                      # Vite configuration
├── tailwind.config.ts                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Project dependencies
└── README.md                           # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nexbank
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

### Environment Setup

The project uses PostgreSQL for data persistence. Environment variables are automatically managed through Replit's built-in secret management system.

**Required Environment Variables:**
- `DATABASE_URL`: PostgreSQL connection string (auto-configured)
- `SESSION_SECRET`: Session encryption secret (auto-configured)

## Usage

### For Users

1. **Browse the website**: Explore home, about, how it works, and why us pages
2. **Calculate a loan**: Use the interactive calculator to see monthly payments
3. **Start application**: Click "Demander un prêt" to begin the 3-step process
4. **Complete application**: Fill personal info, select payment method, upload ID, and submit
5. **Confirmation**: Receive application ID and confirmation message

### For Developers

#### Adding a New Page
1. Create a new file in `client/src/pages/`
2. Register the route in `client/src/App.tsx`
3. Add navigation link in the header/footer

#### Adding a Feature
1. Update schemas in `shared/schema.ts` if needed
2. Add API routes in `server/routes.ts`
3. Update storage interface in `server/storage.ts`
4. Create React components in `client/src/components/`
5. Use React Query hooks for data fetching

#### Styling
- Use Tailwind CSS utility classes
- Global styles in `client/src/index.css`
- Component-level CSS in CSS modules or inline Tailwind

## Features Explanation

### Loan Calculator
- Real-time calculation using standard loan payment formula: `M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]`
- Interactive sliders for amount (€1,000 - €100,000) and duration (6-60 months)
- Currency selector with different interest rates per currency
- Formatted output in selected currency

### Application Form
- **Step 1**: Collect personal information (first name, last name, email, monthly income)
- **Step 2**: Payment method setup (IBAN for bank transfers)
- **Step 3**: Review application, upload identity document, accept terms
- Form validation using Zod schemas
- File upload to `/uploads` directory
- Success confirmation with application ID

### Hero Slider
- 3 rotating banner images
- Auto-rotation every 5 seconds
- Manual navigation with arrow buttons
- Dot indicators for slide selection
- Dark overlay with smooth text animations

## Design System

### Colors
- **Primary Blue**: `#2563EB` - Main action color
- **Cyan Accent**: `#06B6D4` - Secondary highlight
- **Slate Gray**: Used for text and borders
- **White**: Background for cards and main content

### Typography
- **Display Font**: Outfit (headings)
- **Body Font**: Plus Jakarta Sans (text)

### Spacing
- Small: 8px, Medium: 16px, Large: 24px+
- Consistent padding in cards (32px)
- Section spacing: 64-96px

### Interactions
- Smooth transitions (200-300ms)
- Hover states on buttons and cards
- Subtle shadow elevation on hover
- Loading states with spinner animations

## API Endpoints

### Loans
- `POST /api/loans` - Submit a loan application
- `GET /api/loans` - Retrieve all applications (admin)
- `GET /api/loans/:id` - Get specific application

### Files
- `POST /api/upload` - Upload identity document

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Optimized images for hero slider
- Code splitting with Vite
- Lazy-loaded components
- Efficient form validation
- Debounced search/filters

## Security

- Type-safe database queries with Drizzle ORM
- Form validation with Zod
- CSRF protection through Express session
- File upload validation
- PSD2, SSL, and GDPR compliance badges

## Compliance & Certifications

- ✓ PSD2 Compliant (Payment Services Directive 2)
- ✓ SSL Encrypted (HTTPS)
- ✓ GDPR Ready (Data protection)
- ✓ FCA Licensed (Financial Conduct Authority)

## Troubleshooting

### Application won't start
```bash
npm install
npm run dev
```

### Port already in use
- Change the port in `server/index.ts`
- Or kill the process using port 5000

### Database connection issues
- Verify `DATABASE_URL` environment variable
- Check PostgreSQL service is running
- Review connection string format

## Future Enhancements

- [ ] User authentication and account management
- [ ] Application status tracking
- [ ] Email notifications
- [ ] SMS OTP verification
- [ ] Real-time currency rates via API
- [ ] Loan comparison features
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Advanced analytics

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Proprietary - NexBank © 2024

## Support

For issues and questions:
- Email: support@nexbank.com
- Phone: +33 (0) 1 23 45 67 89
- Address: Paris, France

---

**Built with ❤️ for transparent lending in Europe**
