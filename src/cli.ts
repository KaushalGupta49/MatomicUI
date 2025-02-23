import { Command } from "commander";
import chalk from "chalk";
import { addComponent } from "./addComponent";

const program = new Command();

program
  .name("matomic")
  .version("1.0.0")
  .description("CLI for adding React components");

program
  .command("add <componentName>")
  .description("Add a new React component in Project")
  .option("--type <type>", "defines to download jsx or tsx file", "js")
  .action(async (componentName, options) => {
    console.log(
      chalk.blue(`📥 Downloading ${componentName} as ${options.type}...`)
    );
    await addComponent(componentName, options.type);
  });

program.parse(process.argv);
