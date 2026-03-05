# Jinja Safaris - Full-Stack Tourism Web Application

**Tagline:** "Jinja Safaris – Hub of the Nile Tourism"

A production-ready Next.js full-stack tourism web application for Jinja Safaris, featuring a public-facing website and a comprehensive admin dashboard.

## 🌟 Features

### Public Website
- **Hero Slideshow** - Auto-rotating full-width slideshow with CTA buttons
- **Featured Activities** - White Water Rafting, Skydiving, Nile Tubing, Trekking, Bird Watching
- **Dynamic Pricing** - Separate pricing for local and international tourists
- **Booking System** - Complete booking flow with deposit calculation (30%)
- **Partner Hotels** - Showcase of accommodation partners
- **Gallery** - Categorized image gallery
- **Testimonials** - Customer reviews and ratings
- **Blog** - SEO-optimized blog section
- **Newsletter** - Email subscription
- **Contact** - Google Maps integration, social media links
- **WhatsApp Integration** - Floating WhatsApp button
- **Currency Toggle** - USD/UGX conversion
- **Dark Mode** - Light/dark theme support
- **Responsive Design** - Mobile-first approach

### Admin Dashboard
- **Dashboard Overview** - Key metrics and statistics
- **Booking Management** - View, filter, update booking status
- **Activity Management** - Edit prices, descriptions, toggle active/inactive
- **Slideshow Manager** - Upload and manage hero images
- **Gallery Manager** - Upload and categorize images
- **Hotel Manager** - Manage partner hotels
- **Testimonials** - Approve/reject customer reviews
- **Export Functionality** - Export bookings to CSV
- **Secure Authentication** - Supabase Auth integration

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Icons:** React Icons
- **Animations:** Framer Motion

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)

## 🛠️ Installation & Setup

### 1. Clone or Navigate to Project

```bash
cd "c:\Users\HP ELITEBOOK 1040 G8\Desktop\Jinja Safaris Images\jinja-safaris"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Go to **Settings** → **API** and copy:
   - Project URL
   - Anon/Public Key
   - Service Role Key (keep this secret!)

### 4. Create Database Tables

1. In Supabase Dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql`
3. Paste and run the SQL script
4. This will create all necessary tables and insert default data

### 5. Set Up Storage Buckets

1. In Supabase Dashboard, go to **Storage**
2. Create the following buckets:
   - `slideshow` (public)
   - `activities` (public)
   - `gallery` (public)
   - `hotels` (public)
   - `blog` (public)

3. For each bucket, set the policy to allow public read access

### 6. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 7. Create Admin User

In Supabase Dashboard, go to **Authentication** → **Users** → **Add User**

Create an admin account:
- Email: admin@jinjasafaris.com
- Password: (choose a secure password)
- Confirm email: Yes

### 8. Upload Images

Upload your existing images to the appropriate Supabase Storage buckets:

1. Go to **Storage** in Supabase Dashboard
2. Upload images to respective buckets
3. Copy the public URLs
4. Update the database records with the correct image URLs

For the images in your folder:
- `Jinja Safaris Logo.png` → Use in navbar/footer
- `rafting-74.jpg` → White Water Rafting activity
- `sky-diving.jpg` → Skydiving activity
- `nile-tubing.jpg` → Nile Tubing activity
- `jinja-trekking.jpg` or hiking photo → Jinja Trekking activity
- `bird-watching.jpg` → Bird Watching activity
- `wild_water_lodge_5.jpg` → Hotel image
- Other images → Gallery or slideshow

### 9. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Jinja Safaris"
git branch -M main
git remote add origin your-github-repo-url
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Import Project**
3. Select your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

6. Click **Deploy**

Your site will be live at `https://your-project.vercel.app`

## 📱 Usage Guide

### For Customers

1. **Browse Activities** - View all available tours and activities
2. **Book an Activity** - Select activity, date, number of people
3. **Choose Tourist Type** - Local or International pricing
4. **Complete Booking** - Fill in details and submit
5. **Receive Confirmation** - Email confirmation sent automatically

### For Admins

1. **Login** - Visit `/admin` and login with credentials
2. **Dashboard** - View key metrics and statistics
3. **Manage Bookings** - Update status, view details, export CSV
4. **Update Activities** - Edit prices, descriptions, toggle active status
5. **Manage Content** - Upload images, approve testimonials
6. **Slideshow** - Update hero section images and text

## 🔐 Security Features

- Row Level Security (RLS) enabled on all tables
- Protected admin routes
- Secure authentication with Supabase
- Environment variables for sensitive data
- Input validation on all forms
- SQL injection prevention

## 📊 Database Structure

### Main Tables
- `activities` - Tour activities and services
- `seasonal_pricing` - Dynamic pricing by season
- `bookings` - Customer bookings
- `testimonials` - Customer reviews
- `gallery_images` - Photo gallery
- `hotels` - Partner accommodations
- `slideshow_images` - Hero section slides
- `contact_info` - Contact details
- `newsletter` - Email subscriptions
- `blog_posts` - Blog articles
- `admin_logs` - Activity tracking

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#0077BE',    // Main blue
  secondary: '#00A8E8',  // Light blue
  accent: '#FFB800',     // Yellow/gold
  dark: '#1A1A2E',       // Dark background
}
```

### Contact Information
Update in Supabase `contact_info` table or directly in components.

### Activities & Pricing
Manage through admin dashboard at `/admin/activities`

## 📞 Support & Contact

**Jinja Safaris**
- Location: Rubaga Hill, Jinja City, Eastern Uganda
- Phone: +256 123 456 789
- Email: info@jinjasafaris.com
- WhatsApp: +256 123 456 789

## 📝 License

© 2024 Jinja Safaris. All rights reserved.

## 🚀 Quick Start Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Create Supabase project
- [ ] Run database schema SQL
- [ ] Create storage buckets
- [ ] Set up environment variables
- [ ] Create admin user
- [ ] Upload images
- [ ] Test locally (`npm run dev`)
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Configure custom domain (optional)
- [ ] Test production site
- [ ] Share with client

## 🎯 Next Steps

1. **Custom Domain** - Connect your domain in Vercel settings
2. **Email Integration** - Set up SendGrid or similar for booking confirmations
3. **Payment Gateway** - Integrate Stripe or Flutterwave for deposits
4. **Analytics** - Add Google Analytics or Vercel Analytics
5. **SEO** - Submit sitemap to Google Search Console
6. **Social Media** - Update all social media links
7. **Content** - Add blog posts and more gallery images
8. **Testing** - Test all booking flows and admin functions

---

**Built with ❤️ for Jinja Safaris - Hub of the Nile Tourism**
