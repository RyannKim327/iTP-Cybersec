# Quick Start Guide

Get your iTP CyberServer CTF bot up and running in minutes!

## 🚀 Quick Setup (5 minutes)

### 1. Prerequisites
- Node.js 14+ installed
- Facebook Developer Account
- GitHub Account

### 2. Clone and Install
```bash
git clone https://github.com/RyannKim327/iTP-Cybersec.git
cd iTP-Cybersec
npm install
```

### 3. Environment Setup
```bash
cp .env.sample .env
# Edit .env with your credentials (see below)
```

### 4. Get Your Tokens

#### Facebook Page Token:
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create an app → Add Messenger product
3. Create a Facebook page for your bot
4. Generate Page Access Token

#### GitHub Gist:
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate token with `gist` scope
3. Create a new Gist with files: `challenges.json` and `matches.json`

### 5. Configure Environment
Edit `.env` file:
```env
FB_TOKEN=your_facebook_page_access_token
KEY_TOKEN=your_secure_verification_token
GIST_TOKEN=your_github_personal_access_token
GIST_ID=your_gist_id
PORT=3000
```

### 6. Start the Bot
```bash
npm start
```

### 7. Set Up Webhook
1. Use ngrok for local testing: `ngrok http 3000`
2. In Facebook app settings, set webhook URL: `https://your-ngrok-url.ngrok.io/webhook`
3. Use your `KEY_TOKEN` as verification token

## 🎯 Test Your Bot

Send these messages to your Facebook page:

- `:help` - See available commands
- `iTP{welcome_to_ctf}` - Submit a test flag
- `nickname TestUser` - Set your nickname

## 📚 Next Steps

1. **Customize Challenges**: Edit your GitHub Gist files
2. **Add Commands**: Create new files in `src/` directory
3. **Deploy**: Use Heroku, Railway, or your preferred platform

## 🔧 Sample Data

### challenges.json
```json
[
  {
    "flag": "welcome_to_ctf",
    "next": {
      "title": "Welcome Challenge",
      "description": "You've successfully set up the bot!",
      "hints": ["This is just the beginning"]
    },
    "due_date": "12-31-2025"
  }
]
```

### matches.json
```json
[
  {
    "id": "test_team",
    "players": {
      "test_user": 0
    },
    "failed": 0
  }
]
```

## 🆘 Troubleshooting

**Bot not responding?**
- Check if webhook URL is accessible
- Verify FB_TOKEN is correct
- Check server logs for errors

**Need help?**
- Read the full documentation in `docs/`
- Check `docs/SETUP.md` for detailed setup
- Review `docs/EXAMPLES.md` for code examples

## 📖 Documentation

- [Complete Setup Guide](docs/SETUP.md)
- [API Documentation](docs/API.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Examples and Use Cases](docs/EXAMPLES.md)
- [Contributing Guide](docs/CONTRIBUTING.md)

Happy CTF-ing! 🏁