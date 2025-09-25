# API Documentation

## FacebookPage Class

The `FacebookPage` class is the core of the CyberServer bot framework. It handles webhook management, message routing, and command processing.

### Constructor

```javascript
const FacebookPage = require('./facebook-page');
const bot = new FacebookPage();
```

Creates a new instance of the FacebookPage bot with default configuration.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `FB_TOKEN` | string | `process.env.FB_TOKEN` | Facebook Page Access Token |
| `KEY_TOKEN` | string | `process.env.KEY_TOKEN \|\| "pagebot"` | Webhook verification token |
| `prefix` | string | `"/"` | Command prefix |
| `commands` | array | `[]` | Registered commands |
| `version` | string | `"v23.0"` | Facebook Graph API version |

### Methods

#### `addCommand(script, command)`

Registers a new command handler.

**Parameters:**
- `script` (string): Name of the script file in `src/` directory
- `command` (object): Command configuration object

**Command Configuration:**
```javascript
{
  title: string,        // Display name for the command
  command: string,      // Regex pattern to match
  description?: string, // Optional description
  hidden?: boolean,     // Hide from help menu (default: false)
  unprefix?: boolean,   // Don't require command prefix (default: false)
  any?: boolean,        // Match anywhere in message (default: false)
  ci?: boolean,         // Case insensitive matching (default: true)
  maintenance?: boolean // Mark as under maintenance (default: false)
}
```

**Example:**
```javascript
bot.addCommand("echo", {
  title: "Echo Command",
  command: "echo (.*)",
  description: "Repeats your message",
  hidden: false
});
```

#### `setPrefix(prefix)`

Sets the command prefix.

**Parameters:**
- `prefix` (string): The prefix character(s)

**Example:**
```javascript
bot.setPrefix(":");
```

#### `sendMessage(message, event, callback?)`

Sends a text message to a user.

**Parameters:**
- `message` (string|object): Message text or message object
- `event` (object): Facebook event object containing sender information
- `callback` (function, optional): Callback function for handling response

**Example:**
```javascript
bot.sendMessage("Hello World!", event, (error, response) => {
  if (error) {
    console.error("Failed to send message:", error);
  } else {
    console.log("Message sent successfully");
  }
});
```

#### `sendAttachment(fileType, fileUrl, event, callback?)`

Sends an attachment (image, audio, video) to a user.

**Parameters:**
- `fileType` (string): Type of attachment ("image", "audio", "video")
- `fileUrl` (string): URL or local path to the file
- `event` (object): Facebook event object
- `callback` (function, optional): Callback function

**Example:**
```javascript
bot.sendAttachment("image", "https://example.com/image.png", event);
```

#### `addAdmin(adminID)`

Adds a user as an admin.

**Parameters:**
- `adminID` (string): Facebook user ID

**Example:**
```javascript
bot.addAdmin("1234567890");
```

#### `sendToAdmin(message, callback?)`

Sends a message to all registered admins.

**Parameters:**
- `message` (string|object): Message to send
- `callback` (function, optional): Callback function

**Example:**
```javascript
bot.sendToAdmin("System alert: New user registered");
```

#### `setFallback(script, command)`

Sets a fallback command for unmatched messages.

**Parameters:**
- `script` (string): Script file name
- `command` (object): Command configuration

**Example:**
```javascript
bot.setFallback("unknown", {
  title: "Unknown Command Handler"
});
```

#### `setWebhook(webhook)`

Sets the webhook endpoint path.

**Parameters:**
- `webhook` (string): Webhook path (default: "/webhook")

#### `setAssetsFolder(assets)`

Sets the static assets folder path.

**Parameters:**
- `assets` (string): Assets folder path (default: "/assets")

#### `setTemporaryFolder(temp)`

Sets the temporary files folder path.

**Parameters:**
- `temp` (string): Temporary folder path (default: "/temp")

#### `addPublicFolder(folder)`

Adds a public folder for static file serving.

**Parameters:**
- `folder` (string): Folder name to serve publicly

#### `getAssistant()`

Returns the current assistant name.

**Returns:** string

#### `setAssistant(name)`

Sets the assistant name.

**Parameters:**
- `name` (string): Assistant name

#### `listen(callback?)`

Starts the bot server.

**Parameters:**
- `callback` (function, optional): Callback function that receives the Express app instance

**Example:**
```javascript
bot.listen((app) => {
  console.log("Bot is running!");
  
  // Add custom routes
  app.get("/status", (req, res) => {
    res.json({ status: "online" });
  });
});
```

## Event Object Structure

The `event` object passed to command handlers contains:

```javascript
{
  sender: {
    id: string  // Facebook user ID
  },
  message: {
    text: string,     // Message text
    mid: string,      // Message ID
    seq: number       // Sequence number
  },
  timestamp: number   // Unix timestamp
}
```

## Command Handler Function

Command handlers should follow this signature:

```javascript
module.exports = async (api, event, regex) => {
  // api: FacebookPage instance
  // event: Facebook event object
  // regex: Matched regex object
  
  const userInput = event.message.text.match(regex)[1];
  api.sendMessage(`You said: ${userInput}`, event);
};
```

## Error Handling

The framework includes built-in error handling for:

- Invalid Facebook tokens
- Missing command files
- Malformed command configurations
- Network errors during message sending

All errors are logged to the console with descriptive messages.

## Rate Limiting

The framework automatically handles long messages by:
- Splitting messages longer than 300 words
- Adding delays between message chunks (1.5 seconds)
- Preventing message flooding

## File Serving

The framework supports serving static files:

- **Assets**: Permanent files served from `/assets`
- **Temporary**: Temporary files served from `/temp`
- **Custom**: Additional folders via `addPublicFolder()`

Local file URLs are automatically converted to public URLs when sending attachments.

## Webhook Security

The framework validates incoming webhooks using:
- Verification token matching
- Proper subscription mode checking
- Request signature validation (Facebook standard)

## Environment Variables

Required environment variables:

```env
FB_TOKEN=your_facebook_page_access_token
KEY_TOKEN=your_webhook_verification_token
GIST_TOKEN=your_github_personal_access_token
GIST_ID=your_gist_id
PORT=3000  # Optional, defaults to 3000
```