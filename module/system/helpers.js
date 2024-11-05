export const registerHandlebarsHelpers = function () {

    Handlebars.registerHelper('getPaths', function (items) {
        return items.filter(item => item.type === "path");
    });

    Handlebars.registerHelper('getInventory', function (items) {
        let inventory = items.filter(item => item.type === "item");
        inventory.sort(function (a, b) {
            const aKey = a.system.subtype + "-" + a.name.slugify({strict: true});
            const bKey = b.system.subtype + "-" + b.name.slugify({strict: true});
            return (aKey > bKey) ? 1 : -1
        });
        return inventory;
    });

    Handlebars.registerHelper('getWorn', function (items) {
        let worn = items.filter(item => item.type === "item" && item.system.worn);
        worn.sort(function (a, b) {
            const aKey = a.system.subtype + "-" + a.name.slugify({strict: true});
            const bKey = b.system.subtype + "-" + b.name.slugify({strict: true});
            return (aKey > bKey) ? 1 : -1
        });
        return worn;
    });

    Handlebars.registerHelper('getItems', function (items) {
        return items.filter(item => item.type === "item");
    });

    Handlebars.registerHelper('countPaths', function (items) {
        return items.filter(item => item.type === "path").length;
    });

    Handlebars.registerHelper('getCapacities', function (items) {
        let caps = items.filter(item => item.type === "capacity");
        caps.sort(function (a, b) {
            const aKey = a.system.path + "-" + a.system.rank;
            const bKey = b.system.path + "-" + b.system.rank;
            return (aKey > bKey) ? 1 : -1
        });
        return caps;
    });

    Handlebars.registerHelper('getPath', function (items, pathKey) {
        return items.filter(item => item.type === "path").find(p => p.system.key === pathKey);
    });

    Handlebars.registerHelper('isNull', function (val) {
        return val == null;
    });

    Handlebars.registerHelper('isEmpty', function (list) {
        if (list) return list.length == 0;
        else return 0;
    });

    Handlebars.registerHelper('notEmpty', function (list) {
        return list.length > 0;
    });

    Handlebars.registerHelper('isZeroOrNull', function (val) {
        return val == null || val == 0;
    });

    Handlebars.registerHelper('isNegative', function (val) {
        return val < 0;
    });

    Handlebars.registerHelper('isNegativeOrNull', function (val) {
        return val <= 0;
    });

    Handlebars.registerHelper('isPositive', function (val) {
        return val > 0;
    });

    Handlebars.registerHelper('isPositiveOrNull', function (val) {
        return val >= 0;
    });

    Handlebars.registerHelper('equals', function (val1, val2) {
        return val1 == val2;
    });

    Handlebars.registerHelper('gt', function (val1, val2) {
        return val1 > val2;
    });

    Handlebars.registerHelper('lt', function (val1, val2) {
        return val1 < val2;
    });

    Handlebars.registerHelper('gte', function (val1, val2) {
        return val1 >= val2;
    });

    Handlebars.registerHelper('lte', function (val1, val2) {
        return val1 <= val2;
    });
    Handlebars.registerHelper('and', function (val1, val2) {
        return val1 && val2;
    });

    Handlebars.registerHelper('or', function (val1, val2) {
        return val1 || val2;
    });

    Handlebars.registerHelper('not', function (cond) {
        return !cond;
    });

    Handlebars.registerHelper('isEnabled', function (configKey) {
        return game.settings.get("cog", configKey);
    });

    Handlebars.registerHelper('split', function (str, separator, keep) {
        return str.split(separator)[keep];
    });

    // If you need to add Handlebars helpers, here are a few useful examples:
    Handlebars.registerHelper('concat', function () {
        var outStr = '';
        for (var arg in arguments) {
            if (typeof arguments[arg] != 'object') {
                outStr += arguments[arg];
            }
        }
        return outStr;
    });

    Handlebars.registerHelper('add', function (a, b) {
        return parseInt(a) + parseInt(b);
    });

    Handlebars.registerHelper('valueAtIndex', function (arr, idx) {
        return arr[idx];
    });

    Handlebars.registerHelper('includes', function (array, val) {
        return array.includes(val);
    });

    Handlebars.registerHelper('includesKey', function (items, type, key) {
        return items.filter(i => i.type === type).map(i => i.system.key).includes(key);
    });

    Handlebars.registerHelper('isCategoryIn', function () {
        for (let index = 1; index < arguments.length; index++) {
            const element = arguments[index];
            if (element === arguments[0]) return true;
        }
        return false;
    });

    Handlebars.registerHelper('isNotLimited', function(options){
        return !options?.limited;
    });

    Handlebars.registerHelper('isNotLimitedEncounter', function(options){
        return !(options?.limited && options?.actor?.type === "encounter");
    });

    Handlebars.registerHelper('getFpLabel', function(){
        if (game.settings.get("cog", "settingCyberpunk")) {
            return game.i18n.localize("COG.attributes.cp.label");
        }
        else return game.i18n.localize("COG.attributes.fp.label");
    });

    Handlebars.registerHelper('getFpAbbrev', function(){
        if (game.settings.get("cog", "settingCyberpunk")) {
            return game.i18n.localize("COG.attributes.cp.abbrev");
        }
        else return game.i18n.localize("COG.attributes.fp.abbrev");
    });
}
