# WebView URL Updater API

This is a Node.js API that retrieves and updates a WebView URL dynamically using MongoDB.

## Features:
- ✅ Retrieve WebView URL (`GET /api/getWebViewUrl`)
- ✅ Update WebView URL (`POST /api/updateWebViewUrl`)

## Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file and add your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

3. Start the server:
   ```
   npm start
   ```

## Deployment

To deploy on Render, Vercel, or Railway:
- Use the **`Procfile`** if deploying on **Heroku**
- Make sure to set the **`MONGO_URI`** environment variable in the deployment settings.
