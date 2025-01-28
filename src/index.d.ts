/// <reference types="node" />
export interface WebhookOptions {
    port: number | undefined;
    endpoint: string | undefined;
    authorization: string | undefined;
}
export interface ManagerOptions {
    token: string;
    webhook?: WebhookOptions | undefined;
}
export interface StatsOptions {
    server_count?: number | number[] | undefined;
    shards?: number[] | undefined;
    shard_id?: number | undefined;
    shard_count?: number | undefined;
    shardCount?: number | number[] | undefined;
    shardId?: number | undefined;
    serverCount?: number | number[] | undefined;
}
/**
 * Event Enumerations
 *
 * This object defines a set of event names as string constants.
 * These events can be used to trigger specific actions or reactions
 * within the application.
 */
export declare enum Events {
    /**
    * Fired when the application is ready and initialized.
    */
    Ready = "ready",
    /**
    * Fired when an error occurs within the application.
    */
    Error = "error",
    /**
    * Fired when a bot receives a vote.
    */
    BotVote = "botVote",
    /**
    * Fired when a guild receives a vote.
    */
    GuildVote = "guildVote"
}
/**
 * Manager class for handling votes from the top.gg API.
 */
export declare class Manager extends REST {
    app: any;
    /**
    * Creates a new instance of the Manager class.
    * @param {Object} options - Options for the constructor.
    * @param {string} options.token - Token for authentication.
    * @param {Object} [options.webhook] - Webhook configuration.
    */
    constructor({ token, webhook }: ManagerOptions);
    /**
     * Starts the webhook endpoint.
     */
    private startEndpoint;
    /**
     * Sets the API token.
     * @param {string} token - The API token.
     * @returns {Manager} The Manager instance.
     */
    setToken(token: string): this;
    /**
     * Sets the port number.
     * @param {number} port - The port number.
     * @returns {Manager} The Manager instance.
     */
    setPort(port: number): this;
    /**
     * Sets the endpoint URL.
     * @param {string} endpoint - The endpoint URL.
     * @returns {Manager} The Manager instance.
     */
    setEndpoint(endpoint: string): this;
    /**
     * Sets the authorization token.
     * @param {string} authorization - The authorization token.
     * @returns {Manager} The Manager instance.
     */
    setAuthorization(authorization: string): this;
    /**
     * Emits an events
     * @param {string} event - The event name.
     * @retuns {Manager} The Manager instance.
     */
    emit(event: Events | string, ...args: any[]): boolean;
}
import EventEmitter from 'events';
/**
 * REST class for interacting with the top.gg API.
 */
export declare class REST extends EventEmitter {
    token: string;
    authorization?: string;
    endpoint?: string;
    port?: number;
    /**
     * Creates a new instance of the REST class.
     * @param {string} token - The API token for authentication.
     * @param {object} [webhook] - Top.gg vote webhook configuration.
     * @param {string} [webhook.authorization] - Authorization token for the webhook.
     * @param {number} [webhook.port] - Port number for the webhook.
     * @param {string} [webhook.endpoint='/webhook'] - Endpoint for the webhook.
     */
    constructor(token: string, webhook: WebhookOptions | undefined);
    /**
     * Retrieves a list of bots from the top.gg API.
     * @param {number} [limit=50] - The maximum number of bots to retrieve.
     * @param {number} [offset=0] - The offset for pagination.
     * @param {string} [sort] - The sorting criteria.
     * @param {string} [fields] - The fields to include in the response.
     * @returns {Promise<object|null>} The list of bots or null if the request fails.
     */
    getBots(limit: number | undefined, offset: number | undefined, sort: string, fields: string): Promise<any>;
    /**
     * Retrieves a bot from the top.gg API by ID.
     * @param {string} id - The ID of the bot to retrieve.
     * @returns {Promise<object|null>} The bot data or null if the request fails.
     */
    getBot(id: string): Promise<any>;
    /**
     * Retrieves a user from the top.gg API by ID.
     * @param {string} id - The ID of the user to retrieve.
     * @returns {Promise<object|null>} The user data or null if the request fails.
     */
    getUser(id: string): Promise<any>;
    /**
     * Retrieves the votes for a bot from the top.gg API.
     * @param {string} id - The ID of the bot to retrieve votes for.
     * @returns {Promise<object|null>} The vote data or null if the request fails.
     */
    getBotVotes(id: string): Promise<any>;
    /**
     * Retrieves the stats for a bot from the top.gg API.
     * @param {string} id - The ID of the bot to retrieve stats for.
     * @returns {Promise<object|null>} The stats data or null if the request fails.
     */
    getBotStats(id: string): Promise<any>;
    /**
     * Checks if a user has voted for a bot on the top.gg API.
     * @param {string} id - The ID of the bot to check votes for.
     * @param {string} userId - The ID of the user to check votes for.
     * @returns {Promise<object|null>} The vote data or null if the request fails.
     */
    checkUser(id: string, userId: string): Promise<any>;
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
    postStats(id: string, stats?: StatsOptions): Promise<boolean>;
}
