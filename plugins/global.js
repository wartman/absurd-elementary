module.exports = function (api){
  
  api.add({
    // Use border box.
    '*, *:before, *:after': {
      boxSizing: 'border-box'
    },
    'img': { 
      maxWidth: '100%',
      'height': 'auto' 
    }
  });

}