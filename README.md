# PlasticSurgery Study Center

A comprehensive plastic surgery education platform with CME content, clinical practice guidelines, and self-assessment tools. Built with Next.js 14, featuring offline PWA capabilities and mobile-first design.

## Features

### 📚 Comprehensive Content
- **CME Exam Focus**: Examination-oriented continuing medical education modules
- **Clinical Practice**: Practical guidelines and procedures for daily practice
- **Evidence-Based Guidelines**: Treatment protocols and best practices
- **Self Assessment**: 50-question MCQ tests with detailed explanations

### 🎯 Learning Features
- **Slide-by-Slide Learning**: Visually appealing, easy-to-digest content presentation
- **Key Points & Clinical Pearls**: Important takeaways highlighted for each topic
- **Progress Tracking**: Track your learning journey through modules
- **Comprehensive Explanations**: Detailed explanations after each MCQ

### 📱 Technical Features
- **Progressive Web App (PWA)**: Install on any device
- **Full Offline Functionality**: Study anywhere, anytime without internet
- **Mobile-First Design**: Optimized for phones, tablets, and desktops
- **Responsive UI**: Adapts to any screen size
- **Fast Performance**: Built with Next.js 14 and React 18

## Content Modules

### Current Modules
1. **Wound Healing Principles**
   - Phases of wound healing
   - TIME framework
   - Advanced wound care
   - Factors affecting healing

2. **Burn Care and Management**
   - Burn classification and assessment
   - TBSA calculation methods
   - Resuscitation protocols
   - Burn reconstruction

3. **Cleft Lip and Palate Management**
   - Embryology and classification
   - Surgical repair techniques
   - Secondary deformities
   - Velopharyngeal insufficiency

4. **Breast Reconstruction Principles**
   - Autologous reconstruction
   - Implant-based reconstruction
   - Complications and management

### Self Assessments
- 50 MCQs per module
- Immediate feedback with explanations
- Difficulty levels: Easy, Medium, Hard
- Passing score: 70%

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PWA**: next-pwa
- **Icons**: Lucide React
- **Markdown**: react-markdown
- **Storage**: LocalForage (for offline data)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "PLASTIC STUDY CENTER"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Deployment on Vercel

### Quick Deploy

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings (use default Next.js settings)
   - Click "Deploy"

3. **PWA Features**
   - After deployment, users can "Add to Home Screen" on mobile devices
   - App will work offline after first visit

### Environment Variables
No environment variables required for basic functionality.

## Project Structure

```
PLASTIC STUDY CENTER/
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── cme/                     # CME modules
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── practice/                # Practice modules
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── guidelines/              # Guidelines modules
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   └── assessment/              # Self assessments
│       ├── page.tsx
│       └── [id]/page.tsx
├── components/                   # React components
│   └── SlideViewer.tsx          # Slide presentation component
├── lib/                         # Data and utilities
│   ├── content.ts               # Module content
│   └── assessments.ts           # MCQ questions
├── public/                      # Static assets
│   └── manifest.json            # PWA manifest
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## Adding New Content

### Adding a New Module

Edit `lib/content.ts` and add a new module object:

```typescript
{
  id: 'module-id',
  title: 'Module Title',
  category: 'cme' | 'practice' | 'guidelines',
  description: 'Module description',
  duration: '60 minutes',
  objectives: ['Objective 1', 'Objective 2'],
  slides: [
    {
      id: 'slide-1',
      title: 'Slide Title',
      content: '# Markdown content here',
      keyPoints: ['Point 1', 'Point 2'],
      clinicalPearls: ['Pearl 1'],
      references: ['Reference 1']
    }
  ]
}
```

### Adding New Assessment Questions

Edit `lib/assessments.ts` and add questions to an assessment:

```typescript
{
  id: 'q1',
  question: 'Question text?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 0, // Index of correct option (0-3)
  explanation: 'Detailed explanation here',
  topic: 'Topic name',
  difficulty: 'easy' | 'medium' | 'hard',
  references: ['Reference 1']
}
```

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## PWA Features

- **Install to Home Screen**: Add app icon to device home screen
- **Offline Access**: Full functionality without internet connection
- **Background Sync**: Content updates when online
- **Push Notifications**: (Can be implemented for updates)

## Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Fully responsive on all devices

## License

This project is intended for educational purposes in plastic surgery training.

## Contributing

To add more content or improve the platform:
1. Fork the repository
2. Create a feature branch
3. Add your content/changes
4. Submit a pull request

## Support

For issues or questions about content, please create an issue in the repository.

## Acknowledgments

Content based on comprehensive plastic surgery literature including:
- Wound healing principles and TIME framework
- Burn management protocols
- Cleft surgery techniques
- Breast reconstruction methods
- Evidence-based clinical guidelines

---

**PlasticSurgery Study Center** - Your Complete Learning Platform
*Built with ❤️ for plastic surgery education*
