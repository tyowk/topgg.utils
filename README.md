# **Topgg Utils**  

Topgg Utils is a Node.js API wrapper for interacting with the Top.gg API. It simplifies the process of fetching bot and user data, managing statistics, and handling webhook events for votes.  

---

## **Features**  

- **Data Fetching:** Retrieve bot, user, and voting data from Top.gg.  
- **Statistics Management:** Post bot statistics directly to the API.  
- **Webhook Support:** Handle real-time vote events using webhooks.  
- **Event-Driven:** Listen to various events like bot votes, guild votes, and errors.  

---

## **Installation**  

```bash
npm install topgg.utils
```

---

## **Usage Guide**  

### **Importing the Library**  

```javascript
const { Manager } = require('topgg.utils');
```

---

### **Examples**  

#### **Creating a Bot Manager**  

```javascript
// Initialize a new Manager instance
const manager = new Manager({
    token: 'YOUR_API_TOKEN',                // Your Top.gg API token
    webhook: {
        port: 3000,                         // Port for webhook server
        endpoint: '/webhook',               // Webhook endpoint
        authorization: 'YOUR_WEBHOOK_AUTH', // Webhook authorization token
    }
});

// Listen to the Ready event
manager.on('ready', () => {
    console.log('Topgg.utils manager is ready!');
});
```

---

#### **Fetching Bot Data**  

```javascript
// Function to fetch bot data using its ID
await manager.getBot(botId);
```

---

#### **Posting Bot Statistics**  

```javascript
// Function to update bot stats on Top.gg
await manager.postStats(botId, {
    server_count: 100,        // Total number of servers
    shards: [0, 1],           // Shard IDs
    shard_count: 2,           // Total number of shards
});
```

---

### **Handling Webhook Events**  

```javascript
// Listen for BotVote events when a user votes for your bot
manager.on('botVote', (vote) => {
    console.log(`User ${vote.userId} voted for bot ${vote.botId}`);
});

// Listen for GuildVote events when a user votes for a guild
manager.on('guildVote', (vote) => {
    console.log(`User ${vote.userId} voted for guild ${vote.guildId}`);
});
```

---

### **Handling Errors**
```javascript
manager.on('error', (error) => {
    console.error('Error:', error);
});
```

---

## **Available Events**  

```javascript
const { Events } = require('topgg-utils');
```

- **`Events.Ready`**: Triggered when the manager is ready.  
- **`Events.Error`**: Triggered when an error occurs.  
- **`Events.BotVote`**: Triggered when a user votes for a bot.  
- **`Events.GuildVote`**: Triggered when a user votes for a guild.  

---

## **Contributing**  

Contributions are welcome! Feel free to open issues, submit pull requests, and suggest new features.  
