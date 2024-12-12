const express = require('express');
const bodyParser = require('body-parser');
const { REST } = require('./REST.js');
const app = express();

/**
 * Manager class for handling votes from the top.gg API.
 */
exports.Manager = class Manager extends REST {
    
    /**
    * Creates a new instance of the Manager class.
    * @param {Object} options - Options for the constructor.
    * @param {string} options.token - Token for authentication.
    * @param {Object} [options.webhook] - Webhook configuration.
    */
    constructor({ token, webhook }) {
        super(token, webhook);
        if (webhook && webhook.port && typeof webhook === 'object') {
            this.#startEndpoint();
        };
    }

    /**
     * Starts the webhook endpoint.
     */
    #startEndpoint() {
        try {
            app.use(bodyParser.json());
            app.listen(this.port, () => this.emit('ready', this));
            app.post(this.endpoint, async (req, res) => {
                try {
                    const authHeader = req.header('Authorization');
                    if (!authHeader || authHeader !== this.authorization) {
                        return res.status(401).json({
                            code: 401,
                            message: 'Unauthorized'
                        });
                    };
                    let vote = req.body;
                    if (!vote) {
                        return res.status(400).json({
                            code: 400,
                            message: 'Bad Request'
                        });
                    };
                    let user;
                    if (this.token) user = await this.getUser(vote.user);
                    if (vote.bot) {
                        this.emit('botVote', {
                            user: user ? user : null,
                            userId: vote.user,
                            botId: vote.bot,
                            type: vote.type,
                            query: vote.query
                        });
                    } else if (vote.guild) {
                        this.emit('guildVote', {
                            user: user ? user : null,
                            guildId: vote.guild,
                            userId: vote.user,
                            type: vote.type,
                            query: vote.query
                        });
                    } else {
                        return res.status(400).json({
                            code: 400,
                            message: 'Bad Request'
                        });
                    }
                    res.status(200).json({ status: 200, message: 'OK' });;
                } catch (error) {
                    this.emit('error', error, this);
                    res.status(500).json({
                        code: 500,
                        message: 'Internal Server Error'
                    });
                }
            });
            app.use((error, req, res, next) => {
                this.emit('error', error, this);
                res.status(500).json({
                    code: 500,
                    message: 'Internal Server Error'
                });
            });
        } catch (error) {
            this.emit('error', error, this);
        }
    }

    /**
     * Sets the API token.
     * @param {string} token - The API token.
     * @returns {Manager} The Manager instance.
     */
    setToken(token) {
        if (typeof token !== 'string') {
            throw new Error('API Token is must be a string.');
        };
        
        this.token = token;
        return this;
    }

    /**
     * Sets the port number.
     * @param {number} port - The port number.
     * @returns {Manager} The Manager instance.
     */
    setPort(port) {
        if (isNaN(port)) {
            throw new Error('Port is must be a number. Please give a valid number.');
        };
        
        this.port = port;
        return this;
    }

    /**
     * Sets the endpoint URL.
     * @param {string} endpoint - The endpoint URL.
     * @returns {Manager} The Manager instance.
     */
    setEndpoint(endpoint) {
        if (typeof endpoint !== 'string') {
            throw new Error('Webhook endpoint is must me a string');
        };
        
        this.endpoint = endpoint;
        return this;
    }

    /**
     * Sets the authorization token.
     * @param {string} authorization - The authorization token.
     * @returns {Manager} The Manager instance.
     */
    setAuthorization(authorization) {
        if (typeof authorization !== 'string') {
            throw new Error('Authorization secret is must be a string');
        };
        
        this.authorization = authorization;
        return this;
    }
};
