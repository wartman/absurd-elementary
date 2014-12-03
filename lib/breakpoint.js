/**
 * Helper for reactive stuff.
 */

var _ = require('lodash');
var element = require('./element');
var helpers = require('./helpers');

var Breakpoint = function(options){
  options = (options || {});
  this.options = _.defaults(options, this.options);
}

Breakpoint.prototype.setup = function(options){
  this.options = _.defaults(options, this.options);
}

/**
 * Change options for an instace.
 *
 * @param {Object} options.
 */
Breakpoint.prototype.options = {
  media: 'screen',
  unit: 'px'
};

/**
 * Create a new breakpoint.
 *
 * @param {String | Object} options Can be an object containing options OR
 *   a string with min/max values (seperated by a '/'). If the units used
 *   by the passed options don't match up with the set unit option this method
 *   will attempt to convert them.
 * @param {Object} rules Rules that will take effect for the current breakpoint.
 * @param {Boolean} makeElement (optional) Returns an element if true. Defaults to false.
 * @return {element | Object}
 */
var sep = /\/\s?/;
Breakpoint.prototype.make = function(options, rules, makeElement){

  makeElement = (makeElement === true)? true : false;

  if( _.isString(options) ){
    var scales = helpers.options.list(options, sep);
    options = {
      min: scales[0],
      max: (scales[1] || false)
    };
  } else if ( _.isFinite(options) ){
    var scale = options;
    options = {
      min: scale,
      max: false
    };
  }

  options = _.defaults(options, this.options);

  var styles = {};

  // Check unit types and convert if needed.
  ['min', 'max'].forEach(function(key){
    if(options[key]
      && helpers.units.type(options[key] !== options.unit)
    ){
      options[key] = helpers.units.convert(options[key], options.unit);
    }
  })

  styles[this.mediaQuery(options.media, options.min, options.max)] = rules;

  if(makeElement){
    return element(styles);
  }
  return styles;
}

/**
 * Parse values into a media query. If min or max are falsey they will be ignored.
 *
 * @param {String} media (optional)
 * @param {Mixed} min
 * @param {Mixed} max
 * @return {String}
 */
Breakpoint.prototype.mediaQuery = function(media, min, max){
  if(arguments.length <= 2){
    max = min;
    min = media;
    media = this.options.media;
  }

  var parsed = [];

  if(min) {
    parsed.push('(min-width: ' + min +')');
  }

  if(max && max !== '*') {
    parsed.push('(max-width: ' + max +')');
  }

  return '@media ' + media + ' and ' + parsed.join(' and ');
}


var breakpoint = new Breakpoint();

var exports = module.exports = breakpoint.make.bind(breakpoint);

exports.mediaQuery = breakpoint.mediaQuery.bind(breakpoint);
exports.setup = breakpoint.setup.bind(breakpoint);

exports.Breakpoint = Breakpoint;