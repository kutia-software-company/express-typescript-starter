import ModuleAlias from 'module-alias';

export function fixModuleAlias(dirName: string) {
  ModuleAlias.addAliases({
    '@base': dirName,
    '@api': dirName + '/api',
  });
}
