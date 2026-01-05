# Deployment Guide - PlasticSurgery Study Center

## Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Git installed on your computer

### Step-by-Step Deployment

#### 1. Initialize Git Repository

Open PowerShell in the project directory and run:

```powershell
git init
git add .
git commit -m "Initial commit: PlasticSurgery Study Center"
```

#### 2. Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New Repository"
3. Name: `plasticsurgery-study-center`
4. Make it Public or Private
5. Don't initialize with README (we already have one)
6. Click "Create Repository"

#### 3. Push to GitHub

Copy the commands from GitHub and run in PowerShell:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/plasticsurgery-study-center.git
git branch -M main
git push -u origin main
```

#### 4. Deploy on Vercel

**Option A: Using Vercel Website**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login (use GitHub account for easy integration)
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure Project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
6. Click "Deploy"
7. Wait 2-3 minutes for deployment
8. Your app will be live at: `https://YOUR-PROJECT.vercel.app`

**Option B: Using Vercel CLI**

```powershell
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

#### 5. Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

### Environment Configuration

No environment variables required for basic functionality.

For future enhancements, you can add:
- Analytics tracking IDs
- Authentication credentials
- API endpoints

### Post-Deployment Testing

1. **Test PWA Installation**
   - Open deployed URL on mobile
   - Tap browser menu → "Add to Home Screen"
   - Verify app installs

2. **Test Offline Functionality**
   - Visit deployed site
   - Turn off internet/WiFi
   - Navigate through app
   - Verify all content accessible

3. **Test All Routes**
   - Home page: `/`
   - CME Modules: `/cme`, `/cme/wound-healing`
   - Practice: `/practice`, `/practice/cleft-surgery`
   - Guidelines: `/guidelines`
   - Assessment: `/assessment`, `/assessment/wound-healing-assessment`

### Monitoring & Updates

#### View Deployment Logs
1. Vercel Dashboard → Your Project
2. Click on deployment
3. View build logs and runtime logs

#### Deploy Updates

```powershell
# Make changes to code
git add .
git commit -m "Your update message"
git push

# Vercel automatically deploys on push
```

#### Rollback to Previous Version
1. Vercel Dashboard → Your Project
2. Click "Deployments"
3. Find previous successful deployment
4. Click "..." → "Promote to Production"

### Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Edge caching
- ✅ Image optimization
- ✅ Code splitting
- ✅ Compression

### Troubleshooting

#### Build Fails
- Check build logs in Vercel
- Run `npm run build` locally to test
- Ensure all dependencies in package.json

#### PWA Not Working
- Clear browser cache
- Check manifest.json is accessible
- Verify service worker registration

#### Content Not Loading
- Check browser console for errors
- Verify file paths are correct
- Check TypeScript errors

### Alternative Deployment Options

#### Netlify
```powershell
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

#### GitHub Pages (Static Export)
```powershell
# Add to next.config.js:
# output: 'export'
npm run build
# Deploy 'out' folder to GitHub Pages
```

### Maintenance

#### Regular Updates
- Update dependencies: `npm update`
- Add new content to lib/content.ts
- Add new questions to lib/assessments.ts
- Commit and push changes

#### Monitoring
- Check Vercel Analytics (free tier included)
- Monitor error logs
- Review user feedback

### Support

For deployment issues:
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Create issue in GitHub repository

---

## Quick Deploy Checklist

- [ ] Install dependencies: `npm install`
- [ ] Test locally: `npm run dev`
- [ ] Build successfully: `npm run build`
- [ ] Initialize Git: `git init`
- [ ] Create GitHub repository
- [ ] Push to GitHub: `git push`
- [ ] Connect to Vercel
- [ ] Deploy
- [ ] Test deployed app
- [ ] Test PWA installation
- [ ] Test offline functionality
- [ ] Set custom domain (optional)

🎉 **Your PlasticSurgery Study Center is now live!**
