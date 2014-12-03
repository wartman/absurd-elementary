var grid = require('./grid');

module.exports = function(api){

  api.import([
    __dirname + '/../../plugins/index.js'
  ]);

  api.add({
    '.column': {
      '.inner': {
        backgroundColor: '#ffffff',
        padding: '10px'
      }
    },
    'body': {
      backgroundColor: '#666666'
    }
  });

  api.add(grid);
  
}