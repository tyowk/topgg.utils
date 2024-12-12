/// <reference types="events" />

/**
 * Enum for different types of events.
 */
enum Events {
    Ready = 'ready',
    Error = 'error',
    BotVote = 'botVote',
    GuildVote = 'guildVote'
}

/**
 * Interface for webhook options.
 */
interface WebhookOptions {
    port: number;
    endpoint: string;
    authorization: string;
}

/**
 * Interface for a vote.
 */
interface Vote {
    user: string;
    bot?: string;
    guild?: string;
    isWeekend?: boolean;
    query?: string[];
    type: string;
}

/**
 * Interface for votes.
 */
interface Votes {
    username: string;
    id: string;
    avatar: string;
}

/**
 * Interface for a bot.
 */
interface Bot {
    defAvatar?: string;
    id: string;
    clientId: string;
    username: string;
    discriminator: string;
    avatar?: string;
    prefix: string;
    longdesc?: string;
    shortdesc: string;
    date: string;
    server_count?: number;
    shard_count?: number;
    tags: string[];
    website?: string;
    github?: string;
    support?: string;
    invite?: string;
    vanity?: string;
    guilds: string[];
    owners: string[];
    monthlyPoints: number;
    points: number;
    certifiedBot: boolean;
    donatebotguildid: string;
}

/**
 * Interface for social media links.
 */
interface Socials {
    youtube?: string;
    reddit?: string;
    instagram?: string;
    github?: string;
    twitter?: string;
}

/**
 * Interface for a user.
 */
interface User {
    discriminator: string;
    avatar?: string;
    id: string;
    username: string;
    defAvatar: string;
    admin: boolean;
    webMod: boolean;
    mod: boolean;
    certifiedDev: boolean;
    supporter: boolean;
    social: Socials;
    bio?: string;
    banner?: string;
    color?: string;
}

/**
 * Interface for bot statistics.
 */
interface GetStats {
    results: Bot[];
    limit: number;
    offset: number;
    count: number;
    total: number;
}

/**
 * Interface for bot statistics.
 */
interface Stats {
    server_count?: number;
    shards: number[];
    shard_count?: number;
}

/**
 * Interface for REST options.
 */
interface RESTOptions {
    token: string;
    webhook?: WebhookOptions;
}

/**
 * Interface for manager options.
 */
interface ManagerOptions {
    token?: string;
    webhook?: WebhookOptions;
}

/**
 * Interface for voted data.
 */
interface Voted {
    voted: number;
}

/**
 * Interface for the REST class.
 */
interface REST extends EventEmitter {
    token: string;
    authorization: string;
    port: number;
    endpoint: string;

    constructor(options: RESTOptions);

    getBots(limit?: number, offset?: number, sort?: string, fields?: string): Promise<GetStats | null>;
    getBot(id: string): Promise<Bot | null>;
    getUser(id: string): Promise<User | null>;
    getBotVotes(id: string): Promise<Votes[] | null>;
    getBotStats(id: string): Promise<Stats | null>;
    checkUser (id: string, userId: string): Promise<Voted | null>;
    postStats(id: string, stats: Stats): Promise<boolean>;
}

/**
 * Interface for the Manager class.
 */
interface Manager extends REST {
    constructor(options: ManagerOptions);

    #startEndpoint(): void;

    setToken(token: string): Manager;
    setPort(port: number): Manager;
    setEndpoint(endpoint: string): Manager;
    setAuthorization(authorization: string): Manager;
}

declare module './index' {
    export { Events };
    export class REST implements REST {}
    export class Manager extends REST implements Manager {}
}

declare module './Manager' {
    export class Manager extends REST implements Manager {}
}

declare module './REST' {
    export class REST implements REST {}
}

declare module './Events' {
    export { Events };
}
