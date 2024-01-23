import * as Log from "../utils/log.util";

// class SecretsData {}

class Config {
    PORT = "9099";
    HOST = "http://localhost:9099";
    DYNAMODB_REGION = "us-west-2";
    DYNAMODB_TABLE_NAME = "PostTable";
}

// ============================= //
// Config Loader
// ============================= //

export const CONFIG_ENVS = {
    // lower case to match what Jest sets NODE_ENV to when running tests
    LOCAL: "local",
    TEST: "test",
    DEV: "dev",
    STG: "stg",
    PROD: "prod"
};

const CONFIG_ENV =
    process.env.NODE_ENV === CONFIG_ENVS.TEST
        ? CONFIG_ENVS.TEST
        : process.env.CONFIG_ENV ?? CONFIG_ENVS.LOCAL;

Log.info("CONFIG_ENV: ", CONFIG_ENV);

const Configurations: { [key: string]: () => Config } = {
    [CONFIG_ENVS.LOCAL]: () => ({
        ...new Config()
    }),
    [CONFIG_ENVS.TEST]: () => ({
        ...new Config(),
        ENV: CONFIG_ENVS.TEST
    }),
    [CONFIG_ENVS.DEV]: () => ({
        ...new Config(),
        ENV: CONFIG_ENVS.DEV,
        HOST: "https://dev-admin.sdp.samsungportals.com",
        MEDIA_BASE_URL: "https://d259avs8luta6c.cloudfront.net",
        PORT: "3000"
    }),
    [CONFIG_ENVS.STG]: () => ({
        ...new Config(),
        MEDIA_BASE_URL: "",
        ENV: CONFIG_ENVS.STG
    }),
    [CONFIG_ENVS.PROD]: () => ({
        ...new Config(),
        MEDIA_BASE_URL: "https://d3unf4s5rp9dfh.cloudfront.net",
        ENV: CONFIG_ENVS.PROD
    })
};

function LoadConfig(): Config {
    if (!Object.values(CONFIG_ENVS).includes(CONFIG_ENV)) {
        throw Error("Failed to load configuration for: " + CONFIG_ENV);
    }

    const config = Configurations[CONFIG_ENV]();

    // Override values with process.env
    for (const key in config) {
        const k = key as keyof Config;
        config[k] = process.env[k] ?? config[k];
    }

    return config;
}

// ========================== //
// Export
// ========================== //

const CONFIG = LoadConfig();

export { CONFIG };
