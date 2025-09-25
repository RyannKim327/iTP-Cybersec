# Setup Guide

This guide will walk you through setting up the CyberServer Facebook Messenger CTF bot from scratch.

## Prerequisites

Before you begin, ensure you have:

- Node.js (version 14 or higher)
- npm or yarn package manager
- A Facebook account
- A GitHub account
- Basic knowledge of JavaScript and Node.js

## Step 1: Facebook App Setup

### 1.1 Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Business" as the app type
4. Fill in your app details:
   - App Name: `CyberServer Bot`
   - App Contact Email: Your email
   - Business Account: Select or create one

### 1.2 Add Messenger Product

1. In your app dashboard, click "Add Product"
2. Find "Messenger" and click "Set Up"
3. This will add Messenger to your app

### 1.3 Create a Facebook Page

1. Go to [Facebook Pages](https://www.facebook.com/pages/create/)
2. Create a new page for your bot
3. Choose "Business or Brand"
4. Fill in page details and create

### 1.4 Generate Page Access Token

1. In your app dashboard, go to Messenger → Settings
2. In the "Access Tokens" section, click "Add or Remove Pages"
3. Select your created page and continue
4. Copy the generated Page Access Token
5. **Important**: Keep this token secure!

## Step 2: GitHub Gist Setup

### 2.1 Create Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Give it a descriptive name: `CyberServer Gist Access`
4. Select scopes: `gist` (read and write gists)
5. Click "Generate token"
6. **Important**: Copy and save the token immediately!

### 2.2 Create Data Gist

1. Go to [GitHub Gist](https://gist.github.com/)
2. Create a new gist with two files:

**File 1: `challenges.json`**
```json
[
  {
    "flag": "welcome_to_ctf",
    "next": {
      "title": "First Challenge",
      "description": "Welcome to the CTF! This is your first challenge.",
      "hints": [
        "Look for hidden information",
        "Check the source code"
      ]
    },
    "due_date": "12-31-2025"
  },
  {
    "flag": "basic_crypto",
    "next": {
      "title": "Cryptography Challenge",
      "description": "Decode this message: SGVsbG8gV29ybGQ=",
      "hints": [
        "This looks like Base64",
        "Try online decoders"
      ]
    },
    "due_date": "12-31-2025"
  }
]
```

**File 2: `matches.json`**
```json
[
  {
    "id": "example_team",
    "players": {
      "player1": 0,
      "player2": 0
    },
    "failed": 0
  }
]
```

3. Set the gist to "Secret" (not public)
4. Create the gist and copy the Gist ID from the URL

## Step 3: Project Setup

### 3.1 Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd CyberServer

# Install dependencies
npm install
```

### 3.2 Environment Configuration

1. Copy the environment template:
```bash
cp .env.sample .env
```

2. Edit `.env` file with your credentials:
```env
# Facebook Page Access Token (from Step 1.4)
FB_TOKEN=your_facebook_page_access_token

# Webhook verification token (choose any secure string)
KEY_TOKEN=your_secure_verification_token

# GitHub Gist credentials (from Step 2)
GIST_TOKEN=your_github_personal_access_token
GIST_ID=your_gist_id

# Server port (optional, defaults to 3000)
PORT=3000
```

### 3.3 Test Local Setup

```bash
# Start the server
node index.js
```

You should see: `The service is now started with port: 3000`

## Step 4: Webhook Configuration

### 4.1 Expose Local Server (Development)

For development, use ngrok to expose your local server:

```bash
# Install ngrok
npm install -g ngrok

# Expose port 3000
ngrok http 3000
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)

### 4.2 Configure Facebook Webhook

1. In your Facebook app dashboard, go to Messenger → Settings
2. In the "Webhooks" section, click "Add Callback URL"
3. Enter your webhook details:
   - **Callback URL**: `https://your-domain.com/webhook` (or ngrok URL)
   - **Verify Token**: The same value as `KEY_TOKEN` in your `.env`
4. Click "Verify and Save"

### 4.3 Subscribe to Page Events

1. In the same Webhooks section, click "Add Subscriptions"
2. Select your page
3. Subscribe to these events:
   - `messages`
   - `messaging_postbacks`
4. Click "Subscribe"

## Step 5: Testing

### 5.1 Test Basic Functionality

1. Go to your Facebook page
2. Send a message: `:help`
3. The bot should respond with available commands

### 5.2 Test CTF Functionality

1. Send a flag: `iTP{welcome_to_ctf}`
2. The bot should validate the flag and provide the next challenge

### 5.3 Test Error Handling

1. Send an invalid flag: `iTP{wrong_flag}`
2. The bot should respond with "You got a wrong flag."

## Step 6: Production Deployment

### 6.1 Choose a Hosting Platform

Popular options:
- **Heroku**: Easy deployment with git
- **Railway**: Modern platform with simple setup
- **DigitalOcean**: VPS with more control
- **AWS/GCP**: Enterprise-grade solutions

### 6.2 Heroku Deployment Example

1. Install Heroku CLI
2. Create a new Heroku app:
```bash
heroku create your-app-name
```

3. Set environment variables:
```bash
heroku config:set FB_TOKEN=your_token
heroku config:set KEY_TOKEN=your_key
heroku config:set GIST_TOKEN=your_gist_token
heroku config:set GIST_ID=your_gist_id
```

4. Deploy:
```bash
git add .
git commit -m "Initial deployment"
git push heroku main
```

5. Update Facebook webhook URL to your Heroku app URL

### 6.3 Domain Setup (Optional)

1. Purchase a domain name
2. Configure DNS to point to your hosting platform
3. Set up SSL certificate (most platforms provide this automatically)
4. Update Facebook webhook URL to use your custom domain

## Step 7: Customization

### 7.1 Modify Bot Behavior

Edit `index.js` to customize:
- Command prefix
- Available commands
- Bot assistant name

### 7.2 Add Custom Commands

1. Create a new file in `src/` directory
2. Register it in `index.js` using `addCommand()`

### 7.3 Customize Challenges

Edit your GitHub Gist files to add new challenges and modify existing ones.

## Troubleshooting

### Common Issues

**Bot not responding:**
- Check if webhook URL is accessible
- Verify FB_TOKEN is correct
- Check server logs for errors

**Webhook verification failed:**
- Ensure KEY_TOKEN matches in both .env and Facebook settings
- Check if webhook URL is HTTPS

**Gist errors:**
- Verify GIST_TOKEN has correct permissions
- Check if GIST_ID is correct
- Ensure gist files have correct JSON format

**Command not working:**
- Check if script file exists in `src/` directory
- Verify command regex pattern
- Check for JavaScript syntax errors

### Debug Mode

Enable detailed logging:
```bash
DEBUG=* node index.js
```

### Log Files

Check application logs for detailed error information:
```bash
# View real-time logs (Heroku example)
heroku logs --tail
```

## Security Considerations

1. **Never commit sensitive tokens** to version control
2. **Use environment variables** for all credentials
3. **Regularly rotate tokens** and passwords
4. **Monitor webhook traffic** for suspicious activity
5. **Validate all user inputs** in command handlers
6. **Use HTTPS** for all webhook URLs

## Next Steps

After successful setup:

1. **Create more challenges** in your Gist
2. **Add team management** features
3. **Implement scoring systems**
4. **Add admin commands** for challenge management
5. **Set up monitoring** and alerting
6. **Create backup strategies** for your data

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Facebook Messenger Platform documentation
3. Check GitHub Issues for similar problems
4. Create a new issue with detailed error information

## Resources

- [Facebook Messenger Platform Documentation](https://developers.facebook.com/docs/messenger-platform/)
- [GitHub Gist API Documentation](https://docs.github.com/en/rest/gists)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)