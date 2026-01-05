# Quick Start Guide

## Prerequisites
✅ Node.js 18 or higher installed
✅ npm package manager

## Installation Complete!

Dependencies have been installed. Now follow these steps:

## 1. Start Development Server

```powershell
npm run dev
```

Then open your browser to: **http://localhost:3000**

## 2. Build for Production

```powershell
npm run build
```

## 3. Preview Production Build

```powershell
npm start
```

## Features to Explore

### 🏠 Home Page
- Overview of all modules
- Quick access to sections
- Offline indicator

### 📚 CME Exam Focus
- Wound Healing Principles
- Burn Care Management
- Cleft Surgery
- Breast Reconstruction

### 🔬 Clinical Practice
- Practical procedures
- Evidence-based protocols

### 📋 Self Assessment
- 50 MCQ questions per module
- Immediate feedback
- Detailed explanations
- Progress tracking

## PWA Features (After Deployment)

1. **Install App**: 
   - On mobile: Add to Home Screen
   - On desktop: Install button in address bar

2. **Offline Access**:
   - Visit site once while online
   - All content cached automatically
   - Works completely offline

## Deployment

See **DEPLOYMENT.md** for complete deployment instructions to Vercel.

Quick deploy:
```powershell
git init
git add .
git commit -m "Initial commit"
# Create GitHub repo, then:
git remote add origin YOUR-REPO-URL
git push -u origin main
# Deploy on Vercel by importing GitHub repo
```

## Project Structure

```
├── app/              # Pages and routes
│   ├── page.tsx      # Home page
│   ├── cme/          # CME modules
│   ├── practice/     # Clinical practice
│   ├── guidelines/   # Guidelines
│   └── assessment/   # MCQ tests
├── components/       # React components
├── lib/             # Content data
│   ├── content.ts    # Module slides
│   └── assessments.ts # MCQ questions
└── public/          # Static files
```

## Adding Content

### Add New Module
Edit `lib/content.ts` - see examples in file

### Add MCQ Questions
Edit `lib/assessments.ts` - follow existing format

## Troubleshooting

### Port Already in Use
```powershell
# Use different port
npm run dev -- -p 3001
```

### Build Errors
```powershell
# Clear cache and rebuild
Remove-Item -Recurse -Force .next
npm run build
```

### Module Not Found
```powershell
# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install
```

## Support

- Check README.md for detailed documentation
- Check DEPLOYMENT.md for deployment help
- Review code comments for implementation details

## Development Tips

1. **Hot Reload**: Changes auto-reload in dev mode
2. **TypeScript**: Type errors shown in terminal
3. **Responsive**: Test on different screen sizes
4. **PWA**: Test with Chrome DevTools → Application → Service Workers

## Next Steps

1. ✅ Test locally (`npm run dev`)
2. ✅ Review content in lib/content.ts
3. ✅ Try self assessments
4. ✅ Test offline functionality (after build)
5. ✅ Deploy to Vercel
6. ✅ Share with colleagues!

---

**Ready to launch!** 🚀

Run `npm run dev` and visit http://localhost:3000
