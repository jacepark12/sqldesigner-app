//this is file for saving config values using npm-electron-settings module
const settings = require('electron-settings');

SQL.Options.prototype.hasElectronSetting = function() {
    return settings.has('settings.db');
};

SQL.Options.prototype.getElectronSetting = function(key) {
    var keyString = 'settings.' + key;
    console.log('get ' + keyString + ' : ' + settings.get(keyString));

    return settings.get(keyString);
}

SQL.Options.prototype.saveElectronSetting = function(key, value) {
    var keyString = 'settings.' + key;
    console.log('saving value : ', value);
    settings.set(keyString, value);

    console.log('save ' + keyString + ' : ' + settings.get(keyString));
}

SQL.Options.prototype.initElectronSetting =
    function() {
        console.log('save ElectronSetting function');
        var ids = ["language", "db", "snap", "pattern", "hide", "vector", "showsize", "showtype", "optionsnapnotice", "optionpatternnotice", "optionsnotice"];

        var settingObj = {};

        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            settingObj[id] = this.owner.getDefaultOption(id);
        }

        console.log('settingObj : ', settingObj);

        //save electron-setting
        settings.set('settings', settingObj);
    }