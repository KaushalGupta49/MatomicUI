import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import chalk from "chalk";

export async function addComponent(name: string) {
  const componentURL = `https://raw.githubusercontent.com/Chensokheng/supa-auth/master/components/auth/signup.tsx`;

  const componentsDir = path.resolve(process.cwd(), "components");
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir);
  }

  const componentPath = path.join(componentsDir, `${name}.tsx`);

  https
    .get(componentURL, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        fs.writeFile("signup.tsx", data, (err) => {
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
