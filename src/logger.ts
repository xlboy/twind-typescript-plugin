import { name as pluginName } from '../package.json';
import type ts from 'typescript/lib/tsserverlibrary';

export class Logger {
  constructor(private readonly info: ts.server.PluginCreateInfo) {}

  log(message: string) {
    this.info.project.projectService.logger.info(`[${pluginName}] ${message}`);
  }

  error(message: string) {
    this.info.project.projectService.logger.info(`[${pluginName}] Error: ${message}`);
  }
}
