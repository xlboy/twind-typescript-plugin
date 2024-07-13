// https://github.com/microsoft/TypeScript-wiki/blob/main/Getting-logs-from-TS-Server-in-VS-Code.md
// https://github.com/microsoft/TypeScript/wiki/Debugging-Language-Service-in-VS-Code

import { TwindPlugin } from './plugin';
import type tsModule from 'typescript/lib/tsserverlibrary';

const init: tsModule.server.PluginModuleFactory = module => new TwindPlugin(module.typescript);

// @ts-ignore
export = init;
