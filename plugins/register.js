var _ = require('lodash');
var elementary = require('../');

/**
 * Register elementary as Absurd API methods.
 *
 * This should provide an easier way of handling globals.
 */
module.exports = function(api){

  api.storage('breakpoints', {});
  api.storage('grid', {});
  api.storage('units', {});

  /**
   * Config is just an alias for some api.storage stuff.
   */
  api.register('config', function(key, val){
    if(val){
      api.storage(key, val);
    }
    return (api.storage(key) || {});
  });

  api.register('element', function(rules){
    return elementary.element(rules);
  });

  api.register('helpers', function(){
    elementary.helpers.units.setup(api.config('units'));
    return elementary.helpers;
  });

  api.register('grid', function(options, cb){

    if(arguments.length <= 1){
      cb = options;
      options = false;
    }

    var defaults = api.config('grid');
    defaults.breakpoints = (defaults.breakpoints || api.config('breakpoints'));
    options = options? _.defaults(options, defaults) : defaults;

    return elementary.grid(options, cb);

  });

  api.register('breakpoint', function(options, rules, makeElement){

    elementary.breakpoint.setup(api.config('breakpoints'));
    return elementary.breakpoint(options, rules, makeElement);

  });

}