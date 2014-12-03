var grid = require('../../').grid;
var helpers = require('../../').helpers;
var breakpoint = require('../../').breakpoint;

var test = grid({
  columns: 12,
  gutter: 20,
  breakpoints: {
    small: '0',
    smallOnly: '0em/40em',
    medium: '40.063em',
    mediumOnly: '40.063em/64em',
    large: '64.063em',
    largeOnly: '64.063em/90em',
    unit: 'em'
  }
}, function(grid){

  var rules = {
    '.row': grid.row({
      behavior: 'collapse',
      rules:{
        '& .row': grid.row({behavior:'nest'})
      }
    })
  };

  ['small', 'medium', 'large'].forEach(function(size){
    for( var i = 1; i <= grid.options.columns; i +=1 ){
      var options = {};
      if(size !== 'small') {
        options.small = false;
      }
      options[size] = i;

      var column = rules['.' + size + '-' + i ] = grid.column(options)

      if(i === grid.options.columns && size === 'small'){
        column.extend(
          breakpoint(grid.options.breakpoints.smallOnly, {
            marginTop: '10px',
            ':first-child': {
              marginTop: 0
            }
          })
        )
      }
    }
  });

  return rules;

});

module.exports = test;