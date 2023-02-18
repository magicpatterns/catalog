#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = __importDefault(require("commander"));
const conf_1 = __importDefault(require("conf"));
const path_1 = __importDefault(require("path"));
const update_check_1 = __importDefault(require("update-check"));
const get_pkg_manager_1 = require("./helpers/get-pkg-manager");
const package_json_1 = __importDefault(require("./package.json"));
let projectPath = "";
const handleSigTerm = () => process.exit(0);
process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);
const onPromptState = (state) => {
    if (state.aborted) {
        // If we don't re-enable the terminal cursor before exiting
        // the program, the cursor will remain hidden
        process.stdout.write("\x1B[?25h");
        process.stdout.write("\n");
        process.exit(1);
    }
};
const program = new commander_1.default.Command(package_json_1.default.name)
    .version(package_json_1.default.version)
    .arguments("<project-directory>")
    .usage(`${chalk_1.default.green("<project-directory>")} [options]`)
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
        : (0, get_pkg_manager_1.getPkgManager)();
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const conf = new conf_1.default({ projectName: "mirrorful" });
        if (program.resetPreferences) {
            conf.clear();
            console.log(`Preferences reset successfully`);
            return;
        }
        if (typeof projectPath === "string") {
            projectPath = projectPath.trim();
        }
        if (!projectPath) {
            console.log("\nPlease specify the project directory:\n" +
                `  ${chalk_1.default.cyan(program.name())} ${chalk_1.default.green("<project-directory>")}\n` +
                "For example:\n" +
                `  ${chalk_1.default.cyan(program.name())} ${chalk_1.default.green("my-app")}\n\n` +
                `Run ${chalk_1.default.cyan(`${program.name()} --help`)} to see all options.`);
            process.exit(1);
        }
        const resolvedProjectPath = path_1.default.resolve(projectPath);
        const preferences = (conf.get("preferences") || {});
        try {
            console.log("Hello");
        }
        catch (reason) {
            console.error(reason);
        }
        conf.set("preferences", preferences);
    });
}
const update = (0, update_check_1.default)(package_json_1.default).catch(() => null);
function notifyUpdate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield update;
            if (res === null || res === void 0 ? void 0 : res.latest) {
                const updateMessage = packageManager === "yarn"
                    ? "yarn global add mirrorful"
                    : packageManager === "pnpm"
                        ? "pnpm add -g mirrorful"
                        : "npm i -g mirrorful";
                console.log(chalk_1.default.yellow.bold("A new version of `mirrorful` is available!") +
                    "\n" +
                    "You can update by running: " +
                    chalk_1.default.cyan(updateMessage) +
                    "\n");
            }
            process.exit();
        }
        catch (_a) {
            // ignore error
        }
    });
}
run()
    .then(notifyUpdate)
    .catch((reason) => __awaiter(void 0, void 0, void 0, function* () {
    console.log();
    console.log("Aborting installation.");
    if (reason.command) {
        console.log(`  ${chalk_1.default.cyan(reason.command)} has failed.`);
    }
    else {
        console.log(chalk_1.default.red("Unexpected error. Please report it as a bug:") + "\n", reason);
    }
    console.log();
    yield notifyUpdate();
    process.exit(1);
}));
