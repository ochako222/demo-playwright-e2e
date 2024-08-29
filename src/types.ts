export type GlobalEnvironmentT = GlobalVariablesI & EnvironmentSettingsI;

export interface GlobalVariablesI {
    ENVIRONMENT: string;
    PROJECT: string;
    USER_PASSWORD: string;
    USER_EMAIL: string;
}

export interface EnvironmentSettingsI {
    baseUrl: string;
}

export interface ProcessEnv {
    [key: string]: string | undefined;
    ENVIRONMENT: string;
    PROJECT: string;
    USER_PASSWORD: string;
    USER_EMAIL: string;
}
