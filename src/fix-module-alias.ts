import ModuleAlias from 'module-alias';

export function fixModuleAlias() {
  ModuleAlias.addAliases({
    '@base': __dirname,
    '@api': __dirname + '/api',
  });
}
