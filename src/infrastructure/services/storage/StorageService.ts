import { fileSystemsConfig } from '@base/config/filesystems';
import { Service } from 'typedi';
import { LocalDisk } from './Providers/LocalDisk';

@Service()
export class StorageService {
  private disk: any;

  public constructor() {
    this.setDisk(fileSystemsConfig.defaultDisk);
  }

  public setDisk(disk: string) {
    switch (disk) {
      case 'local':
        this.disk = new LocalDisk();
        break;

      default:
        break;
    }

    return this;
  }

  public async put(filePath: string, content: string | Buffer, encoding?: string): Promise<void> {
    return await this.disk.put(filePath, content, encoding);
  }

  public createDirectory(dir: string): void {
    return this.disk.createDirectory(dir);
  }
}
