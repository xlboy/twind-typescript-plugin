import { version as pluginVersion } from '../package.json';
import { Logger } from './logger';
import { version as twindIntellisenseVersion } from '@twind/intellisense/package.json';
import fs from 'node:fs';
import path from 'node:path';
import type ts from 'typescript/lib/tsserverlibrary';

export { TwindPlugin };

class TwindPlugin implements ts.server.PluginModule {
  private readonly ts: typeof ts;
  private logger!: Logger;
  private projectDirPath!: string;

  constructor(_ts: typeof ts) {
    this.ts = _ts;
  }

  create(info: ts.server.PluginCreateInfo): ts.LanguageService {
    this.logger = new Logger(info);
    this.projectDirPath = path.dirname(info.project.getProjectName());

    this.logger.log(`Plugin version: ${pluginVersion}`);
    this.logger.log(`Twind intellisense version: ${twindIntellisenseVersion}`);
    this.logger.log(`Project path: ${this.projectDirPath}`);

    const languageServiceHostProxy = new Proxy(info.languageServiceHost, {
      get: (target, key: keyof ts.LanguageServiceHost) => {
        const proxyHandler: Partial<ts.LanguageServiceHost> = {};

        return proxyHandler[key] ?? target[key];
      },
    });

    const languageServiceProxy = new Proxy(this.ts.createLanguageService(languageServiceHostProxy), {
      get: (target, key: keyof ts.LanguageService) => {
        const proxyHandler: Partial<ts.LanguageService> = {
          getQuickInfoAtPosition: getQuickInfoAtPositionHandler.bind(this, target),
        };

        return proxyHandler[key] ?? target[key];
      },
    });

    return languageServiceProxy;

    function getQuickInfoAtPositionHandler(
      this: TwindPlugin,
      languageService: ts.LanguageService,
      filePath: string,
      position: number,
    ): ts.QuickInfo | undefined {
      const defaultQuickInfo = languageService.getQuickInfoAtPosition(filePath, position);
      debugger;
      return defaultQuickInfo;
    }
  }

  private utils = {};
}
