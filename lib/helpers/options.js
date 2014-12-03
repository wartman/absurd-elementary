/**
 * Helpers for parsing options.
 */
var _ = require('lodash');

var options = {};

/**
 * Parse a list of options.
 * Basically an alias for String.prototype.split, but has a default
 * setting for the sep.
 * 
 * @param {String} str
 * @param {String | RegExp} sep (optional) Defaults to ', '. 
 * @return {Array}
 */
options.list = function(str, sep){
  sep = (sep || /, ?/);
  return str.split(sep);
}

/**
 * Parse an associative list into an object.
 *
 * @param {String} str
 * @param {Object} options (optional)
 * @return {Object}
 */
options.assoc = function(str, options){
  options = _.defaults({
    pairSep: /, ?/,
    keySep: /\: ?/
  }, options);

  var obj = {};

  str = str.split(options.pairSep);

  str.forEach(function(pair){
    pair = pair.split(options.keySep);
    obj[pair[0]] = pair[1];
  });

  return obj;
}

module.exports = options;