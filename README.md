# Manor Of Phantasmagoria

This is a discord bot that runs the Manor Of Phantasmagoria (MoP) game in the MoP discord server.

Uses [discordjs-v14-template-ts](https://github.com/MericcaN41/discordjs-v14-template-ts.git) by [MericcaN41](https://github.com/MericcaN41)

# Testing

I would like to get relatively high coverage of testing on this project but Discord.js is a menace to mock since it is completely OOP. Therefore, my aim with this project is to write functionally and minimize all interaction with Discord.js in functions that do anything else. This allows most of the program to be testable without mocking Discord.js. After finishing the first versions of the bot and having high coverage I may attempt to write some integration tests with Discord.js