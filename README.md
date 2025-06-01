# Job Board

A modern, full-featured job board built using Next.js with internationalization (i18n) support. Easily browse job listings across multiple languages.

## 🚀 Setup Instructions

### Prerequisites

- Node.js 21+ (tested with v21.6.2)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jjtsou/job-board.git
   cd job-board
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm run check` - Run all Biome checks (lint + format)

### Performance Testing

The project includes k6 stress testing scripts to evaluate application performance under load:

```bash
# Navigate to stress testing directory
cd stress-testing

# Run stress tests (requires k6 installation)
npm run test:stress  # Gradual load increase to 100 users
npm run test:spike   # Sudden traffic spike testing
```

For detailed testing instructions and configuration, see [`stress-testing/README.md`](./stress-testing/README.md).

## 🏗️ Technical Approach & Decisions

### Architecture

- **Next.js 15** with App Router for modern React server components
- **TypeScript** for type safety and better developer experience
- **Chakra UI v3** for consistent, accessible component system
- **next-intl** for internationalization (English/Greek support)
- **Biome** for fast linting and formatting

### Key Technical Decisions

#### 1. **Internationalization Strategy**

- Used `next-intl` with Next.js App Router for seamless language switching
- Implemented route-based i18n (`/en`, `/el`) for SEO benefits
- Centralized translations in JSON files for maintainability

#### 2. **State Management**

- Leveraged URL search params for job search state (SEO-friendly)
- Used React's built-in state for form handling
- No external state management library needed for this scope

#### 3. **Performance Optimizations**

- Server-side rendering for initial page load and SEO
- API response caching with Next.js `revalidate` strategy
- Optimized bundle size with tree-shaking and code splitting

#### 4. **SEO Implementation**

- Dynamic metadata generation based on search parameters
- Proper canonical URLs and hreflang attributes
- Accessible HTML structure with semantic elements

#### 5. **API Integration**

- Custom fetch wrapper with error handling and type safety
- Built-in compensation for API data inconsistencies
- Centralized API configuration for easy maintenance

#### 6. **Component Design**

- Modular component architecture with clear separation of concerns
- Reusable UI components with consistent prop interfaces
- Responsive design with mobile-first approach

#### 7. **Hybrid Server/Client Architecture**

- **Server Components** for data fetching and SEO-critical content (job listings, metadata)
- **Client Components** for interactive features (search form, language switcher, pagination)
- Strategic component boundary decisions:
  - `JobSearchForm` is client-side for real-time form interactions and URL state management
  - `JobList` renders server-side for optimal SEO and initial page performance
  - `LanguageSwitcher` is client-side for immediate user feedback
- This hybrid approach maximizes both performance (fast server rendering) and interactivity (rich client features)
- Selective hydration ensures minimal JavaScript bundle while maintaining full functionality

#### 8. **Error Handling**

- Graceful fallbacks for API failures
- User-friendly error messages
- Error boundaries for component isolation

### Data Flow

1. **Search Form** → URL params update → Server-side data fetching
2. **Job Listings** → Server components render with fresh data
3. **Language Switch** → Route change → Full page re-render with localized content

This approach ensures excellent SEO, fast initial page loads, and a smooth user experience across different languages and devices.
