# Examples and Use Cases

This document provides practical examples of how to use and extend the iTP CyberServer bot framework.

## Table of Contents

- [Basic Bot Setup](#basic-bot-setup)
- [Command Examples](#command-examples)
- [CTF Challenge Examples](#ctf-challenge-examples)
- [Utility Usage Examples](#utility-usage-examples)
- [Advanced Features](#advanced-features)
- [Integration Examples](#integration-examples)

## Basic Bot Setup

### Minimal Bot Configuration

```javascript
// index.js
const FacebookPage = require('./facebook-page');

const bot = new FacebookPage();

// Set basic configuration
bot.setPrefix(':');
bot.setAssistant('CTF Bot');

// Add a simple echo command
bot.addCommand('echo', {
  title: 'Echo Command',
  command: 'echo (.*)',
  description: 'Repeats your message'
});

// Start the bot
bot.listen(() => {
  console.log('CTF Bot is running!');
});
```

### Echo Command Handler

```javascript
// src/echo.js
module.exports = async (api, event, regex) => {
  const userMessage = event.message.text.match(regex)[1];
  const response = `You said: ${userMessage}`;
  
  api.sendMessage(response, event);
};
```

## Command Examples

### 1. Simple Information Command

```javascript
// src/info.js
module.exports = async (api, event, regex) => {
  const info = `
🤖 CTF Bot Information

📅 Version: 0.1.0
🏆 Active Challenges: 5
👥 Registered Teams: 12
⏰ Competition Ends: December 31, 2025

Use :help to see available commands.
  `;
  
  api.sendMessage(info, event);
};
```

Register in `index.js`:
```javascript
bot.addCommand('info', {
  title: 'Bot Information',
  command: 'info',
  description: 'Shows bot and competition information'
});
```

### 2. Team Registration Command

```javascript
// src/register.js
const { post, get } = require('../utils/gist');

module.exports = async (api, event, regex) => {
  const teamName = event.message.text.match(regex)[1];
  const userId = event.sender.id;
  
  try {
    // Load existing teams
    const { data: teams } = await get('teams.json');
    
    // Check if user is already registered
    const existingTeam = teams.find(team => 
      Object.keys(team.players).includes(userId)
    );
    
    if (existingTeam) {
      return api.sendMessage(
        'You are already registered in a team!', 
        event
      );
    }
    
    // Create new team
    const newTeam = {
      id: `team_${Date.now()}`,
      name: teamName,
      players: {
        [userId]: 0
      },
      failed: 0,
      created: new Date().toISOString()
    };
    
    teams.push(newTeam);
    await post('teams.json', teams);
    
    api.sendMessage(
      `🎉 Team "${teamName}" registered successfully!\nTeam ID: ${newTeam.id}`, 
      event
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    api.sendMessage(
      'Sorry, registration failed. Please try again later.', 
      event
    );
  }
};
```

### 3. Leaderboard Command

```javascript
// src/leaderboard.js
const { get } = require('../utils/gist');
const markdown = require('../utils/markdown');

module.exports = async (api, event, regex) => {
  try {
    const { data: teams } = await get('teams.json');
    
    // Calculate team scores
    const teamScores = teams.map(team => {
      const totalScore = Object.values(team.players).reduce((sum, score) => sum + score, 0);
      return {
        name: team.name,
        score: totalScore,
        players: Object.keys(team.players).length
      };
    });
    
    // Sort by score (descending)
    teamScores.sort((a, b) => b.score - a.score);
    
    // Format leaderboard
    let leaderboard = markdown('🏆 LEADERBOARD 🏆\n\n');
    
    teamScores.slice(0, 10).forEach((team, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
      leaderboard += `${medal} ${team.name}\n`;
      leaderboard += `   Score: ${team.score} | Players: ${team.players}\n\n`;
    });
    
    if (teamScores.length === 0) {
      leaderboard += 'No teams registered yet. Be the first to register!';
    }
    
    api.sendMessage(leaderboard, event);
    
  } catch (error) {
    console.error('Leaderboard error:', error);
    api.sendMessage('Unable to load leaderboard. Please try again later.', event);
  }
};
```

### 4. Hint Command

```javascript
// src/hint.js
const { get } = require('../utils/gist');

module.exports = async (api, event, regex) => {
  const userId = event.sender.id;
  
  try {
    // Load user progress
    const { data: teams } = await get('teams.json');
    const userTeam = teams.find(team => 
      Object.keys(team.players).includes(userId)
    );
    
    if (!userTeam) {
      return api.sendMessage(
        'You need to register for a team first! Use :register [team_name]', 
        event
      );
    }
    
    // Load challenges
    const { data: challenges } = await get('challenges.json');
    
    // Calculate current challenge index
    const totalScore = Object.values(userTeam.players).reduce((sum, score) => sum + score, 0);
    const currentChallengeIndex = totalScore + userTeam.failed;
    
    if (currentChallengeIndex >= challenges.length) {
      return api.sendMessage('🎉 Congratulations! You have completed all challenges!', event);
    }
    
    const currentChallenge = challenges[currentChallengeIndex];
    const hints = currentChallenge.next?.hints || [];
    
    if (hints.length === 0) {
      return api.sendMessage('No hints available for this challenge.', event);
    }
    
    let hintMessage = `💡 Hints for: ${currentChallenge.next.title}\n\n`;
    hints.forEach((hint, index) => {
      hintMessage += `${index + 1}. ${hint}\n`;
    });
    
    api.sendMessage(hintMessage, event);
    
  } catch (error) {
    console.error('Hint error:', error);
    api.sendMessage('Unable to load hints. Please try again later.', event);
  }
};
```

## CTF Challenge Examples

### 1. Basic Cryptography Challenge

```json
{
  "flag": "crypto_basic_001",
  "next": {
    "title": "Caesar Cipher",
    "description": "Decode this message: KHOOR ZRUOG",
    "hints": [
      "This is a simple substitution cipher",
      "Try shifting letters by a fixed amount",
      "The shift value is 3"
    ]
  },
  "due_date": "12-31-2025"
}
```

### 2. Web Security Challenge

```json
{
  "flag": "web_security_001",
  "next": {
    "title": "SQL Injection",
    "description": "Find the flag in this vulnerable login form: http://ctf.example.com/login",
    "hints": [
      "Try entering special characters in the username field",
      "Look for ways to bypass authentication",
      "Consider using ' OR '1'='1"
    ]
  },
  "due_date": "12-31-2025"
}
```

### 3. Reverse Engineering Challenge

```json
{
  "flag": "reverse_eng_001",
  "next": {
    "title": "Binary Analysis",
    "description": "Analyze this binary file to find the hidden flag: http://ctf.example.com/files/mystery.exe",
    "hints": [
      "Use a disassembler like IDA or Ghidra",
      "Look for string references",
      "Check for XOR operations"
    ]
  },
  "due_date": "12-31-2025"
}
```

### 4. Steganography Challenge

```json
{
  "flag": "stego_001",
  "next": {
    "title": "Hidden Message",
    "description": "There's a secret message hidden in this image: http://ctf.example.com/files/sunset.jpg",
    "hints": [
      "The message might be hidden in the least significant bits",
      "Try using steganography tools like steghide",
      "Check the image metadata first"
    ]
  },
  "due_date": "12-31-2025"
}
```

## Utility Usage Examples

### 1. Date Utility Examples

```javascript
const date = require('./utils/date');

// Get current time in Manila timezone
const now = date();
console.log('Current time:', now);

// Parse specific date with timezone
const deadline = date('2025-12-31 23:59:59', 'Asia/Manila');
console.log('Challenge deadline:', deadline);

// Check if deadline has passed
const isExpired = deadline.getTime() < Date.now();
console.log('Challenge expired:', isExpired);

// Format for display
const formatted = deadline.toLocaleString('en-US', {
  timeZone: 'Asia/Manila',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});
console.log('Formatted deadline:', formatted);
```

### 2. Gist Utility Examples

```javascript
const { get, post } = require('./utils/gist');

// Read challenge data
async function loadChallenges() {
  try {
    const result = await get('challenges.json');
    return result.data;
  } catch (error) {
    console.error('Failed to load challenges:', error);
    return [];
  }
}

// Save user progress
async function saveProgress(teams) {
  try {
    await post('teams.json', teams);
    console.log('Progress saved successfully');
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

// Backup data
async function backupData() {
  const challenges = await get('challenges.json');
  const teams = await get('teams.json');
  
  const backup = {
    timestamp: new Date().toISOString(),
    challenges: challenges.data,
    teams: teams.data
  };
  
  await post(`backup_${Date.now()}.json`, backup);
}
```

### 3. Markdown Utility Examples

```javascript
const markdown = require('./utils/markdown');

// Format headers
const title = markdown('CHALLENGE COMPLETED!');
console.log(title); // 𝐂𝐇𝐀𝐋𝐋𝐄𝐍𝐆𝐄 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐄𝐃!

// Format team names
const teamName = markdown('Team Alpha');
console.log(teamName); // 𝐓𝐞𝐚𝐦 𝐀𝐥𝐩𝐡𝐚

// Format scores
const score = markdown('Score: 1337');
console.log(score); // 𝐒𝐜𝐨𝐫𝐞: 𝟏𝟑𝟑𝟕
```

## Advanced Features

### 1. Admin Commands

```javascript
// src/admin.js
const { get, post } = require('../utils/gist');

module.exports = async (api, event, regex) => {
  const userId = event.sender.id;
  const adminIds = ['admin_user_id_1', 'admin_user_id_2'];
  
  // Check if user is admin
  if (!adminIds.includes(userId)) {
    return api.sendMessage('Access denied. Admin privileges required.', event);
  }
  
  const command = event.message.text.match(regex)[1].toLowerCase();
  
  switch (command) {
    case 'stats':
      await showStats(api, event);
      break;
    case 'reset':
      await resetCompetition(api, event);
      break;
    case 'backup':
      await createBackup(api, event);
      break;
    default:
      api.sendMessage('Unknown admin command. Available: stats, reset, backup', event);
  }
};

async function showStats(api, event) {
  try {
    const { data: teams } = await get('teams.json');
    const { data: challenges } = await get('challenges.json');
    
    const totalTeams = teams.length;
    const totalChallenges = challenges.length;
    const completedChallenges = teams.reduce((sum, team) => {
      return sum + Object.values(team.players).reduce((teamSum, score) => teamSum + score, 0);
    }, 0);
    
    const stats = `
📊 Competition Statistics

👥 Total Teams: ${totalTeams}
🏁 Total Challenges: ${totalChallenges}
✅ Completed Challenges: ${completedChallenges}
📈 Average Progress: ${totalTeams > 0 ? (completedChallenges / totalTeams).toFixed(2) : 0}%
    `;
    
    api.sendMessage(stats, event);
  } catch (error) {
    api.sendMessage('Failed to load statistics.', event);
  }
}
```

### 2. File Upload Handler

```javascript
// src/upload.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = async (api, event, regex) => {
  // Handle file attachments
  if (event.message.attachments) {
    for (const attachment of event.message.attachments) {
      if (attachment.type === 'file') {
        await handleFileUpload(api, event, attachment);
      }
    }
  } else {
    api.sendMessage('Please attach a file to upload.', event);
  }
};

async function handleFileUpload(api, event, attachment) {
  try {
    const fileUrl = attachment.payload.url;
    const fileName = `upload_${Date.now()}_${attachment.payload.title || 'file'}`;
    const filePath = path.join(__dirname, '../temp', fileName);
    
    // Download file
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream'
    });
    
    // Save file
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    
    writer.on('finish', () => {
      api.sendMessage(`File uploaded successfully: ${fileName}`, event);
    });
    
    writer.on('error', (error) => {
      console.error('File upload error:', error);
      api.sendMessage('Failed to upload file.', event);
    });
    
  } catch (error) {
    console.error('File handling error:', error);
    api.sendMessage('Error processing file upload.', event);
  }
}
```

### 3. Scheduled Messages

```javascript
// src/scheduler.js
const cron = require('node-cron');
const { get } = require('../utils/gist');

class MessageScheduler {
  constructor(api) {
    this.api = api;
    this.setupScheduledTasks();
  }
  
  setupScheduledTasks() {
    // Daily reminder at 9 AM
    cron.schedule('0 9 * * *', () => {
      this.sendDailyReminder();
    });
    
    // Competition end warning (1 hour before)
    cron.schedule('0 22 30 12 *', () => {
      this.sendCompetitionEndWarning();
    });
  }
  
  async sendDailyReminder() {
    try {
      const { data: teams } = await get('teams.json');
      const message = `
🌅 Good morning, CTF participants!

Don't forget to work on today's challenges. 
Check your progress with :leaderboard
Need help? Use :hint for clues!

Good luck! 🍀
      `;
      
      // Send to all team leaders (first player in each team)
      for (const team of teams) {
        const leaderId = Object.keys(team.players)[0];
        if (leaderId) {
          this.api.sendMessage(message, { sender: { id: leaderId } });
        }
      }
    } catch (error) {
      console.error('Failed to send daily reminder:', error);
    }
  }
  
  async sendCompetitionEndWarning() {
    const message = `
⚠️ COMPETITION ENDING SOON! ⚠️

The CTF competition will end in 1 hour!
Make sure to submit your final flags.

Final leaderboard will be announced shortly after.
    `;
    
    this.api.sendToAdmin(message);
  }
}

module.exports = MessageScheduler;
```

## Integration Examples

### 1. Discord Integration

```javascript
// src/discord-bridge.js
const axios = require('axios');

class DiscordBridge {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
  }
  
  async sendToDiscord(message, username = 'CTF Bot') {
    try {
      await axios.post(this.webhookUrl, {
        username: username,
        content: message,
        embeds: [{
          title: 'CTF Update',
          description: message,
          color: 0x00ff00,
          timestamp: new Date().toISOString()
        }]
      });
    } catch (error) {
      console.error('Discord bridge error:', error);
    }
  }
  
  async announceFlag(teamName, challengeTitle) {
    const message = `🎉 Team **${teamName}** completed challenge: **${challengeTitle}**!`;
    await this.sendToDiscord(message);
  }
}

module.exports = DiscordBridge;
```

### 2. Slack Integration

```javascript
// src/slack-integration.js
const { WebClient } = require('@slack/web-api');

class SlackIntegration {
  constructor(token, channel) {
    this.slack = new WebClient(token);
    this.channel = channel;
  }
  
  async postMessage(text, blocks = null) {
    try {
      await this.slack.chat.postMessage({
        channel: this.channel,
        text: text,
        blocks: blocks
      });
    } catch (error) {
      console.error('Slack integration error:', error);
    }
  }
  
  async announceLeaderboard(teams) {
    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🏆 CTF Leaderboard'
        }
      },
      {
        type: 'section',
        fields: teams.slice(0, 5).map((team, index) => ({
          type: 'mrkdwn',
          text: `*${index + 1}. ${team.name}*\nScore: ${team.score}`
        }))
      }
    ];
    
    await this.postMessage('Current CTF Leaderboard', blocks);
  }
}

module.exports = SlackIntegration;
```

### 3. Database Integration

```javascript
// src/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.db = new sqlite3.Database(path.join(__dirname, '../data/ctf.db'));
    this.initTables();
  }
  
  initTables() {
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS teams (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      this.db.run(`
        CREATE TABLE IF NOT EXISTS players (
          id TEXT PRIMARY KEY,
          team_id TEXT,
          score INTEGER DEFAULT 0,
          FOREIGN KEY (team_id) REFERENCES teams (id)
        )
      `);
      
      this.db.run(`
        CREATE TABLE IF NOT EXISTS submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          player_id TEXT,
          flag TEXT,
          correct BOOLEAN,
          submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (player_id) REFERENCES players (id)
        )
      `);
    });
  }
  
  async getTeamScore(teamId) {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT SUM(score) as total FROM players WHERE team_id = ?',
        [teamId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row?.total || 0);
        }
      );
    });
  }
  
  async recordSubmission(playerId, flag, correct) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO submissions (player_id, flag, correct) VALUES (?, ?, ?)',
        [playerId, flag, correct],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  }
}

module.exports = Database;
```

These examples demonstrate the flexibility and extensibility of the iTP CyberServer framework. You can adapt and combine these patterns to create a comprehensive CTF bot that meets your specific requirements.