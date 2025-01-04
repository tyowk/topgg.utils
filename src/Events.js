/**
 * Event Enumerations
 *
 * This object defines a set of event names as string constants.
 * These events can be used to trigger specific actions or reactions
 * within the application.
 */

exports.Events = {
    /**
    * Fired when the application is ready and initialized.
    */
    Ready: 'ready',
    
    /**
    * Fired when an error occurs within the application.
    */
    Error: 'error',

    /**
    * Fired when a bot receives a vote.
    */
    BotVote: 'botVote',

    /**
    * Fired when a guild receives a vote.
    */
    GuildVote: 'guildVote'
};
