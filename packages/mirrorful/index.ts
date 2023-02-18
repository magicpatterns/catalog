#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */
import chalk from "chalk";
import Commander from "commander";
import Conf from "conf";
import path from "path";
import checkForUpdate from "update-check";
import { getPkgManager } from "./helpers/get-pkg-manager";
import { validateNpmName } from "./helpers/validate-pkg";
import packageJson from "./package.json";
import fs from "fs";

let projectPath: string = "";

const handleSigTerm = () => process.exit(0);

process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

const onPromptState = (state: any) => {
  if (state.aborted) {
    // If we don't re-enable the terminal cursor before exiting
    // the program, the cursor will remain hidden
    process.stdout.write("\x1B[?25h");
    process.stdout.write("\n");
    process.exit(1);
  }
};

const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action((name) => {
    projectPath = name;
  })
  //   .option(
  //     "--ts, --typescript",
  //     `
  //   Print hello world
  // `
  //   )
  .allowUnknownOption()
  .parse(process.argv);

const packageManager = !!program.useNpm
  ? "npm"
  : !!program.usePnpm
  ? "pnpm"
  : getPkgManager();

async function run(): Promise<void> {
  const conf = new Conf({ projectName: "mirrorful" });

  if (program.resetPreferences) {
    conf.clear();
    console.log(`Preferences reset successfully`);
    return;
  }

  if (typeof projectPath === "string") {
    projectPath = projectPath.trim();
  }

  if (!projectPath) {
    console.log(
      "\nPlease specify the project directory:\n" +
        `  ${chalk.cyan(program.name())} ${chalk.green(
          "<project-directory>"
        )}\n` +
        "For example:\n" +
        `  ${chalk.cyan(program.name())} ${chalk.green("my-app")}\n\n` +
        `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);

  const preferences = (conf.get("preferences") || {}) as Record<
    string,
    boolean | string
  >;

  try {
    console.log("Hello");
  } catch (reason) {
    console.error(reason);
  }
  conf.set("preferences", preferences);
}

const update = checkForUpdate(packageJson).catch(() => null);

async function notifyUpdate(): Promise<void> {
  try {
    const res = await update;
    if (res?.latest) {
      const updateMessage =
        packageManager === "yarn"
          ? "yarn global add mirrorful"
          : packageManager === "pnpm"
          ? "pnpm add -g mirrorful"
          : "npm i -g mirrorful";

      console.log(
        chalk.yellow.bold("A new version of `mirrorful` is available!") +
          "\n" +
          "You can update by running: " +
          chalk.cyan(updateMessage) +
          "\n"
      );
    }
    process.exit();
  } catch {
    // ignore error
  }
}

run()
  .then(notifyUpdate)
  .catch(async (reason) => {
    console.log();
    console.log("Aborting installation.");
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`);
    } else {
      console.log(
        chalk.red("Unexpected error. Please report it as a bug:") + "\n",
        reason
      );
    }
    console.log();

    await notifyUpdate();

    process.exit(1);
  });
