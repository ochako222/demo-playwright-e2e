export type ProjectsT = 'travelplanet-pl' | 'invia-sk' | 'invia-hu' | 'invia-cz';

export type GlobalEnvironmentT = GlobalVariablesI & EnvironmentSettingsI;

export interface GlobalVariablesI {
    ENVIRONMENT: string;
    PROJECT: ProjectsT;
}

export interface EnvironmentSettingsI {
    baseUrl: string;
}

export interface ProcessEnv {
    [key: string]: string | undefined;
    ENVIRONMENT: string;
    PROJECT: ProjectsT;
}
