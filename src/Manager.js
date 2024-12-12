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
    * @param {string} options.webhook.authorization - Authorization token for the webhook.
    * @param {number} options.webhook.port - Port number for the webhook.
    * @param {string} [options.webhook.endpoint='/webhook'] - Endpoint for the webhook.
    */
    constructor({ token, webhook }) {
        super(token, webhook);
        if (webhook) this.#startEndpoint();
    }

    /**
     * Starts the webhook endpoint.
     */
    #startEndpoint() {
        try {
            app.use(bodyParser.json());
            app.listen(this.port, () => this.emit('ready', this));
            app.post(this.endpoint, (req, res) => {
                try {
                    const authHeader = req.header('Authorization');
                    if (!authHeader || authHeader !== this.authorization) {
                        return res.status(401).json({
                            code: 401,
                            message: 'Unauthorized'
                        });
                    };
                    const vote = req.body;
                    if (!vote) {
                        return res.status(400).json({
                            code: 400,
                            message: 'Bad Request'
                        });
                    };
                    if (vote.bot) {
                        this.emit('botVote', {
                            userId: vote.user,
                            botId: vote.bot,
                            isWeekend: vote.isWeekend,
                            type: vote.type
                        });
                    } else if (vote.guild) {
                        this.emit('guildVote', {
                            guildId: vote.guild,
                            userId: vote.user,
                            type: vote.type
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
        this.token = token;
        return this;
    }

    /**
     * Sets the port number.
     * @param {number} port - The port number.
     * @returns {Manager} The Manager instance.
     */
    setPort(port) {
        this.port = port;
        return this;
    }

    /**
     * Sets the endpoint URL.
     * @param {string} endpoint - The endpoint URL.
     * @returns {Manager} The Manager instance.
     */
    setEndpoint(endpoint) {
        this.endpoint = endpoint;
        return this;
    }

    /**
     * Sets the authorization token.
     * @param {string} authorization - The authorization token.
     * @returns {Manager} The Manager instance.
     */
    setAuthorization(authorization) {
        this.authorization = authorization;
        return this;
    }
};
