#!/usr/bin/env node

class Cli {
    command1() {
        console.log('Command 1');
    }
}

let cli = new Cli();

let yargs = require('yargs')
    .usage("Usage: cli <command> [options]")
    .command("command1", "Command 1 description", yargs => cli.command1())
    .demandCommand(1, "Please provide a valid command.")
    .help("help")
    .alias("help", "h");

yargs.$0 = '';
var argv = yargs.argv;

