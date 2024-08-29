import { cleanEnv, str } from 'envalid';
import fs from 'fs';
import path from 'path';
import { ProcessEnv, GlobalVariablesI, EnvironmentSettingsI, GlobalEnvironmentT } from './types';

// Validate and sanitize global environment variables
const validateEnvironment = (globalVariables: ProcessEnv): GlobalVariablesI => {
    return cleanEnv(globalVariables, {
        ENVIRONMENT: str({
            choices: ['qa', 'prod']
        }),
        PROJECT: str({ choices: ['travelplanet-pl', 'invia-sk', 'invia-hu', 'invia-cz'] }),
        USER_PASSWORD: str(),
        USER_EMAIL: str()
    }) as GlobalVariablesI;
};

// Load JSON file and parse it
const loadJSONFile = <T>(filePath: string): T => {
    try {
        const rawdata = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(rawdata) as T;
    } catch (error) {
        console.error(`Failed to load or parse JSON file at ${filePath}:`, error);
        throw new Error(`Failed to load configuration from ${filePath}`);
    }
};

function globalSetup() {
    const { PROJECT, ENVIRONMENT } = process.env;

    // Validate and parse environment variables
    const env = validateEnvironment(process.env as ProcessEnv);

    const configPath = path.resolve('./configs', `${PROJECT}.settings.json`);
    const configSettings = loadJSONFile<EnvironmentSettingsI>(configPath);

    // Combine settings and global variables into one global environment object
    const globalEnv: GlobalEnvironmentT = {
        ...env,
        ...configSettings
    };

    // Store the combined configuration in an environment variables
    process.env.globalEnv = JSON.stringify(globalEnv);

    console.log('Global environment setup complete:');
    console.log('[PROJECT]>>> ', PROJECT);
    console.log('[ENVIRONMENT]>>> ', ENVIRONMENT);
    console.log('[LOADED SETTINGS FILE]>>> ', configSettings);
}

export default globalSetup;
