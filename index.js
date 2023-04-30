const puppeteer = require("puppeteer");
const fs = require("fs/promises");
require("dotenv").config();
async function start() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  // Set your own .env file API="<URL>"
  await page.goto(process.env.API);
  const body = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("body")).map(
      (x) => x.textContent
    );
  });
  await fs.writeFile("body.txt", body);
  await browser.close();
}

start();
