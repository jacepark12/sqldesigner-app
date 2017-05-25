/* --------------------- options ------------ */
SQL.Options = function(owner) {
    this.owner = owner;
    this.dom = {
        container: OZ.$("opts"),
        btn: OZ.$("options")
    };
    this.dom.btn.innerHTML = _("options");
    this.save = this.save.bind(this);
    this.build();
}

SQL.Options.prototype.build = function() {
    console.log('calling saveElectronSetting function');

    console.log('this is config build function');
    this.dom.optionlocale = OZ.$("optionlocale");
    this.dom.optiondb = OZ.$("optiondb");
    this.dom.optionsnap = OZ.$("optionsnap");
    this.dom.optionpattern = OZ.$("optionpattern");
    this.dom.optionhide = OZ.$("optionhide");
    this.dom.optionvector = OZ.$("optionvector");
    this.dom.optionshowsize = OZ.$("optionshowsize");
    this.dom.optionshowtype = OZ.$("optionshowtype");

    var ids = ["language", "db", "snap", "pattern", "hide", "vector", "showsize", "showtype", "optionsnapnotice", "optionpatternnotice", "optionsnotice"];
    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var elm = OZ.$(id);
        elm.innerHTML = _(id);
    }

    var ls = CONFIG.AVAILABLE_LOCALES;
    OZ.DOM.clear(this.dom.optionlocale);
    for (var i = 0; i < ls.length; i++) {
        var o = OZ.DOM.elm("option");
        o.value = ls[i];
        o.innerHTML = ls[i];
        this.dom.optionlocale.appendChild(o);
        if (this.owner.getOption("locale") == ls[i]) {
            this.dom.optionlocale.selectedIndex = i;
        }
    }

    var dbs = CONFIG.AVAILABLE_DBS;
    OZ.DOM.clear(this.dom.optiondb);
    for (var i = 0; i < dbs.length; i++) {
        var o = OZ.DOM.elm("option");
        o.value = dbs[i];
        o.innerHTML = dbs[i];
        this.dom.optiondb.appendChild(o);
        if (this.owner.getOption("db") == dbs[i]) {
            this.dom.optiondb.selectedIndex = i;
        }
    }


    OZ.Event.add(this.dom.btn, "click", this.click.bind(this));

    this.dom.container.parentNode.removeChild(this.dom.container);

    console.log('hasElectronSetting() : ', this.hasElectronSetting());
    if (this.hasElectronSetting()) {
        //load electron-setting
        console.log('local value : ', this.getElectronSetting("db"))
        console.log('optionhid 3-cal test : ', this.getElectronSetting("hide") ? "1" : "")
        this.owner.setOption("locale", this.getElectronSetting("locale"));
        this.owner.setOption("db", this.getElectronSetting("db"));
        this.owner.setOption("snap", this.getElectronSetting("snap"));
        this.owner.setOption("pattern", this.getElectronSetting("pattern"));
        //this.owner.setOption("hide", "1");
        // this.owner.setOption("hide", this.getElectronSetting("hide") ? "1" : "");
        // this.owner.setOption("vector", this.getElectronSetting("vector") ? "1" : "");
        // this.owner.setOption("showsize", this.getElectronSetting("showsize") ? "1" : "");
        // this.owner.setOption("showtype", this.getElectronSetting("showtype") ? "1" : "");
        this.owner.setOption("hide", this.getElectronSetting("hide"));
        this.owner.setOption("vector", this.getElectronSetting("vector"));
        this.owner.setOption("showsize", this.getElectronSetting("showsize"));
        console.log('value after saving showsize val : ' + this.owner.getOption('showsize'));
        this.owner.setOption("showtype", this.getElectronSetting("showtype"));

        //set view
        this.dom.optionlocale.value = this.getElectronSetting("locale")
        this.dom.optiondb.value = this.getElectronSetting("db");
        this.dom.optionsnap.value = this.getElectronSetting("snap");
        this.dom.optionpattern.value = this.getElectronSetting("pattern");
        this.dom.optionhide.checked = (this.getElectronSetting("hide") ? "1" : "");
        this.dom.optionvector.checked = (this.getElectronSetting("vector") ? "1" : "");
        this.dom.optionshowsize.checked = (this.getElectronSetting("showsize") ? "1" : "");
        this.dom.optionshowtype.checked = (this.getElectronSetting("showtype") ? "1" : "");

    } else {
        this.initElectronSetting();
    }
};

//여기서 설정을 저장하고
SQL.Options.prototype.save = function() {
    console.log('this is config save function');

    this.owner.setOption("locale", this.dom.optionlocale.value);
    this.owner.setOption("db", this.dom.optiondb.value);
    this.owner.setOption("snap", this.dom.optionsnap.value);
    this.owner.setOption("pattern", this.dom.optionpattern.value);


    this.owner.setOption("hide", this.dom.optionhide.checked ? "1" : "");
    this.owner.setOption("vector", this.dom.optionvector.checked ? "1" : "");
    this.owner.setOption("showsize", this.dom.optionshowsize.checked ? "1" : "");
    this.owner.setOption("showtype", this.dom.optionshowtype.checked ? "1" : "");

    //save to electron-setting
    this.saveElectronSetting("locale", this.dom.optionlocale.value);
    this.saveElectronSetting("db", this.dom.optiondb.value);
    this.saveElectronSetting("snap", this.dom.optionsnap.value);
    this.saveElectronSetting("pattern", this.dom.optionpattern.value);
    this.saveElectronSetting("hide", this.dom.optionhide.checked);
    this.saveElectronSetting("vector", this.dom.optionvector.checked);
    this.saveElectronSetting("showszie", this.dom.optionshowsize.checked);

    console.log('this.dom.optionshowtype : ', this.dom.optionshowtype.checked);
    this.saveElectronSetting("showtype", this.dom.optionshowtype.checked);

}

//여기서 그 설정을 적용한다.
SQL.Options.prototype.click = function() {
    this.owner.window.open(_("options"), this.dom.container, this.save);
    // this.dom.optionsnap.value = this.owner.getOption("snap");
    // this.dom.optionpattern.value = this.owner.getOption("pattern");
    // this.dom.optionhide.checked = this.owner.getOption("hide");
    // this.dom.optionvector.checked = this.owner.getOption("vector");
    // this.dom.optionshowsize.checked = this.owner.getOption("showsize");
    // this.dom.optionshowtype.checked = this.owner.getOption("showtype");

    this.dom.optionsnap.value = this.getElectronSetting("snap");
    this.dom.optionpattern.value = this.getElectronSetting("pattern");
    this.dom.optionhide.checked = this.getElectronSetting("hide");
    // this.dom.optionvector.checked = this.getElectronSetting("vector");
    // this.dom.optionshowsize.checked = this.getElectronSetting("showsize");
    // this.dom.optionshowtype.checked = this.getElectronSetting("showtype");
    this.dom.optionhide.checked = (this.getElectronSetting("hide") ? "1" : "");
    this.dom.optionvector.checked = (this.getElectronSetting("vector") ? "1" : "");
    this.dom.optionshowsize.checked = (this.getElectronSetting("showsize") ? "1" : "");
    this.dom.optionshowtype.checked = (this.getElectronSetting("showtype") ? "1" : "");

}