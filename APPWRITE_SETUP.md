# Appwrite Setup Guide for PHC Leaflet Generator

This guide will help you set up Appwrite backend for storing and managing generated leaflets.

## Table of Contents
1. [Create Appwrite Account](#create-appwrite-account)
2. [Create Project](#create-project)
3. [Create Database](#create-database)
4. [Create Collection](#create-collection)
5. [Configure Attributes](#configure-attributes)
6. [Set Permissions](#set-permissions)
7. [Get Configuration IDs](#get-configuration-ids)

---

## Create Appwrite Account

1. Go to [Appwrite Cloud](https://cloud.appwrite.io)
2. Sign up for a free account
3. Verify your email address

---

## Create Project

1. Click **"Create Project"** button
2. Enter project name: `PHC Leaflet Generator`
3. Click **"Create"**
4. **Save your Project ID** (you'll need this later)

---

## Create Database

1. In your project, go to **"Databases"** in the left sidebar
2. Click **"Create Database"**
3. Enter database name: `leaflets_db`
4. Click **"Create"**
5. **Save your Database ID**

---

## Create Collection

1. Inside your database, click **"Create Collection"**
2. Enter collection name: `leaflets`
3. Click **"Create"**
4. **Save your Collection ID**

---

## Configure Attributes

Add the following attributes to your `leaflets` collection:

### Attribute List

| Attribute Name | Type | Size | Required | Default | Array |
|---------------|------|------|----------|---------|-------|
| `studentSerial` | Integer | - | Yes | - | No |
| `studentName` | String | 255 | Yes | - | No |
| `studentSeatNo` | String | 50 | Yes | - | No |
| `studentGroup` | Integer | - | Yes | - | No |
| `topicTitle` | String | 255 | Yes | - | No |
| `topicSubtitle` | String | 255 | Yes | - | No |
| `content` | String | 65535 | Yes | - | No |
| `imageUrl` | String | 2048 | No | - | No |
| `templateNumber` | Integer | - | Yes | 1 | No |
| `generatedAt` | String | 50 | Yes | - | No |

### How to Add Attributes

For each attribute:

1. Click **"Create Attribute"**
2. Select the appropriate type
3. Enter the attribute name (exactly as shown)
4. Set size for String types
5. Check "Required" if needed
6. Click **"Create"**

---

## Set Permissions

### Collection Permissions

1. Go to **"Settings"** tab in your collection
2. Under **"Permissions"**, click **"Add Role"**
3. Select **"Any"** (for public access) or configure specific roles
4. Grant permissions:
   - **Create**: Allow (so users can save leaflets)
   - **Read**: Allow (so users can view saved leaflets)
   - **Update**: Allow (so users can modify their leaflets)
   - **Delete**: Allow (so users can delete their leaflets)

### Recommended Permission Setup

**For Public Access (Development):**
- Role: `Any`
- Permissions: Create, Read, Update, Delete

**For Production:**
- Role: `Users`
- Permissions: Create, Read, Update, Delete
- Add user authentication to your app

---

## Get Configuration IDs

You'll need these IDs to configure the application:

### 1. Appwrite Endpoint
```
https://cloud.appwrite.io/v1
```
(This is the default for Appwrite Cloud)

### 2. Project ID
- Found in: Project Settings → Project ID
- Example: `65a1b2c3d4e5f6g7h8i9`

### 3. Database ID
- Found in: Database Settings → Database ID
- Example: `leaflets_db_id_12345`

### 4. Collection ID
- Found in: Collection Settings → Collection ID
- Example: `leaflets_collection_67890`

---

## Configure the Application

1. Open the PHC Leaflet Generator application
2. Scroll to the **Configuration** section
3. Enter the following:
   - **Appwrite Endpoint**: `https://cloud.appwrite.io/v1`
   - **Appwrite Project ID**: Your Project ID
   - **Database ID**: Your Database ID
   - **Collection ID**: Your Collection ID
4. Click **"Save Configuration"**

---

## Testing the Setup

### Test Saving a Leaflet

1. Generate a leaflet using the application
2. Click **"Save to Appwrite"**
3. Check if you see "Leaflet saved successfully!"

### Test Loading Leaflets

1. Click **"Load Saved Leaflets"** in the Saved Leaflets section
2. You should see your saved leaflets listed

### Verify in Appwrite Console

1. Go to your Appwrite collection
2. Click on **"Documents"** tab
3. You should see the saved leaflet documents

---

## Troubleshooting

### Error: "Failed to save: Document not found"
- **Solution**: Check that all attribute names match exactly (case-sensitive)
- Verify all required attributes are created

### Error: "Failed to save: Unauthorized"
- **Solution**: Check collection permissions
- Ensure "Any" or appropriate role has Create permission

### Error: "Failed to save: Invalid credentials"
- **Solution**: Double-check your Project ID
- Verify API endpoint is correct

### Error: "Network error"
- **Solution**: Check your internet connection
- Verify Appwrite Cloud is accessible

---

## Security Considerations

### For Production Deployment

1. **Enable User Authentication**
   - Add Appwrite Auth SDK
   - Require users to log in
   - Change permissions from "Any" to "Users"

2. **Add User-Based Filtering**
   - Add `userId` attribute to collection
   - Store user ID with each document
   - Filter queries by user ID

3. **Implement Rate Limiting**
   - Use Appwrite functions for complex logic
   - Add rate limiting to prevent abuse

4. **Secure API Keys**
   - Store Gemini API key on server-side
   - Use Appwrite Functions to call Gemini API
   - Don't expose API keys in client-side code

---

## Advanced Features

### Add Full-Text Search

1. In collection settings, enable full-text search
2. Add search indexes for `studentName` and `topicTitle`
3. Implement search functionality in your app

### Add Webhooks

1. Go to Project Settings → Webhooks
2. Create webhook for document creation
3. Send notifications when leaflets are generated

### Add Cloud Functions

1. Create Appwrite Function for image generation
2. Secure API keys on server-side
3. Call function from client app

---

## Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Web SDK](https://appwrite.io/docs/sdks#web)
- [Appwrite Databases Guide](https://appwrite.io/docs/databases)
- [Appwrite Permissions Guide](https://appwrite.io/docs/permissions)

---

## Support

If you encounter issues:
1. Check the [Appwrite Discord](https://appwrite.io/discord)
2. Review [Appwrite GitHub Issues](https://github.com/appwrite/appwrite/issues)
3. Consult the [Appwrite Community](https://github.com/appwrite/appwrite/discussions)

---

**Setup Complete!** Your PHC Leaflet Generator is now connected to Appwrite backend.

