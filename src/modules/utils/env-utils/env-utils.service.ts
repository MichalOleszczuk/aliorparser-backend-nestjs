import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { IEnvDirPathParams } from './interfaces';

@Injectable()
export class EnvUtilsService {
  static envDirPath(
    { files, customPath }: IEnvDirPathParams = { customPath: process.cwd() },
  ) {
    if (path.isAbsolute(customPath)) {
      const envFileNames = fs
        .readdirSync(customPath)
        .filter(fileName =>
          !!files
            ? files.includes(fileName) && /^.env/.test(fileName)
            : /^.env/.test(fileName),
        );

      return envFileNames;
    } else {
      const envFileNames = fs
        .readdirSync(path.resolve(process.cwd(), customPath))
        .filter(fileName =>
          !!files
            ? files.includes(fileName) && /^.env/.test(fileName)
            : /^.env/.test(fileName),
        );

      return envFileNames;
    }
  }
}
