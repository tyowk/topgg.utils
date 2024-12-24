import EventEmitter from 'events';
import { REST } from './REST';
interface WebhookOptions {
    endpoint: string;
    authorization: string;
    port: number;
}
interface ManagerOptions {
    token: string;
    webhook: WebhookOptions;
}
interface Bot {
    defAvatar: string;
    id: string;
    clientId: string;
    username: string;
    discriminator: string;
    avatar: string;
    prefix: string;
    longdesc: string;
    shortdesc: string;
    date: string;
    server_count: number;
    shard_count: number;
    tags: string[];
    website: string;
    github: string;
    support: string;
    invite: string;
    vanity: string;
    guilds: string[];
    owners: string[];
    monthlyPoints: number;
    points: number;
    certifiedBot: boolean;
    donatebotguildid: string;
}
interface GetBots {
    results: Bot[];
    limit: number;
    offset: number;
    count: number;
    total: number;
}
interface Socials {
    youtube: string;
    reddit: string;
    instagram: string;
    github: string;
    twitter: string;
}
interface User {
    discriminator: string;
    avatar: string;
    id: string;
    username: string;
    defAvatar: string;
    admin: boolean;
    webMod: boolean;
    mod: boolean;
    certifiedDev: boolean;
    supporter: boolean;
    social: Socials;
    bio: string;
    banner: string;
    color: string;
}
interface Votes {
    username: string;
    id: string;
    avatar: string;
}
interface Stats {
    server_count: number[] | number;
    shards: number[] | undefined;
    shard_id: number | undefined;
    shard_count: number | undefined;
}
interface Voted {
    voted: number;
}
/**
 * REST class for interacting with the top.gg API.
 */
export declare class REST extends EventEmitter {
    private token;
    private authorization;
    private port;
    private endpoint;
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
    getBots(limit: number | undefined, offset: number | undefined, sort: string | undefined, fields: string | undefined): Promise<GetBots | null>;
    /**
     * Retrieves a bot from the top.gg API by ID.
     * @param {string} id - The ID of the bot to retrieve.
     * @returns {Promise<object|null>} The bot data or null if the request fails.
     */
    getBot(id: string): Promise<Bot | null>;
    /**
     * Retrieves a user from the top.gg API by ID.
     * @param {string} id - The ID of the user to retrieve.
     * @returns {Promise<object|null>} The user data or null if the request fails.
     */
    getUser(id: string): Promise<User | null>;
    /**
     * Retrieves the votes for a bot from the top.gg API.
     * @param {string} id - The ID of the bot to retrieve votes for.
     * @returns {Promise<object|null>} The vote data or null if the request fails.
     */
    getBotVotes(id: string): Promise<Votes | null>;
    /**
     * Retrieves the stats for a bot from the top.gg API.
     * @param {string} id - The ID of the bot to retrieve stats for.
     * @returns {Promise<object|null>} The stats data or null if the request fails.
     */
    getBotStats(id: string): Promise<Stats | null>;
    /**
     * Checks if a user has voted for a bot on the top.gg API.
     * @param {string} id - The ID of the bot to check votes for.
     * @param {string} userId - The ID of the user to check votes for.
     * @returns {Promise<object|null>} The vote data or null if the request fails.
     */
    checkUser(id: string, userId: string): Promise<Voted | null>;
    /**
     * Posts stats for a bot to the top.gg API.
     * @param {string} id - The ID of the bot to post stats for.
     * @param {object} stats - The stats data to post.
     * @param {number} stats.server_count - The server count.
     * @param {number} stats.shards - The number of shards.
     * @param {number} stats.shard_count - The shard count.
     * @returns {Promise<boolean>} The false response if the request fails.
     */
    postStats(id: string, stats: Stats): Promise<boolean>;
}
/**
 * Manager class for handling votes from the top.gg API.
 */
export declare class Manager extends REST {
    #private;
    private token;
    private authorization;
    private port;
    private endpoint;
    /**
    * Creates a new instance of the Manager class.
    * @param {Object} options - Options for the constructor.
    * @param {string} options.token - Token for authentication.
    * @param {Object} [options.webhook] - Webhook configuration.
    */
    constructor({ token, webhook }: ManagerOptions);
    /**
     * Sets the API token.
     * @param {string} token - The API token.
     * @returns {Manager} The Manager instance.
     */
    setToken(token: string): Manager;
    /**
     * Sets the port number.
     * @param {number} port - The port number.
     * @returns {Manager} The Manager instance.
     */
    setPort(port: number): Manager;
    /**
     * Sets the endpoint URL.
     * @param {string} endpoint - The endpoint URL.
     * @returns {Manager} The Manager instance.
     */
    setEndpoint(endpoint: string): Manager;
    /**
     * Sets the authorization token.
     * @param {string} authorization - The authorization token.
     * @returns {Manager} The Manager instance.
     */
    setAuthorization(authorization: string): Manager;
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
export {};
