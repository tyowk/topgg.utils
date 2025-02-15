const axios = require('axios');
const EventEmitter = require('events');

/**
 * REST class for interacting with the top.gg API.
 */
exports.REST = class REST extends EventEmitter {
    
    /**
     * Creates a new instance of the REST class.
     * @param {string} token - The API token for authentication.
     * @param {object} [webhook] - Top.gg vote webhook configuration.
     * @param {string} [webhook.authorization] - Authorization token for the webhook.
     * @param {number} [webhook.port] - Port number for the webhook.
     * @param {string} [webhook.endpoint='/webhook'] - Endpoint for the webhook.
     */
    constructor(token, webhook) {
        super();
        this.token = token;
        if (webhook) {
            if (!webhook.authorization) {
                throw new Error('Webhook authorization token is required.');
            };
            if (!webhook.port || typeof webhook.port !== 'number' || webhook.port <= 0) {
                throw new Error('Webhook port must be a positive integer.');
            };
            
            this.authorization = webhook.authorization;
            this.endpoint = webhook.endpoint || '/webhook';
            this.port = webhook.port;
        };
    };

    /**
     * Retrieves a list of bots from the top.gg API.
     * @param {number} [limit=50] - The maximum number of bots to retrieve.
     * @param {number} [offset=0] - The offset for pagination.
     * @param {string} [sort] - The sorting criteria.
     * @param {string} [fields] - The fields to include in the response.
     * @returns {Promise<object|null>} The list of bots or null if the request fails.
     */
    async getBots(limit = 50, offset = 0, sort, fields) {
        if (!this.token) throw new Error('API token is required. Please provide a valid token');
        try {
            const res = await axios.get('https://top.gg/api/bots', {
                params: { limit: (limit > 500) ? 500 : limit, offset, sort, fields },
                timeout: 10000,
                validateStatus: () => true,
                headers: {
                    'Authorization': this.token,
                    'User-Agent': 'topgg.utils'
                }
            }).catch(error => { this.emit('error', error, this); return null; });
            if (res.status !== 200) return null
            return res.data;
        } catch (error) {
            this.emit('error', error, this);
            return null;
        }
    };

    /**
     * Retrieves a bot from the top.gg API by ID.
     * @param {string} id - The ID of the bot to retrieve.
     * @returns {Promise<object|null>} The bot data or null if the request fails.
     */
    async getBot(id) {
        if (!this.token) throw new Error('API token is required. Please provide a valid token');
        try {
            const res = await axios.get(`https://top.gg/api/bots/${id}`, {
                timeout: 10000,
                validateStatus: () => true,
                headers: {
                    'Authorization': this.token,
                    'User-Agent': 'topgg.utils'
                }
            }).catch(error => { this.emit('error', error, this); return null; });
            if (res.status !== 200) return null
            return res.data;
        } catch (error) {
            this.emit('error', error, this);
            return null;
        }
    };

    /**
     * Retrieves a user from the top.gg API by ID.
     * @param {string} id - The ID of the user to retrieve.
     * @returns {Promise<object|null>} The user data or null if the request fails.
     */
    async getUser(id) {
        if (!this.token) throw new Error('API token is required. Please provide a valid token');
        try {
            const res = await axios.get(`https://top.gg/api/users/${id}`, {
                timeout: 10000,
                validateStatus: () => true,
                headers: {
                    'Authorization': this.token,
                    'User-Agent': 'topgg.utils'
                }
            }).catch(error => { this.emit('error', error, this); return null; });
            if (res.status !== 200) return null
            return res.data;
        } catch (error) {
            this.emit('error', error, this);
            return null;
        }
    };

    /**
     * Retrieves the votes for a bot from the top.gg API.
     * @param {string} id - The ID of the bot to retrieve votes for.
     * @returns {Promise<object|null>} The vote data or null if the request fails.
     */
    async getBotVotes(id) {
        if (!this.token) throw new Error('API token is required. Please provide a valid token');
        try {
            const res = await axios.get(`https://top.gg/api/bots/${id}/votes`, {
                timeout: 10000,
                validateStatus: () => true,
                headers: {
                    'Authorization': this.token,
                    'User-Agent': 'topgg.utils'
                }
            }).catch(error => { this.emit('error', error, this); return null; });
            if (res.status !== 200) return null
            return res.data;
        } catch (error) {
            this.emit('error', error, this);
            return null;
        }
    };

    /**
     * Retrieves the stats for a bot from the top.gg API.
     * @param {string} id - The ID of the bot to retrieve stats for.
     * @returns {Promise<object|null>} The stats data or null if the request fails.
     */
    async getBotStats(id) {
        if (!this.token) throw new Error('API token is required. Please provide a valid token');
        try {
            const res = await axios.get(`https://top.gg/api/bots/${id}/stats`, {
                timeout: 10000,
                validateStatus: () => true,
                headers: {
                    'Authorization': this.token,
                    'User-Agent': 'topgg.utils'
                }
            }).catch(error => { this.emit('error', error, this); return null; });
            if (res.status !== 200) return null
            return res.data;
        } catch (error) {
            this.emit('error', error, this);
            return null;
        }
    };

    /**
     * Checks if a user has voted for a bot on the top.gg API.
     * @param {string} id - The ID of the bot to check votes for.
     * @param {string} userId - The ID of the user to check votes for.
     * @returns {Promise<object|null>} The vote data or null if the request fails.
     */
    async checkUser(id, userId) {
        if (!this.token) throw new Error('API token is required. Please provide a valid token');
        try {
            const res = await axios.get(`https://top.gg/api/bots/${id}/check?userId=${userId}`, {
                timeout: 10000,
                validateStatus: () => true,
                headers: {
                    'Authorization': this.token,
                    'User-Agent': 'topgg.utils'
                }
            }).catch(error => { this.emit('error', error, this); return null; });
            if (res.status !==  200) return null
            return res.data;
        } catch (error) {
            this.emit('error', error, this);
            return null;
        }
    };

    /**
     * Posts stats for a bot to the top.gg API.
     * @param {string} id - The ID of the bot to post stats for.
     * @param {object} stats - The stats data to post.
     * @param {number} stats.server_count - The server count.
     * @param {number} stats.shard_id - The ID of shard.
     * @param {number} stats.shard_count - The shard count.
     * @param {number[]} stats.shards - The array of shards
     * @returns {Promise<boolean>} The false response if the request fails.
     */
    async postStats(id, stats = {}) {
        if (!this.token) throw new Error('API token is required. Please provide a valid token');
        try {
            if (typeof stats !== 'object' || !stats.serverCount && !stats.server_count)
                throw new Error('Invalid body provided');

            const res = await axios.post(`https://top.gg/api/bots/${id}/stats`, {
                server_count: stats.serverCount || stats.server_count,
                shard_id: stats.shardId || stats.shard_id,
                shard_count: stats.shardCount || stats.shard_count,
                shards: stats.shards
            },{
                timeout: 10000,
                validateStatus: () => true,
                headers: {
                    'Authorization': this.token,
                    'User-Agent': 'topgg.utils'
                }
            }).catch(error => { this.emit('error', error, this); return false });
            if (res.status !== 200) return false;
            return true;
        } catch (error) {
            this.emit('error', error, this);
            return false;
        }
    };
};
