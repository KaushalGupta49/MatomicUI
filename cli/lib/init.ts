import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import chalk from "chalk";

export async function installDependencies(
  items: string[] = ["react", "react-dom", "class-variance-authority"]
) {
  const missingDependencies = items.filter(
    (item, index) => !checkDependencies(items)[index]
  );

  if (missingDependencies.length > 0) {
    console.log(
      chalk.yellow(
        `Installing missing dependencies: ${missingDependencies.join(", ")}`
      )
    );
    execSync(`npm install ${missingDependencies.join(" ")}`, {
      stdio: "inherit",
    });
  } else {
    console.log(chalk.green("All dependencies are already installed."));
  }
}

function checkDependencies(items: string[]): boolean[] {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const packageJsonPath = path.resolve(__dirname, "../package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  return items.map((item) => item in dependencies);
}
