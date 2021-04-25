import { fileSystemsConfig } from '@base/config/filesystems';
import { Service } from 'typedi';
import { LocalDisk } from './Providers/LocalDisk';

@Service()
export class StorageService {
  private disk: any;

  public constructor() {
    switch (fileSystemsConfig.defaultDisk) {
      default:
        this.disk = new LocalDisk();
        break;
    }
  }

  public async put(filePath: string, content: string | Buffer, encoding?: string): Promise<void> {
    return await this.disk.put(filePath, content);
  }

  public createDirectory(dir: string): void {
    return this.disk.createDirectory(dir);
  }
}
