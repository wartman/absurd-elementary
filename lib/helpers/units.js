/**
 * Unit rendering
 */

var _ = require('lodash');

var Units = function(options){
  options = (options || {});
  this.options = _.defaults(options, this.options);
}

Units.prototype.options = {
  unitTypes: {
    px: /px/,
    rem: /rem/,
    em: /em/,
    percent: /\%/
  },
  bases: {
    rem: 16, // Set to the base font-size of your site.
    px: 960 // Set to the max width of your site.
  }
};

/**
 * Change options for an instace.
 *
 * @param {Object} options.
 */
Units.prototype.setup = function(options){
  this.options = _.defaults(options, this.options);
}

/**
 * Return the type of the current unit.
 *
 * @param {String | Integer} input
 * @return {String}
 */
Units.prototype.type = function(input){
  var type = 'none';
  if(_.isFinite(input)){
    return 'int';
  }
  if(!_.isString(input)){
    return 'none';
  }
  _(this.options.unitTypes).each(function(regExp, key){
    if(regExp.test(input)){
      type = key;
      return true;
    }
  });
  return type;
}

/**
 * Convert a unit.
 *
 * @param {String | Integer} input
 * @param {String} to
 * @return {String}
 */
Units.prototype.convert = function(input, to){
  var type = this.type(input);

  if(type === to){
    // No conversion required.
    return input;
  }

  input = this.strip(input);

  // Do conversion
  if(type === 'px' && to === 'percent') {
    return this.percent(input, this.options.bases.px);
  } else if (type === 'px' && to === 'rem'){
    return this.rem(input, this.options.bases.rem);
  } else if( type = 'int' ){
    if(to === 'px'){
      return this.px(input);
    }
    if(to === 'em'){
      return this.em(input);
    }
    if(to === 'rem'){
      return this.rem(input);
    }
  }

  // need more, but it's a start.
}

/**
 * Remove units from an input.
 *
 * @return {Integer}
 */
var _stripper = false;
Units.prototype.strip = function(input){
  if(_.isFinite(input)){
    return input;
  }

  if(!_stripper){
    _stripper = [];
    for ( var key in this.options.unitTypes ){
      if(this.options.unitTypes.hasOwnProperty(key)){
        _stripper.push(this.options.unitTypes[key]);
      }
    }
    _stripper = _stripper.join('|');
  }

  return input.replace(_stripper, '').trim('');
}

/**
 * Convert to px.
 *
 * @param {String | Integer} input
 * @return {String}
 */
Units.prototype.px = function(input){
  if(!_.isFinite(input)){
    return this.convert(input, 'px'); 
  }
  return input + 'px';
}

/**
 * Convert to rem.
 *
 * @param {String | Integer} input
 * @param {Integer} base
 * @return {String}
 */
Units.prototype.rem = function(input, base){
  base = (base || this.options.bases.rem);
  input = this.strip(input);
  var value = (input / base) * 100;
  return value + 'rem';
}

/**
 * Convert to em.
 *
 * @param {String | Integer} input
 * @return {String}
 */
Units.prototype.em = function(input){
  return input + 'em';
}

/**
 * Convert to percent.
 *
 * @param {String | Integer} input
 * @param {Integer} base
 * @return {String}
 */
Units.prototype.percent = function(input, base){
  input = this.strip(input);
  input = (base)? (input / base) * 100 : input;
  return input + '%';
}

var exports = module.exports = new Units();

exports.Units = Units;