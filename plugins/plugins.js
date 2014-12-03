var helpers = require('../').helpers;

module.exports = function (api){

  api
    /**
     * Make an element full-hieght.
     *
     * @use: fullheight: '<offsetX>, <offsetY>' 
     */
    .plugin('fullheight', function(api, value){

      value = helpers.options.list(value);

      return {
        position: 'absolute',
        top: value[0],
        bottom: (value[1] || 0)
      };

    })
    /**
     * Make the current element into a standalone.
     *
     * @use: standalone:'left:<offset>, right:<offset>, top:<offset>, bottom:<offset>, size:<x/y>'
     */
    .plugin('standalone', function(api, value){

      var standalone = helpers.options.assoc(value);

      return [
        standalone,
        {
          content: '"."',
          textIndent: '-9999px',
          overflow: 'hidden',
          position: 'absolute'
        }
      ];

    })
    /**
     * Make the current element selectable.
     *
     * @use: selectable: '<true | false>'
     */
    .plugin('selectable', function(api, value){
      return {
        cursor: (value === 'true')? 'pointer' : 'default'
      }
    });

}