# **Topgg Utils**

Topgg Utils is a Node.js API wrapper designed for interacting with the Top.gg API. It simplifies the process of fetching bot and user data, managing statistics, and handling webhook events for votes.

---

## **Features**

- **Data Fetching:** Retrieve detailed bot, user, and voting data from Top.gg with ease.
- **Statistics Management:** Effortlessly post and update bot statistics to Top.gg.
- **Webhook Support:** Easily manage vote events through webhooks.
- **Event-Driven Architecture:** Respond to various events like bot votes, guild votes, and error handling in a streamlined manner.

---

## **Installation**

To install the Topgg Utils package, run the following command in your project directory:

```bash
npm install topgg.utils
```

---

## **Usage Guide**

### **Importing the Library**

Import the `Manager` class from the `topgg.utils` package to interact with the API.

```javascript
const { Manager } = require('topgg.utils');
```

---

### **Example: Creating a Bot Manager Instance**

To interact with the Top.gg API, you need to initialize a `Manager` instance with your API token and webhook configuration.

```javascript
// Initialize a new Manager instance
const manager = new Manager({
    token: 'YOUR_API_TOKEN',                // Your Top.gg API token
    webhook: {
        port: 3000,                         // Port for the webhook server
        endpoint: '/webhook',               // Webhook endpoint
        authorization: 'YOUR_WEBHOOK_AUTH', // Webhook authorization token
    }
});

// Listen to the 'ready' event when the manager is initialized
manager.on('ready', () => {
    console.log('Topgg.utils manager is ready!');
});
```

In this example:
- Replace `'YOUR_API_TOKEN'` with your actual Top.gg API token.
- Set a port for the webhook server to listen on (default is usually 3000).
- Set a webhook authorization token for secure webhook handling.

---

### **Fetching Bot Data**

You can retrieve information about your bot (using its ID) with the following code:

```javascript
// Function to fetch bot data using its ID
async function fetchBotData(botId) {
    const botData = await manager.getBot(botId);
    console.log(botData); // Logs the bot's data
}

// Example usage
fetchBotData('YOUR_BOT_ID');
```

This function will return various details about the bot, such as its name, description, server count, and more.

---

### **Posting Bot Statistics**

To keep your bot's statistics up-to-date on Top.gg, use the `postStats` method. This method takes the bot ID and an object containing the statistics.

```javascript
// Function to update bot stats on Top.gg
async function updateBotStats(botId) {
    await manager.postStats(botId, {
        server_count: 100,        // Total number of servers
        shards: [0, 1],           // Shard IDs (optional)
        shard_count: 2,           // Total number of shards
    });
}

// Example usage
updateBotStats('YOUR_BOT_ID');
```

In this example:
- `server_count` is the total number of servers your bot is in.
- `shards` is an array of shard IDs (if using sharding).
- `shard_count` is the total number of shards.

---

### **Handling Webhook Events**

The `Manager` class allows you to listen to events triggered by user votes. The most common events are `BotVote` and `GuildVote`.

#### **Bot Vote Event**

When a user votes for your bot, the `botVote` event is triggered.

```javascript
// Listen for BotVote events when a user votes for your bot
manager.on('botVote', (vote) => {
    console.log(`User ${vote.userId} voted for bot ${vote.botId}`);
});
```

#### **Guild Vote Event**

Similarly, when a user votes for a guild, the `guildVote` event is triggered.

```javascript
// Listen for GuildVote events when a user votes for a guild
manager.on('guildVote', (vote) => {
    console.log(`User ${vote.userId} voted for guild ${vote.guildId}`);
});
```

---

### **Handling Errors**

You can handle errors that might occur during API interactions or event handling.

```javascript
// Listen for errors
manager.on('error', (error) => {
    console.error('Error:', error);
});
```

This will log any errors that occur, such as issues with posting statistics or handling webhook requests.

---

## **Available Events**

The following events are available for you to listen to:

```javascript
const { Events } = require('topgg.utils');

// Event triggered when the manager is ready
manager.on(Events.Ready, () => {
    console.log('Manager is now ready!');
});

// Event triggered when a bot is voted for
manager.on(Events.BotVote, (vote) => {
    console.log(`User ${vote.userId} voted for bot ${vote.botId}`);
});

// Event triggered when a guild is voted for
manager.on(Events.GuildVote, (vote) => {
    console.log(`User ${vote.userId} voted for guild ${vote.guildId}`);
});

// Event triggered on errors
manager.on(Events.Error, (error) => {
    console.error('Error:', error);
});
```

---

## **Contributing**

Topgg Utils is an open-source project, and contributions are welcome! If you find any bugs or would like to suggest new features, feel free to:

- Open an issue in the repository
- Submit a pull request
- Suggest improvements or new ideas for features

To contribute, fork the repository, make changes, and submit a pull request for review.

---

## **Conclusion**

Topgg Utils provides a simple and efficient way to interact with the Top.gg API for managing bot statistics, handling votes, and reacting to events. Whether you are updating your bot’s statistics or managing vote events, Topgg Utils makes it easier to integrate Top.gg functionalities into your Node.js application.

For more detailed documentation and examples, refer to the official [Topgg API documentation](https://docs.top.gg/docs).
