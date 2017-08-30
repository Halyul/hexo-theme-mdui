var sass   = require('node-sass'),
    extend = require('util')._extend,
    magicImporter = require('node-sass-magic-importer');

function getProperty(obj, name){
    name = name.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');

    var split = name.split('.');
    var key = split.shift();

    if (!obj.hasOwnProperty(key)) return '';

    var result = obj[key];
    var len = split.length;

    if (!len) return result || '';
    if (typeof result !== 'object') return '';

    for (var i = 0; i < len; i++){
        key = split[i];
        if (!result.hasOwnProperty(key)) return '';

        result = result[split[i]];
        if (typeof result !== 'object') return result;
    }

    return result;
}

var sassRenderer = function(data, options, callback) {

    var self = this;
    var themeCfg = self.theme.config || {};

    // support global and theme-specific config
    var userConfig = extend(
        themeCfg.node_sass || {},
        self.config.node_sass || {}
    );

    var config = extend({
        data: data.text,
        file: data.path,
        outputStyle: 'nested',
        sourceComments: false,
        importer: magicImporter(),
        functions: {
            "hexo-theme-config($ckey)": function(ckey) {
                var val = getProperty(themeCfg, ckey.getValue()),
                sassVal = new sass.types.String(val);
                if (userConfig.debug) {
                    console.log('hexo-theme-config.' + ckey.getValue(), val);
                }
                return sassVal;
            },
            "hexo-config($ckey)": function(ckey) {
                var val = getProperty(self.config, ckey.getValue()),
                sassVal = new sass.types.String(val);
                if (userConfig.debug) {
                    console.log('hexo-config.' + ckey.getValue(), val);
                }
                return sassVal;
            }
        }
    }, userConfig);

    sass.render(config, function(err, res){
        if (err) {
            console.error(err.toString());
            callback(err);
            return;
        }
        callback(null, res.css.toString());
    });

};

module.exports = sassRenderer;
