import { promises as fs } from "fs";

const main = async ([htmlFilename]) => {
  if (!htmlFilename) {
    return console.error("Usage: pnpm replace-env-html <html-filename>");
  }
  let html = await fs.readFile(htmlFilename, "utf8");
  // this is not perfectly compliant but this HTML will be simple
  const htmlKeys = html
    .split("<body ")[1]
    .split(">")[0]
    .split(" ")
    .filter((t) => t.startsWith("env-") && t.endsWith('=""'))
    .map((t) => t.slice(0, -3));
  htmlKeys.forEach((htmlKey) => {
    const envKey = htmlKey.slice(4).replace(/\-/g, "_").toUpperCase();
    html = html.replace(
      new RegExp(`${htmlKey}=""`, "g"),
      `${htmlKey}="${
        process.env[envKey] || process.env["VITE_" + envKey] || ""
      }"`
    );
  });
  await fs.writeFile(htmlFilename, html);
};

main(process.argv.slice(2)).catch(console.error);
