const moduleAlias = require('module-alias');

moduleAlias.addAliases({
  '@base': __dirname + '/src',
  '@api': __dirname + '/src/api'
})