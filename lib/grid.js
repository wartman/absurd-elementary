/**
 * Elementry's grid system.
 *
 * Based closely on Foundation's stystem.
 */

var _ = require('lodash');
var element = require('./element');
var helpers = require('./helpers');
var breakpoint = require('./breakpoint');

/**
 * ---
 * Helpers
 */
var _span = function(num, of){
  return helpers.units.percent(num, of);
}

var Grid = function(options){
  options = (options || {});
  this.options = _.defaults(options, this.options);
}

Grid.prototype.options = {
  columns: 12,
  gutter: 10,
  maxWidth: 960,
  breakpoints: {
    small: '0',
    medium: '350px/700px',
    large: '700px',
    unit: 'px'
  },
  unitConverter: helpers.units.px
};

/**
 * Create a row.
 *
 * @example:
 *  grid.row({
 *    behavior: 'collapse' // will render with no margins/padding
 *  })
 *
 * @param {Object} options
 * @return {element}
 */
Grid.prototype.row = function(options){
  var options = _.defaults(options, this.options)
    , behavior = options.behavior
    , extend = false
    , row = {};

  if(behavior === 'nest'){
    row.width = 'auto';
    row.marginLeft = '-' + options.unitConverter(options.gutter / 2);
    row.marginRight = '-' + options.unitConverter(options.gutter / 2);
    row.marginTop = 0;
    row.marginBottom = 0;
  } else if (behavior === 'collapse') {
    row.width = '100%';
    row.margin = 0;
  } else if (behavior === 'nest-collapse'){
    row.width = 'auto';
    row.margin = 0;
    row.maxWidth = 'none';
  } else {
    row.width = '100%';
    row.maxWidth = options.unitConverter(options.maxWidth);
    row.marginLeft = 'auto';
    row.marginRight = 'auto';
    row.marginTop = 0;
    row.marginBottom = 0;
  }

  row.cf = 'all';

  // Check for additional styles.
  if(options.rules){
    extend = options.rules;
    delete options.rules;
  }

  row = element(row);

  if(extend){
    row = row.extend(extend);
  }

  return row;
}

/**
 * Create a column.
 *
 * @example:
 *   grid.column({
 *      small:12, // Column span for the small query selector.
 *      medium: '6, only', // Pass 'only' to limit the breakpoint. You'll need to provide
 *                         // `<size>Only` breakpoints in the options for this to work.
 *                         // (for example, `mediumOnly: '350px/700px'`)
 *      large: 2,
 *      columns: 12 // Default number of columns can be overridden here.
 *   });
 * 
 * @param {Object} options
 * @return {element}
 */
Grid.prototype.column = function(options){

  var options = _.defaults(options, {
      small: this.options.columns, // Defaults to full-width.
      medium: false,
      large: false,
    }, this.options)
    , behavior = (options.behavior || options.behavior === false)? options.behavior : 'no-collapse' 
    , extend = false
    , column = {};

  if(options.push || options.pull) {
    column.position = 'relative';
  }

  // Set the behavior.
  // Set behavior to 'false' to do nothing.
  if(behavior === 'collapse') {
    column.paddingLeft = 0;
    column.paddingRight = 0;
  } else if ( behavior === 'no-collapse' ){
    column.paddingLeft = options.unitConverter(options.gutter / 2);
    column.paddingRight = options.unitConverter(options.gutter / 2);
  }

  if(options.push){
    column.left = _span(options.push, options.columns);
    column.right = 'auto';
  }
  if(options.pull){
    column.right = _span(options.pull, options.columns);
    column.left = 'auto'; 
  }

  if(options.center){
    column.marginLeft = 'auto';
    column.marginRight = 'auto';
    column.float = 'none !important';
  } else {
    column.float = 'left';
  }

  if(options.offset){
    column.marginLeft = _span(options.offset, options.columns) + ' !important';
  }

  // Check for additional styles.
  if(options.rules){
    extend = options.rules;
    delete options.rules;
  }

  column = element(column);

  if(extend){
    column = column.extend(extend);
  }

  // Do breakpoint calculation.
  breakpoint.setup({
    unit: options.breakpoints.unit
  });

  _(['small', 'medium', 'large']).each(function(size){
    if(options[size]){
      var span = options[size]
        , breaker = options.breakpoints[size];

      if(!_.isFinite(span) && span !== false){
        var settings = helpers.options.list(span);
        span = settings[0].trim();
        if(settings[1] === 'only' && options.hasOwnProperty(size + 'Only')){
          breaker = options.breakpoints[size + 'Only'];
        }
      }

      column = column.extend( breakpoint(breaker, {
        width: _span(span, options.columns)
      }) );
    }
  });

  return column;
}

/**
 * Export API
 */

/**
 * The prefered way to define a grid.
 *
 * @example:
 *  grid({
 *    columns:12,
 *    unitConverter: helpers.units.px  
 *  }, function(grid){
 *    return {
 *      '.row': grid.row(),
 *      '.column-half': grid.column({
 *         small: 6
 *      })
 *    };
 *  });
 *
 * @param {Object} options
 * @param {Function} factory
 * @return {Object}
 */
var exports = module.exports = function(options, factory){
  var grid = new Grid(options);

  if(!_.isFunction(factory)){
    throw new TypeError();
  }

  var elements = factory(grid);

  if(!_.isObject(elements)){
    throw new TypeError();
  }

  return elements;
}

exports.row = function(options){
  var grid = new Grid();
  return grid.row(options);
}

exports.column = function(options){
  var grid = new Grid();
  return grid.column(options);
}

exports.Grid = Grid;