# 🚀 GitHub Deployment Guide

This guide will help you deploy the PHC Leaflet Generator to GitHub Pages.

## 📋 Pre-configured Settings

The application comes with pre-configured settings:
- ✅ **Gemini API Key**: Pre-configured
- ✅ **Appwrite Project ID**: Pre-configured  
- ✅ **Appwrite Endpoint**: Pre-configured

You only need to run the setup once to create the database!

---

## 🎯 Step 1: Run Setup (One Time Only)

### Before deploying to GitHub, run the setup locally:

1. **Open `setup-appwrite.html` in your browser**
   - The API Key and Project ID are already filled in
   - Click "Start Automatic Setup"
   - Wait for completion (1-2 minutes)

2. **Copy the Generated IDs**
   - You'll see Database ID and Collection ID
   - Copy these IDs

3. **Update `config-preset.js`**
   - Open `config-preset.js` in a text editor
   - Find lines 9 and 10:
     ```javascript
     databaseId: '', // Add your Database ID here after setup
     collectionId: '' // Add your Collection ID here after setup
     ```
   - Replace with your IDs:
     ```javascript
     databaseId: 'your-database-id-here',
     collectionId: 'your-collection-id-here'
     ```
   - Save the file

---

## 🌐 Step 2: Deploy to GitHub

### Option A: Using GitHub Desktop (Easy)

1. **Install GitHub Desktop**
   - Download from [desktop.github.com](https://desktop.github.com)
   - Install and sign in with your GitHub account

2. **Create Repository**
   - Click "Create New Repository"
   - Name: `phc-leaflet-generator`
   - Description: `AI-Powered Health Education Leaflets for BSNU`
   - Choose this folder as Local Path
   - Click "Create Repository"

3. **Publish to GitHub**
   - Click "Publish repository"
   - Uncheck "Keep this code private" (if you want it public)
   - Click "Publish repository"

4. **Enable GitHub Pages**
   - Go to your repository on GitHub.com
   - Click "Settings" tab
   - Scroll to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Select "/ (root)" folder
   - Click "Save"
   - Wait 2-3 minutes for deployment

5. **Access Your Site**
   - Your site will be available at:
   - `https://YOUR-USERNAME.github.io/phc-leaflet-generator/`
   - Open `START_HERE.html` to begin

### Option B: Using Git Command Line

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PHC Leaflet Generator"
   ```

2. **Create GitHub Repository**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `phc-leaflet-generator`
   - Description: `AI-Powered Health Education Leaflets for BSNU`
   - Public or Private (your choice)
   - Don't initialize with README (we have one)
   - Click "Create repository"

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/phc-leaflet-generator.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch "main"
   - Folder: "/ (root)"
   - Click Save

5. **Visit Your Site**
   - `https://YOUR-USERNAME.github.io/phc-leaflet-generator/START_HERE.html`

---

## ✅ Step 3: Verify Deployment

### Test Your Deployed Site:

1. **Open START_HERE.html**
   - `https://YOUR-USERNAME.github.io/phc-leaflet-generator/START_HERE.html`

2. **Click "Launch Generator"**

3. **Verify Configuration**
   - Configuration should be pre-loaded
   - Click "Save Configuration"
   - You should see success message

4. **Test Generation**
   - Enter student serial: `1`
   - Select a template
   - Click "Generate AI-Powered Leaflet"
   - Wait 30-60 seconds
   - Leaflet should appear

5. **Test Save to Appwrite**
   - After generating a leaflet
   - Click "Save to Appwrite"
   - Check for success message
   - Click "Load Saved Leaflets" to verify

---

## 🔧 Updating the Site

### After making changes:

**Using GitHub Desktop:**
1. Open GitHub Desktop
2. You'll see changed files listed
3. Write a commit message
4. Click "Commit to main"
5. Click "Push origin"
6. Wait 2-3 minutes for GitHub Pages to update

**Using Git Command Line:**
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

---

## 🎨 Customization

### To customize the site:

1. **Edit Templates**
   - Open `index.html`
   - Modify CSS in the `<style>` section
   - Add new templates by adding `.template-11`, `.template-12`, etc.

2. **Add More Topics**
   - Open `students-data.js`
   - Add topics to the `topics` object
   - Update `groupRanges` array

3. **Change Colors**
   - Edit gradient colors in CSS
   - Change `#667eea` and `#764ba2` to your preferred colors

---

## 📱 Sharing the Site

### Share with students:

1. **Main URL**
   ```
   https://YOUR-USERNAME.github.io/phc-leaflet-generator/START_HERE.html
   ```

2. **Direct to Generator**
   ```
   https://YOUR-USERNAME.github.io/phc-leaflet-generator/index.html
   ```

3. **Setup Page** (for admins)
   ```
   https://YOUR-USERNAME.github.io/phc-leaflet-generator/setup-appwrite.html
   ```

---

## 🔒 Security Notes

### Important for Public Deployment:

1. **API Keys are Exposed**
   - In this configuration, API keys are in client-side code
   - They can be seen by anyone viewing the page source
   - This is acceptable for educational projects with proper usage limits

2. **For Production Security:**
   - Move API keys to Appwrite Functions (server-side)
   - Implement user authentication
   - Set up rate limiting
   - Monitor API usage

3. **Gemini API Protection:**
   - Set usage quotas in Google Cloud Console
   - Monitor API usage regularly
   - Restrict API key to specific domains

4. **Appwrite Security:**
   - Database permissions are set to "Any" (public)
   - For production, change to "Users" (authenticated only)
   - Implement user roles and permissions

---

## 📊 Monitoring Usage

### Google Gemini API:
1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to "APIs & Services" → "Dashboard"
4. Monitor usage and quotas

### Appwrite:
1. Log in to [Appwrite Console](https://cloud.appwrite.io)
2. Select your project
3. View dashboard for usage statistics
4. Monitor database size and API calls

---

## 🆘 Troubleshooting Deployment

### Site Not Loading
- **Solution**: Wait 5-10 minutes after enabling GitHub Pages
- Check repository Settings → Pages for deployment status
- Ensure all files are committed and pushed

### Configuration Not Loading
- **Solution**: Verify `config-preset.js` is in the repository
- Check browser console for errors (F12)
- Ensure Database and Collection IDs are filled in `config-preset.js`

### "Failed to save: Unauthorized"
- **Solution**: Check Appwrite collection permissions
- Go to Appwrite Console → Database → Collection → Settings → Permissions
- Ensure "Any" role has Create, Read, Update, Delete permissions

### Content Not Generating
- **Solution**: Check Gemini API key is valid
- Verify API quotas in Google Cloud Console
- Check browser console for detailed errors

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Appwrite Documentation](https://appwrite.io/docs)

---

## ✨ Success!

Your PHC Leaflet Generator is now live on GitHub Pages! 🎉

Share the link with your classmates and start generating professional health education leaflets!

---

<div align="center">

**Need Help?**

Check the main [README.md](README.md) for detailed documentation

**Made with ❤️ for BSNU Medical Students**

</div>

