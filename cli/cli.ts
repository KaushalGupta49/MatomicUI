import { Command } from "commander";
import chalk from "chalk";
import { addComponent } from "./lib/addComponent";
import { installDependencies } from "./lib/init";

const program = new Command();

program
  .name("matomic")
  .version("1.0.0")
  .description("CLI for adding React components");

program
  .command("init")
  .description("Initialize the project and install dependencies")
  .action(async () => {
    console.log(chalk.blue("🔧 Initializing project and installing dependencies..."));
    await installDependencies();
    console.log(chalk.green("✅ Project initialized and dependencies installed."));
  });

program
  .command("add <componentName>")
  .description("Add a new React component in Project")
  .option("--type <type>", "defines to download jsx or tsx file", "js")
  .action(async (componentName, options) => {
    const validTypes = ["js", "ts"];
    if (!validTypes.includes(options.type)) {
      console.error(
        chalk.red(`❌ Invalid type: ${options.type}. Please use 'js' or 'ts'.`)
      );
      process.exit(1);
    }
    console.log(
      chalk.blue(`📥 Downloading ${componentName} as ${options.type}...`)
    );
    await addComponent(componentName, options.type);
  });

program.parse(process.argv);
