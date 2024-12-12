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
    type: string;
}

interface Bot {
      id: string;
      username: string;
      discriminator: string;
      avatar: string;
      prefix: string;
      library: string;
      description: string;
      tags: string[];
      website: string;
      github: string;
      support: string;
      invite: string;
      owners: string[];
      votes: number;
      servers: number;
      shards: number;
      shardCount: number;
}

interface Stats {
    serverCount: number;
    shards: number;
    shardCount: number;
}

interface RESTOptions {
    token: string;
    webhook?: WebhookOptions;
}

interface ManagerOptions {
    token: string;
    webhook?: WebhookOptions;
}

interface REST extends EventEmitter {
    token: string;
    authorization: string;
    port: number;
    endpoint: string;
    constructor(options: RESTOptions);
    getBots(limit?: number, offset?: number, sort?: string, fields?: string): Promise<Bot[] | null>;
    getBot(id: string): Promise<Bot | null>;
    getBotVotes(id: string): Promise<Vote[] | null>;
    getBotStats(id: string): Promise<Stats | null>;
    checkUser (id: string, userId: string): Promise<Vote | null>;
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
