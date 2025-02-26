import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import chalk from "chalk";

enum fileType {
  js = "js",
  ts = "ts",
}

const BASE_URL =
  "https://raw.githubusercontent.com/KaushalGupta49/MatomicUI/main/templates";

export async function addComponent(name: string, option: fileType) {
  const componentURL = `${BASE_URL}/${option}/${name}.${option === fileType.js ? "jsx" : "tsx"}`;

  const componentsDir = path.resolve(process.cwd(), "src/components");
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  const extension = option === fileType.js ? "jsx" : "tsx";
  const componentPath = path.join(componentsDir, `${name}.${extension}`);

  https
    .get(componentURL, (response) => {
      let data = "";

      if (response.statusCode === 200) {
        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          fs.writeFile(componentPath, data, (err) => {
            if (err) {
              console.error("Error writing to file:", err);
            } else {
              console.log(
                chalk.green(`Component ${name} created successfully...`)
              );
            }
          });
        });
      } else {
        console.error(`Error: Received status code ${response.statusCode}`);
      }
    })
    .on("error", (err) => {
      console.error("Error fetching data from URL:", err);
    });
}
