/* eslint-disable no-unused-vars */
// Eslint disable because types file

import { SlashCommandBuilder, Collection, AutocompleteInteraction, ChatInputCommandInteraction, ModalSubmitInteraction, CacheType, Events, Snowflake } from 'discord.js'
import mongoose from 'mongoose'

export interface SlashCommand {
    command: SlashCommandBuilder,
    execute: (interaction : ChatInputCommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    modal?: (interaction: ModalSubmitInteraction<CacheType>) => void,
    cooldown?: number // in seconds
}

interface GuildOptions {
    prefix: string,
}

export interface IGuild extends mongoose.Document {
    guildID: string,
    options: GuildOptions
    joinedAt: Date
}

export type GuildOption = keyof GuildOptions
export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (client, ...args?) => void
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN: string,
            BOT_ID: Snowflake,
            OWNER_ID: Snowflake,
            GUILD_ID: Snowflake,
            ALIVE_ROLE: Snowflake,
            DEAD_ROLE: Snowflake,
            MASTER_ROLE: Snowflake,
            BOT_ROLE: Snowflake,
            SYSTEM_CATEGORY: Snowflake,
            GRANDFATHER_CHANNEL: Snowflake,
            POSTGRES_PASSWORD: string,
        }
    }
}

declare module 'discord.js' {
    export interface Client {
        commands: Collection<string, SlashCommand>
        cooldowns: Collection<string, number>
    }
}