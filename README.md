# **Topgg Utils**

Topgg Utils is a Node.js library to interact with the Top.gg API. It helps you manage bot statistics, handle votes, and more with ease.

---

## **Installation**
```bash
npm install topgg.utils
```

---

## **Usage Guide**
### **Importing the Library**

Import the `Manager` class to interact with the API.

```javascript
const { Manager } = require('topgg.utils');
```

---

### **Creating a Manager Instance**

To use the Top.gg API, create a `Manager` instance with your API token and webhook settings.

```javascript
const manager = new Manager({
    token: 'YOUR_API_TOKEN', // Your Top.gg API token
    webhook: {
        port: 3000,               // Webhook port
        endpoint: '/webhook',     // Webhook endpoint
        authorization: 'YOUR_AUTH', // Webhook authorization
    }
});

// Log when the manager is ready
manager.on('ready', () => {
    console.log('Topgg.utils manager is ready!');
});
```

---

### **Fetching Bot Data**

To fetch information about your bot, use the `getBot` method.

```javascript
async function fetchBotData(botId) {
    const botData = await manager.getBot(botId);
    console.log(botData); // Logs bot data
}

fetchBotData('YOUR_BOT_ID');
```

---

### **Posting Bot Stats**

To update bot statistics, use the `postStats` method.

```javascript
async function updateBotStats(botId) {
    await manager.postStats(botId, {
        server_count: 100,        // Number of servers your bot is in
        shard_id: 0,              // Shard ID (if sharded)
        shard_count: 2,           // Total shards
    });
}

updateBotStats('YOUR_BOT_ID');
```

---

### **Handling Vote Events**

You can listen for vote events such as when users vote for your bot or guild.

#### **Bot Vote Event**

```javascript
manager.on('botVote', (vote) => {
    console.log(`User ${vote.userId} voted for bot ${vote.botId}`);
});
```

#### **Guild Vote Event**

```javascript
manager.on('guildVote', (vote) => {
    console.log(`User ${vote.userId} voted for guild ${vote.guildId}`);
});
```

---

### **Handling Errors**

To catch errors during interactions, use the `error` event:

```javascript
manager.on('error', (error) => {
    console.error('Error:', error);
});
```

---

## **Contributing**

Feel free to contribute by opening issues or submitting pull requests.

---

## **Conclusion**

Topgg Utils simplifies working with the Top.gg API, whether for updating stats or managing vote events. For more details, visit the [Topgg API documentation](https://docs.top.gg/docs).
