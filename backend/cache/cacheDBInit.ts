import { createClient } from "redis";
import { getRedisHost, getRedisPort, getRedisUrl } from "../utils/appConfig";

const host = getRedisHost();
const port = getRedisPort();
// const url = getRedisUrl();

const options: any = { host: host, port: port }; // for local server
// const options = { url: url };
export const cacheClient = createClient(options);
