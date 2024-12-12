/// <reference types="events" />

enum Events {
    Ready = 'ready',
    Error = 'error',
    BotVote = 'botVote',
    GuildVote = 'guildVote'
}

interface WebhookOptions {
    port: number;
    endpoint: string;
    authorization: string;
}

interface Vote {
    user: string;
    bot?: string;
    guild?: string;
    isWeekend?: boolean;
    query?: string[];
    type: string;
}

interface Votes {
    username: string;
    id: string;
    avatar: string;
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
      guilds: string[];
      owners: string[];
      monthlyPoints: number;
      points: number;
      certifiedBot: boolean;
      donatebotguildid: string;
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
    bio?: string;
    banner?: string;
    color?: string;
}

interface GetStats {
    results: Bot[];
    limit: number;
    offset: number;
    count: number,
    total: number
}

interface Stats {
    server_count: number;
    shards: number[];
    shard_count: number;
}

interface RESTOptions {
    token: string;
    webhook?: WebhookOptions;
}

interface ManagerOptions {
    token: string;
    webhook?: WebhookOptions;
}

interface Voted {
    voted: number;
}

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

interface Manager extends REST {
    constructor(options: ManagerOptions);
    #startEndpoint(): void;
    setToken(token: string): Manager;
    setPort(port: number): Manager;
    setEndpoint(endpoint: string): Manager;
    setAuthorization(authorization: string): Manager;
}

declare module './index' {
    export const Events: typeof Events;
    export class REST implements REST {}
    export class Manager extends REST implements Manager {}
}
