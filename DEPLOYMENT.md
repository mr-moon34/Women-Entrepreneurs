# Render Deployment Guide

## Method 1: Manual Deployment (Recommended for you)

### Step 1: Build Your Project
```bash
npm run build
```

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub or email
3. Verify your account

### Step 3: Deploy Static Site
1. Click "New +" → "Static Site"
2. Choose "Upload files" option
3. Upload the entire `dist` folder contents
4. Set these settings:
   - **Name**: `womens-coop-frontend`
   - **Build Command**: Leave empty (already built)
   - **Publish Directory**: Leave empty (files are already in root)
   - **Environment**: Static

### Step 4: Configure Domain (Optional)
1. Go to your site settings
2. Add custom domain if needed
3. Configure SSL (automatic with Render)

## Method 2: GitHub Integration (Automatic)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Render
1. In Render dashboard, click "New +" → "Static Site"
2. Choose "Build and deploy from a Git repository"
3. Connect your GitHub account
4. Select your repository
5. Configure:
   - **Name**: `womens-coop-frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: Static

### Step 3: Auto-Deploy
- Render will automatically build and deploy
- Every push to main branch triggers new deployment
- You get a URL like: `https://womens-coop-frontend.onrender.com`

## Environment Variables (if needed)

If you need environment variables later:
1. Go to your service settings
2. Add environment variables in the dashboard
3. Redeploy your service

## Troubleshooting

### Build Fails
- Check if all dependencies are in `package.json`
- Ensure TypeScript compilation passes
- Check build logs in Render dashboard

### Site Not Loading
- Verify all files are in the `dist` folder
- Check if `index.html` exists in root
- Ensure all assets are properly referenced

### Performance Issues
- Enable gzip compression in Render settings
- Optimize images before upload
- Use CDN for better global performance

## Cost
- Render offers free tier for static sites
- 750 hours/month free
- Perfect for your project size
