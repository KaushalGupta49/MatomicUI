import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { addComponent } from "./addComponent";

const program = new Command();

program
  .name("matomic")
  .version("1.0.0")
  .description("CLI for adding React components");

program
  .command("add <componentName>")
  .description("Add a new React component")
  .action(async (componentName) => {
    console.log(chalk.blue(`📥 Downloading ${componentName}...`));
    await addComponent(componentName);
  });

program.parse(process.argv);
