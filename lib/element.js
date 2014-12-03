/**
 * elementary.element
 */

var _ = require('lodash');

var element = function(rules){

  // This is where the actual element rules will be saved.
  var _rules = (rules || {});

  return {

    /**
     * Keep absurd from compiling as a nested object.
     *
     * (per: http://absurdjs.com/pages/css-preprocessing/basics/ )
     */
    classify: true,

    /**
     * Deep extend an element.
     *
     * @param {Object} rules
     * @param {Object} defaults (optional) For internal use
     * @return {Elementry#element | Object}
     */
    extend: function(rules, defaults, extending){

      extending = (extending === true)? true : false;

      var extended = _.clone( defaults || _rules );

      if(rules.classify !== 'undefined' && rules.classify === true){
        rules = rules.toJSON();
      }

      for(var key in rules){
        if(rules.hasOwnProperty(key)){

          if( rules[key].classify !== 'undefined' && rules[key].classify === true ){
            rules[key] = rules[key].toJSON();

            console.log(rules[key]);
          }

          if( _.isObject( rules[key] )
            && !_.isArray( rules[key] ) 
          ){
            extended[key] = this.extend(rules[key], (extended[key] || {}), true);
          } else {
            if(!extended[key]){
              extended[key] = rules[key];
            }
          }
        }
      }

      if(extending){
        return extended;
      }

      return element(extended);
    },

    /**
     * Return rules
     * (per: http://absurdjs.com/pages/css-preprocessing/basics/ )
     *
     * @return {Object}
     */
    toJSON: function(){
      return _rules;
    }

  }

}

module.exports = element;