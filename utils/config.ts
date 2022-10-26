import { dotEnvConfig } from "../deps.ts";

const USER_URI = dotEnvConfig().USER_ID as string;
const TOKEN = dotEnvConfig().BEARER_TOKEN as string;
if (USER_URI === undefined) {
    throw new Error('USER_ID not set');
} else if (TOKEN === undefined) {
    throw new Error('BEARER_TOKEN not set');
}

export { USER_URI, TOKEN };