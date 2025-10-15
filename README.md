# 🏥 PHC Leaflet Generator - AI-Powered Health Education System

<div align="center">

![Medical](https://img.shields.io/badge/Medical-Healthcare-blue)
![AI](https://img.shields.io/badge/AI-Gemini-green)
![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-green)

**AI-Powered health education leaflet generator for BSNU 3rd Year Medical Students**

Automated leaflet creation using Google Gemini AI with 10 professional templates and Appwrite backend

[Quick Start](#quick-start) • [Features](#features) • [Setup Guide](#setup-guide) • [Documentation](#documentation)

</div>

---

## 📋 Overview

The PHC Leaflet Generator is a comprehensive web application designed for **Beni-Suef National University (BSNU) 3rd Year Medical Students**. It automates the creation of professional health education leaflets for Primary Health Care (PHC) activities using cutting-edge AI technology.

### Why This Project?

- ✅ **Saves Time**: Generate complete, professional leaflets in minutes instead of hours
- ✅ **AI-Powered**: Uses Google Gemini AI for intelligent content generation
- ✅ **Personalized**: Each student gets a custom leaflet with their information
- ✅ **Professional**: 10 beautiful, medically-appropriate templates
- ✅ **Easy to Use**: Simple interface, no technical skills required
- ✅ **Cloud Storage**: Save and retrieve leaflets with Appwrite backend

---

## ✨ Key Features

### 🤖 AI-Powered Content Generation
- **Intelligent Content**: Gemini AI generates evidence-based, medically accurate content
- **Contextual Images**: AI-suggested medical illustrations and photos
- **Topic-Specific**: 19 different PHC topics, each with specialized prompts
- **Regeneration**: Don't like the content? Regenerate with one click
- **Focus Control**: Emphasize specific aspects (prevention, statistics, practical tips)

### 🎨 10 Professional Templates
1. **Three Column** - Classic tri-fold layout
2. **Two Column** - Balanced dual layout  
3. **Sidebar Focus** - Main content + sidebar
4. **Sequential Flow** - Top-to-bottom story
5. **Gradient Header** - Bold colorful header
6. **Split View** - Equal two-part design
7. **Soft Gradient** - Gentle background fade
8. **Accent Borders** - Colored section markers
9. **Centered Classic** - Traditional centered
10. **Bold Frame** - Thick border design

### 📊 Student Management
- **644 Students Supported**: Complete database for BSNU 3rd year
- **Automatic Assignment**: Serial number automatically determines topic
- **19 Groups**: Students organized into groups (1-19)
- **19 PHC Topics**: Each group assigned a specific health topic

### 💾 Cloud Storage (Appwrite)
- **Save Leaflets**: Store generated leaflets in cloud database
- **Load & Edit**: Retrieve and modify previously saved leaflets
- **Delete Management**: Remove unwanted leaflets
- **History Tracking**: View all generated leaflets with timestamps

### 📥 Export Options
- **PDF Download**: High-quality PDF export with proper formatting
- **Print Ready**: Optimized for A4 printing
- **Custom Naming**: Automatic filename generation with student info

---

## 🚀 Quick Start

### Option 1: Automatic Setup (Recommended)

1. **Open the Setup Tool**
   ```
   Open: setup-appwrite.html
   ```

2. **Enter Configuration**
   - Appwrite Endpoint: `https://cloud.appwrite.io/v1`
   - API Key: standard_4254c26eb3d99887769c3de02274c654696968aa2bad1f354ed00e968b945cc17e299bc1f554752812c6d00606ea45975d8b6c2d8be796cb9ce69da37214fbaa87373343a9d899432f28d72b20de3aa7f007121b78e9b0dfc911023570f0db22f9fbd5f0b3fbd29d74007429c4f99888509b5eeaf9e75e9eb2230f9d23998c2c
   - Project ID: 68eeea7c0008fe656dc0

3. **Click "Start Automatic Setup"**
   - Wait for database creation
   - Copy the generated IDs

4. **Open Main Application**
   ```
   Open: index.html
   ```

5. **Configure the App**
   - Paste the IDs from step 3
   - Add your Gemini API key
   - Click "Save Configuration"

6. **Start Generating!**
   - Enter a student serial number (1-644)
   - Select a template
   - Click "Generate AI-Powered Leaflet"

### Option 2: Manual Setup

See [APPWRITE_SETUP.md](APPWRITE_SETUP.md) for detailed manual setup instructions.

---

## 📚 PHC Topics

| Group | Topic | Focus Area |
|-------|-------|------------|
| 1 | Antenatal Care | What Every Mother Should Know |
| 2 | Danger Signs in Pregnancy | When to Seek Immediate Help |
| 3 | Physical Activity Promotion | Your Guide to a Healthier Lifestyle |
| 4 | Safe Delivery Practices | Ensuring Mother and Baby's Safety |
| 5 | Postnatal Care | Caring for Mother and Newborn |
| 6 | School Health Program | Building Healthy Futures |
| 7 | Smoking Cessation | Your Journey to a Smoke-Free Life |
| 8 | Diabetes Prevention & Management | Take Control of Your Health |
| 9 | Hypertension Control | Managing the Silent Killer |
| 10 | Childhood Immunization | Protecting Our Children's Future |
| 11 | Nutrition & Healthy Eating | Fuel Your Body Right |
| 12 | Family Planning | Empowering Reproductive Choices |
| 13 | Mental Health Awareness | Taking Care of Your Mind |
| 14 | Oral Health Care | A Healthy Smile for Life |
| 15 | Infectious Disease Prevention | Protecting Yourself and Others |
| 16 | Chronic Disease Management | Living Well with Long-term Conditions |
| 17 | Elderly Care & Healthy Aging | Adding Life to Years |
| 18 | Environmental Health | A Healthy Environment for All |
| 19 | Adolescent Health | Navigating the Teen Years |

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern features (Gradients, Flexbox, Grid)
- **JavaScript (ES6+)** - Application logic
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome** - Icon library

### AI & APIs
- **Google Gemini AI** (gemini-1.5-flash)
  - Content generation
  - Image generation suggestions
  - Natural language processing
  
### Backend & Storage
- **Appwrite Cloud**
  - Database management
  - Document storage
  - User authentication ready
  
### Libraries
- **html2pdf.js** - PDF generation
- **Appwrite SDK** - Backend integration

---

## 📖 Setup Guide

### Prerequisites

1. **Web Browser** (Chrome, Firefox, Edge, Safari)
2. **Gemini API Key** - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Appwrite Account** - Sign up at [Appwrite Cloud](https://cloud.appwrite.io)
4. **Internet Connection** - Required for AI and cloud features

### Step-by-Step Setup

#### 1. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with "AI...")

#### 2. Setup Appwrite (Automatic)

1. Create an Appwrite account at [https://cloud.appwrite.io](https://cloud.appwrite.io)
2. Create a new project
3. Go to Project Settings → API Keys
4. Create a new API key with all permissions
5. Note your Project ID
6. Open `setup-appwrite.html` in your browser
7. Enter your credentials
8. Click "Start Automatic Setup"
9. Copy the generated Database and Collection IDs

#### 3. Configure the Application

1. Open `index.html` in your browser
2. In the Configuration section:
   - **Gemini API Key**: Paste your Gemini key
   - **Appwrite Endpoint**: `https://cloud.appwrite.io/v1`
   - **Project ID**: Your Appwrite project ID
   - **Database ID**: From step 2
   - **Collection ID**: From step 2
3. Click "Save Configuration"

#### 4. Add Student Data (Optional)

The system includes sample data for demonstration. To add all 644 students:

1. Open `students-data.js`
2. Find the `studentsData` array
3. Add all student records from your mark list

Format:
```javascript
{ serial: 1, name: "Student Name", seatNo: "233001", group: 1 }
```

---

## 📱 Usage Guide

### Generating a Leaflet

1. **Enter Student Information**
   - Type student serial number (1-644)
   - Press Enter or click away from the field
   - Student info will auto-populate

2. **Choose a Template**
   - Browse the 10 template options
   - Click on your preferred design
   - The selected template will be highlighted

3. **Generate**
   - Click "Generate AI-Powered Leaflet"
   - Wait for AI to generate content (30-60 seconds)
   - Leaflet will appear below

### Regenerating Content

**Regenerate All Content:**
- Click "Regenerate Content" button
- AI will create new content with different phrasing

**Regenerate Image:**
- Click "Regenerate Image" button
- New AI-generated image placeholder

**Focus on Specific Points:**
1. Click "Focus on Specific Points"
2. Enter what to emphasize (e.g., "Focus more on prevention and statistics")
3. Click "Apply and Regenerate"

### Saving & Loading

**Save to Cloud:**
1. Generate a leaflet
2. Click "Save to Appwrite"
3. Leaflet is stored in cloud database

**Load Saved Leaflets:**
1. Click "Load Saved Leaflets"
2. Browse your saved leaflets
3. Click "View" to load a leaflet
4. Click "Delete" to remove

### Exporting

**Download PDF:**
- Click "Download PDF"
- File automatically downloads with student name

**Print:**
- Use browser's print function (Ctrl+P / Cmd+P)
- Select appropriate paper size (A4)

---

## 🎯 Best Practices

### Content Quality
- ✅ Review AI-generated content for accuracy
- ✅ Use "Focus on Specific Points" for targeted content
- ✅ Regenerate if content doesn't meet needs
- ✅ Verify medical information before distribution

### Template Selection
- 📄 Use **Three Column** for comprehensive information
- 📄 Use **Sequential Flow** for step-by-step guides
- 📄 Use **Bold Frame** for attention-grabbing leaflets
- 📄 Use **Gradient Header** for modern, vibrant designs

### Data Management
- 💾 Save important leaflets to Appwrite
- 💾 Name files clearly when downloading
- 💾 Keep track of which students have submitted
- 💾 Backup downloaded PDFs to cloud storage

---

## 🔒 Security & Privacy

### API Keys
- ⚠️ **Never share your API keys publicly**
- ⚠️ Store keys securely
- ⚠️ Rotate keys periodically
- ⚠️ Use environment variables in production

### Student Data
- 🔐 Student information is stored locally and in your Appwrite database
- 🔐 Appwrite provides encryption at rest
- 🔐 Set appropriate permissions in Appwrite
- 🔐 Comply with data protection regulations

### Production Deployment
For production use:
1. Enable Appwrite authentication
2. Restrict database permissions to authenticated users
3. Move API keys to server-side (Appwrite Functions)
4. Implement rate limiting
5. Use HTTPS only

---

## 🐛 Troubleshooting

### "Please configure your Gemini API key first"
- **Solution**: Enter API key in Configuration section
- Verify key is correct (starts with "AI...")
- Check key has proper permissions

### "Failed to generate leaflet"
- **Solution**: Check internet connection
- Verify Gemini API key is valid
- Check browser console for detailed error
- Try regenerating

### "Failed to save: Unauthorized"
- **Solution**: Check Appwrite configuration
- Verify all IDs are correct
- Check collection permissions in Appwrite Console
- Ensure API key has necessary permissions

### Content Not Loading
- **Solution**: Wait 30-60 seconds for AI generation
- Check browser console for errors
- Verify API quotas haven't been exceeded
- Try refreshing the page

### PDF Download Issues
- **Solution**: Ensure leaflet is fully loaded
- Wait for all images to load
- Try different browser
- Check popup blocker settings

---

## 📊 System Requirements

### Minimum Requirements
- Modern web browser (2020 or newer)
- Internet connection (5 Mbps or higher)
- Screen resolution: 1280x720 or higher

### Recommended
- Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- Internet connection: 10 Mbps or higher
- Screen resolution: 1920x1080 or higher
- 4GB RAM or more

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding Topics
1. Edit `students-data.js`
2. Add new topic to `topics` object
3. Include title, subtitle, imagePrompt, contentPrompt

### Improving Templates
1. Edit CSS in `index.html`
2. Add new template class (`.template-11`, etc.)
3. Update template selection grid

### Bug Reports
- Open an issue with detailed description
- Include browser and OS information
- Provide steps to reproduce

---

## 📝 Project Structure

```
phc-leaflet-generator/
├── index.html              # Main application
├── main-app.js            # Application logic
├── students-data.js       # Student & topic data
├── setup-appwrite.html    # Automatic Appwrite setup
├── README.md              # This file
├── APPWRITE_SETUP.md      # Manual setup guide
└── LICENSE                # MIT License
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Credits

### Development
- **Developed for**: Beni-Suef National University (BSNU)
- **Academic Year**: 2024-2025
- **Target Users**: 3rd Year Medical Students (644 students)

### Technologies
- **Google Gemini AI** - Content generation
- **Appwrite** - Backend & database
- **Tailwind CSS** - Styling framework
- **Font Awesome** - Icons

---

## 📧 Support

### Getting Help
1. Check [Troubleshooting](#troubleshooting) section
2. Review [APPWRITE_SETUP.md](APPWRITE_SETUP.md)
3. Check browser console for errors
4. Search existing issues

### Resources
- [Google Gemini Documentation](https://ai.google.dev/docs)
- [Appwrite Documentation](https://appwrite.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🎓 Educational Purpose

This project is created for educational purposes as part of the Primary Health Care curriculum at BSNU Faculty of Medicine. The AI-generated content should be reviewed by qualified healthcare professionals before public distribution.

---

## 🔄 Version History

### Version 1.0.0 (Current)
- ✅ 10 professional templates
- ✅ 19 PHC health topics
- ✅ Gemini AI integration
- ✅ Appwrite backend
- ✅ PDF export
- ✅ Automatic setup tool
- ✅ Focus regeneration feature
- ✅ Student database (644 students)

---

## 🚀 Future Enhancements

- [ ] User authentication system
- [ ] Multi-language support (Arabic + English)
- [ ] Advanced image generation with Imagen API
- [ ] Batch generation for multiple students
- [ ] Analytics dashboard
- [ ] Email sharing functionality
- [ ] QR code integration
- [ ] Mobile app version

---

<div align="center">

**Made with ❤️ for BSNU Medical Students**

**Empowering Health Education Through AI**

[⬆ Back to Top](#-phc-leaflet-generator---ai-powered-health-education-system)

</div>

