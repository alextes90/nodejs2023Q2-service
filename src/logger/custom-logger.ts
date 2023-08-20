/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService } from '@nestjs/common';
import { appendFile, stat, readdir } from 'node:fs/promises';
import * as path from 'path';

const helperFunc = async (
  fileName: string,
  FILE_SIZE: string,
  message: string,
) => {
  const files = await readdir(path.join(__dirname, 'logginFile'));
  const lastFile = files
    .filter((el) => el.match(fileName))
    .sort()
    .at(-1);
  let fileNumber = Number(lastFile?.split('.')[0].at(-1)) || 0;
  const fileSize = (
    await stat(path.join(__dirname, 'logginFile', lastFile || ''))
  ).size;

  if (Number(fileSize) > Number(FILE_SIZE)) {
    fileNumber++;
  }
  const pathToNewFile = path.join(
    __dirname,
    'logginFile',
    fileName + fileNumber + '.txt',
  );
  await appendFile(pathToNewFile, message);
};

export class CustomLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    this.writeToFile(message, 'log');
  }

  error(message: any, ...optionalParams: any[]) {
    this.writeToFile(message, 'error');
  }

  warn(message: any, ...optionalParams: any[]) {
    this.writeToFile(message, 'warn');
  }

  private async writeToFile(message: string, type: string) {
    const LEVEL_CHOOSEN = process.env.LOG_LEVEL;
    const FILE_SIZE = process.env.SIZE;

    if (
      LEVEL_CHOOSEN === 'LOG' &&
      (type === 'log' || type === 'warn' || type === 'error')
    ) {
      if (type === 'error') {
        await helperFunc('logger.error', FILE_SIZE || '5000', message);
      } else {
        await helperFunc('logger', FILE_SIZE || '5000', message);
      }
    } else if (
      LEVEL_CHOOSEN === 'WARN' &&
      (type === 'warn' || type === 'error')
    ) {
      if (type === 'error') {
        await helperFunc('logger.error', FILE_SIZE || '5000', message);
      } else {
        await helperFunc('logger', FILE_SIZE || '5000', message);
      }
    } else if (LEVEL_CHOOSEN === 'ERROR' && type === 'error') {
      await helperFunc('logger.error', FILE_SIZE || '5000', message);
    } else {
      console.log(message);
    }
  }
}
