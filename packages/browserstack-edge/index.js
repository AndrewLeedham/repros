const { Builder } = require("selenium-webdriver");
const { Type, Level, Preferences } = require("selenium-webdriver/lib/logging");
const { Local } = require("browserstack-local");
const path = require("path");
const { promisify } = require("util");
require("dotenv").config();

const username = process.env.BROWSER_STACK_USER;
const accessKey = process.env.BROWSER_STACK_KEY;

const capabilities = {
  build: "test",
  project: "repros",
  "browserstack.local": true,
  "browserstack.localIdentifier": "test",
  "browserstack.user": username,
  "browserstack.key": accessKey,
  os: "Windows",
  os_version: "10",
  browser: "Edge",
  browserName: "edge",
  browser_version: "18.0",
  browserVersion: "18.0",
  "browserstack.selenium_version": "3.5.2",
};

(async () => {
  local = new Local();
  await promisify(local.start).bind(local)({
    key: accessKey,
    f: path.join(__dirname, "./site"),
    onlyAutomate: "true",
    verbose: "true",
    localIdentifier: "test",
    forceLocal: "true",
  });

  const prefs = new Preferences();
  prefs.setLevel(Type.BROWSER, Level.SEVERE);
  const driver = new Builder()
    .setLoggingPrefs(prefs)
    .usingServer("http://hub-cloud.browserstack.com/wd/hub")
    .withCapabilities(capabilities)
    .build();
  try {
    await driver.get(`http://${username}.browserstack.com/index.html`);
    const body = `var callback = arguments[arguments.length - 1];
                document.addEventListener("xrx-fw-ready", callback);
                var script = document.createElement('script');
                script.src = './script.js';
                document.body.appendChild(script);`;

    await driver.executeAsyncScript(body);
  } catch (e) {
    console.error(e);
  } finally {
    await driver.quit();
    await promisify(local.stop).bind(local)();
  }
})();
