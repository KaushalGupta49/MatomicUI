import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import chalk from "chalk";

enum fileType {
  js = "js",
  ts = "ts",
}

const BASE_URL =
  "https://raw.githubusercontent.com/KaushalGupta49/AtomUI/main/templates";

export async function addComponent(name: string, option: fileType) {
  let componentURL = "";
  switch (option) {
    case fileType.js:
      componentURL = `${BASE_URL}/js/${name}.jsx`;
      break;
    case fileType.ts:
      componentURL = `${BASE_URL}/ts/${name}.tsx`;
      break;
    default:
      throw new Error(
        "❌ Invalid option type. Use '--type js' or '--type ts'."
      );
  }

  const componentsDir = path.resolve(process.cwd(), "src/components");
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir);
  }

  const componentPath = path.join(componentsDir, `${name}.tsx`);

  https
    .get(componentURL, (response) => {
      let data = "";
      console.log("statusCode:", response.statusCode);

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        fs.writeFile(componentPath, data, (err) => {
          if (err) {
            console.error("Error writing to file:", err);
          } else {
            console.log("Data written to file successfully.");
          }
        });
      });
    })
    .on("error", (err) => {
      console.error("Error fetching data from URL:", err);
    });
}
