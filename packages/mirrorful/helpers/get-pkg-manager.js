"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPkgManager = void 0;
function getPkgManager() {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent) {
        if (userAgent.startsWith("yarn")) {
            return "yarn";
        }
        else if (userAgent.startsWith("pnpm")) {
            return "pnpm";
        }
        else {
            return "npm";
        }
    }
    else {
        return "npm";
    }
}
exports.getPkgManager = getPkgManager;
