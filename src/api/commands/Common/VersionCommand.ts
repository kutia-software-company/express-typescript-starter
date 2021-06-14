import * as yargs from 'yargs';

export class VersionCommand implements yargs.CommandModule {
  command = 'version';
  describe = 'Prints Application version.';

  public async handler() {
    console.log(process.env.npm_package_version);
  }
}
