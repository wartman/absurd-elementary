module.exports = function (api){
  
  api.add({
    // Use border box.
    '*, *:before, *:after': {
      '-wmso-box-sizing': 'border-box',
      boxSizing: 'border-box'
    },
    'img': { 
      maxWidth: '100%',
      'height': 'auto' 
    }
  });

}