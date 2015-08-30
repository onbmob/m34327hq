/**
 * Created by User on 30.08.2015.
 */
(function () {
  Polymer({
    is: 'my-battery',

    listeners: {
//                'hover': 'obshover'
//                'idpagin.tap': 'bpagin'
    },

    properties: {

      lang: {type: String, observer: 'obslang', notify: true},
      sost: {type: Number, value: 0},
      jbatbrand: {type: Number, value: 0},
      jbatmodel: {type: Number, value: 0},
      jappselect: {type: Number, value: 0},
      jcapacity: {type: Number, value: 99999},
      jvoltage: {type: Number, value: 0},
      jpolar: {type: Number, value: 100},
      jterminal: {type: Number, value: 0},
      jttermin: {type: Number, value: 100},
      jcurrent: {type: Number, value: 0},
      jlength: {type: Number, value: 0},
      jwidth: {type: Number, value: 0},
      jheight: {type: Number, value: 0},

      batbranditems: {type: Array},
      batbrandsel: {type: Number, observer: 'obsbatbrandsel'},
      batbrandname: {type: String, value: ''},
      batbrandfl: {tipe: Boolean, value: true},

      batmodelitems: {type: Array},
      batmodelsel: {type: Number, observer: 'obsbatmodelsel'},
      batmodelname: {type: String, value: ''},
      batmodelfl: {tipe: Boolean, value: false},

      markitems: {type: Array},
      marksel: {type: Number, observer: 'obsmarksel'},
      markname: {type: String, value: ''},
      markfl: {tipe: Boolean, value: true},

      year: {type: Array},
      yearitems: {type: Array},
      yearsel: {type: Number, observer: 'obsyearsel'},
      yearname: {type: String, value: ''},
      yearfl: {tipe: Boolean, value: false},

      modelitems: {type: Array},
      modelsel: {type: Number, observer: 'obsmodelsel'},
      modelname: {type: String, value: ''},
      modelfl: {tipe: Boolean, value: false},

      modifitems: {type: Array},
      modifsel: {type: Number, observer: 'obsmodifsel'},
      modifname: {type: String, value: ''},
      modiffl: {tipe: Boolean, value: false},

      capacityitems: {type: Array},
      capacitysel: {type: Number, observer: 'obscapacitysel'},
      capacityname: {type: String, value: ''},
      capacityfl: {tipe: Boolean, value: true},
      colorcapacity: {type: String, value: ''},


      currentitems: {type: Array},
      currentsel: {type: Number, observer: 'obscurrentsel'},
      currentname: {type: String, value: ''},
      currentfl: {tipe: Boolean, value: true},
      colorcurrent: {type: String, value: ''},

      voltageitems: {type: Array},
      voltagesel: {type: Number, observer: 'obsvoltagesel'},
      voltagename: {type: String, value: ''},
      voltagefl: {tipe: Boolean, value: true},
      colorvoltage: {type: String, value: ''},

      terminalitems: {type: Array},
      terminalsel: {type: Number, observer: 'obsterminalsel'},
      terminalname: {type: String, value: ''},
      terminalfl: {tipe: Boolean, value: true},
      colorterminal: {type: String, value: ''},

      lengthitems: {type: Array},
      lengthsel: {type: Number, observer: 'obslengthsel'},
      lengthname: {type: String, value: ''},
      lengthfl: {tipe: Boolean, value: true},
      colorlength: {type: String, value: ''},

      widthitems: {type: Array},
      widthsel: {type: Number, observer: 'obswidthsel'},
      widthname: {type: String, value: ''},
      widthfl: {tipe: Boolean, value: true},
      colorwidth: {type: String, value: ''},

      heightitems: {type: Array},
      heightsel: {type: Number, observer: 'obsheightsel'},
      heightname: {type: String, value: ''},
      heightfl: {tipe: Boolean, value: true},
      colorheight: {type: String, value: ''},

      cardbat: {type: Array},
      appitems: {type: Array},
      polaritems: {type: Array},

      lengthl: {type: String, value: ''},
      widthl: {type: String, value: ''},
      heightl: {type: String, value: ''},

      numpage: {type: Number,value: 0},
      curpage: {type: Number, value: 1},
      pagesize: {type: Number,value: 24},
      pagecount:{type: Number},
      itemscount:{type: Number},



      swidth: {type: String, value: 'width: 260px;'},
      widthcard: {type: String, value: 'width: calc(33% - 21px);'},
      ww: {type: Number},
      tabselected: {type: Number, observer: 'obstabselected'},
      mq1000: {type: Boolean, observer: 'obsmq'},
      mq1200: {type: Boolean, observer: 'obsmq'},
      mq1400: {type: Boolean, observer: 'obsmq'},
      mq1600: {type: Boolean, observer: 'obsmq'},
      tmpa: {type: String, value: ''}

    },
    //================================================

    mousecard:function (e) {
      var tt= e.model.get('item.id');
//        console.log('+++'+tt);
      if(this.tmpa == tt) return;
      if(this.tmpa != '') document.querySelector('#idparcard' + this.tmpa).opened = false;
      document.querySelector('#idparcard' + tt).opened = true;
      this.tmpa = tt;
//        console.log('+++++++++++'+tt);
    },
    idparcard: function (a) {
      return 'idparcard' + a;
    },
    idpm: function (a) {
      return 'idpm' + a;
    },



    obsmq: function () {
//        console.log('mq600:' + this.mq600);
      var iw = window.innerWidth;
      console.log('innerWidth:' + iw);

      var ww = 260;
      if (iw < 500) ww = iw - 50;
      this.swidth = 'width: ' + ww + 'px;';

      if ( iw < 1000) this.widthcard ='width: calc(100% - 25px);'; // ??? 21px
      if (1000<= iw && iw < 1200) this.widthcard ='width: calc(50% - 25px);';
      if (1200<= iw && iw < 1400) this.widthcard ='width: calc(33% - 25px);';
      if (1400<= iw && iw < 1600) this.widthcard ='width: calc(25% - 25px);';
      if (1600<= iw && iw < 1800) this.widthcard ='width: calc(20% - 25px);';
    },

    ready: function () {
      this.$.idajax.params.sost = 4;
      this.$.idajax.generateRequest(); // go!!
      this.$.spin.active = false;
    },
    obslang: function () {
      console.log('obslang=' + this.lang);
      if(this.lang=='') return;
      if (this.markfl)
        this.markname = document.querySelector('i18n-msg').getMsg('selmark');
      if (this.yearfl)
        this.yearname = document.querySelector('i18n-msg').getMsg('selyear');
      if (this.modelfl)
        this.modelname = document.querySelector('i18n-msg').getMsg('selmodel');
      if (this.modiffl)
        this.modifname = document.querySelector('i18n-msg').getMsg('selmodif');
      if (this.batbrandfl)
        this.batbrandname = document.querySelector('i18n-msg').getMsg('selbrand');
      if (this.batmodelfl)
        this.batmodelname = document.querySelector('i18n-msg').getMsg('selmodel');

      var lval = document.querySelector('i18n-msg').getMsg('all');
      if (this.capacityfl) this.capacityname = lval;
      if (this.currentfl) this.currentname = lval;
      if (this.voltagefl) this.voltagename = lval;
      if (this.terminalfl) this.terminalname = lval;
      if (this.lengthfl) this.lengthname = lval;
      if (this.widthfl) this.widthname = lval;
      if (this.heightfl) this.heightname = lval;

      this.lengthl = document.querySelector('i18n-msg').getMsg('length');
      this.widthl = document.querySelector('i18n-msg').getMsg('width');
      this.heightl = document.querySelector('i18n-msg').getMsg('height');
//        console.log('heightl=' + this.heightl);
    },

    obstabselected: function () {
      console.log(this.tabselected);
      this.obslang();
      this.$.spin.active = false;
      this.curpage=1;
      this.$.pagcollapse.opened = false;
      this.$.pagcollapse2.opened = false;
      if (this.tabselected == 0) {
        this.$.idajax.params.sost = 0;
        this.$.idajax.generateRequest(); // go!!
        this.yearname = '';
        this.modelname = '';
        this.modifname = '';
        this.yearitems = [];
        this.modelitems = [];
        this.modifitems = [];

        this.marksel = null;
        this.yearsel = null;
        this.modelsel = null;
        this.modifsel = null;

        this.markfl = false;
        this.yearfl = true;
        this.modelfl = false;
        this.modiffl = false;

        this.$.markcollapse.opened = true;
        this.$.yearcollapse.opened = false;
        this.$.modelcollapse.opened = false;
        this.$.modifcollapse.opened = false;
        this.cardbat = [];
      } else {
        this.__getparam();
      }
    },

    handleResponse: function () {
      console.log(this.ajaxResponse);
      switch (this.ajaxResponse.sost) {
        case '0':
          this.markitems = this.ajaxResponse.data;
          this.markname = document.querySelector('i18n-msg').getMsg('selmark');
          break;
        case '1':
          this.modelitems = this.ajaxResponse.data;
          break;
        case '2':
          this.modifitems = this.ajaxResponse.data;
          break;
        case '3':
          this.tmpa = '';
          this.cardbat = this.ajaxResponse.data;
          this.itemscount = this.ajaxResponse.count;
          this.numpage = Math.ceil(this.itemscount/this.pagesize);
          if(this.numpage >1){
            this.$.pagcollapse.opened = true;
            this.$.pagcollapse2.opened = true;
          }else{
            this.$.pagcollapse.opened = false;
            this.$.pagcollapse2.opened = false;
          }
          break;
        case '4':
          this.batbranditems = this.ajaxResponse.data;
          this.batbrandname = document.querySelector('i18n-msg').getMsg('selbrand');
          this.batbrandfl = true;
          this.batmodelname = '';
          this.batmodelfl = false;
          this.batmodelitems = [];
          break;
        case '5':
          this.batmodelitems = this.ajaxResponse.data;
          this.batmodelname = document.querySelector('i18n-msg').getMsg('selmodel');
          this.batmodelfl = true;
          this.__getcard();
          break;
        case '6':
          this.tmpa = '';
          this.cardbat = this.ajaxResponse.data;
          this.itemscount = this.ajaxResponse.count;
          this.numpage = Math.ceil(this.itemscount/this.pagesize);
          if(this.numpage >1){
            this.$.pagcollapse.opened = true;
            this.$.pagcollapse2.opened = true;
          }else{
            this.$.pagcollapse.opened = false;
            this.$.pagcollapse2.opened = false;
          }
          break;
        case '7':
          this.curpage=1;
          this.__getcard();
          this.appitems = this.ajaxResponse.applicat;
          this.polaritems = this.ajaxResponse.pol;
          this.capacityitems = this.ajaxResponse.capacity;
          this.currentitems = this.ajaxResponse.current;
          this.voltageitems = this.ajaxResponse.voltage;
          this.terminalitems = this.ajaxResponse.terminal;
          this.lengthitems = this.ajaxResponse.alength;
          this.widthitems = this.ajaxResponse.awidth;
          this.heightitems = this.ajaxResponse.aheight;
          setTimeout(function () {
            var ttt = document.querySelector('my-battery');
            for (var i = 0; i < ttt.appitems.length; i++) {
              document.querySelector('#idapp' + ttt.appitems[i].batteryUsage).active = false;
            }
            document.querySelector('#idapp0').active = false;
            console.log('true ' + '#idapp' + ttt.jappselect);
            document.querySelector('#idapp' + ttt.jappselect).active = true;

            for (var i = 0; i < ttt.polaritems.length; i++) {
              var sel = document.querySelector('#idpol' + ttt.polaritems[i].polar);
//                console.log(sel);
              sel.active = false;
            }
            document.querySelector('#idpol100').active = false;
            console.log('true ' + '#idpol' + ttt.jpolar);
            document.querySelector('#idpol' + ttt.jpolar).active = true;
          }, 500);

//            var ta = document.getElementById('idapp');
//            var elements = document.getElementsByName('napp');
//
          break;
        case '8':
          this.yearitems = this.ajaxResponse.data;
          break;
        default :
      }
      this.$.spin.active = false;
    },

    idapp: function (a) {
      return 'idapp' + a;
    },
    tapapp: function (e) {
//        console.log(e.currentTarget.id);
//        console.log(a.model);
//        console.log(a.path[2].tabindex);
//        a.detail.active=false;
//        var sel = document.querySelector('#'+id);
      if (e.model == undefined) this.jappselect = 0;
//        else this.jappselect = e.model._config.item.batteryUsage;
      else this.jappselect = e.model.get('item.batteryUsage');
      this.__getparam();
    },
    idpol: function (a) {
      return 'idpol' + a;
    },
    tappolar: function (e) {
      if (e.model == undefined) this.jpolar = 100;
//        else this.jpolar = e.model._config.item.polar;
      else this.jpolar = e.model.get('item.polar');
      this.__getparam();
    },

    __getcard: function () {
      this.$.spin.active = true;
      this.$.idajax.params.sost = 6;
      this.$.idajax.params.brand = this.jbatbrand;
      this.$.idajax.params.model = this.jbatmodel;
      this.$.idajax.params.appselect = this.jappselect;
      this.$.idajax.params.capacity = this.jcapacity;
      this.$.idajax.params.voltage = this.jvoltage;
      this.$.idajax.params.polar = this.jpolar;
      this.$.idajax.params.terminals = this.jterminal;
      this.$.idajax.params.ttermin = this.jttermin;
      this.$.idajax.params.current = this.jcurrent;
      this.$.idajax.params.length = this.jlength;
      this.$.idajax.params.width = this.jwidth;
      this.$.idajax.params.height = this.jheight;
      this.$.idajax.params.page = this.curpage;

      this.$.idajax.generateRequest();
    },
    __getparam: function () {
      this.$.spin.active = true;
      this.$.idajax.params.sost = 7;
      this.$.idajax.params.brand = this.jbatbrand;
      this.$.idajax.params.model = this.jbatmodel;
      this.$.idajax.params.appselect = this.jappselect;
      this.$.idajax.params.capacity = this.jcapacity;
      this.$.idajax.params.voltage = this.jvoltage;
      this.$.idajax.params.polar = this.jpolar;
      this.$.idajax.params.terminals = this.jterminal;
      this.$.idajax.params.ttermin = this.jttermin;
      this.$.idajax.params.current = this.jcurrent;
      this.$.idajax.params.length = this.jlength;
      this.$.idajax.params.width = this.jwidth;
      this.$.idajax.params.height = this.jheight;

      this.$.idajax.generateRequest();
    },

    __img: function (a) {
      return 'ajax/image.php?id=' + a;
    },
    __imgb: function (a) {
      return '../../images/brands/' + a + '.jpg';
    },
    __imgp: function (a) {
      return '../../images/polar/' + a + '.svg';
    },
    __imgi: function (a) {
      var car = '';
      var titlecar = '';
      switch (a) {
        case '1':
          car = 'car';
          titlecar = 'Легковые';
          break;
        case '2':
          car = 'lorry';
          titlecar = 'Грузовые';
          break;
        case '3':
          car = 'moto';
          titlecar = 'Мото';
          break;
        case '4':
          car = 'tractor';
          titlecar = 'Трактора';
          break;
        case '8':
          car = 'harvester';
          titlecar = 'Сельхоз';
          break;
        default :
          car = 'harvester';
          titlecar = '';
      }
      return '../../images/icons/' + car + '.svg';
    },
    marktoggle: function () {
      this.$.markcollapse.toggle();
    },
    yeartoggle: function () {
      this.$.yearcollapse.toggle();
    },
    modeltoggle: function () {
      this.$.modelcollapse.toggle();
    },
    modiftoggle: function () {
      this.$.modifcollapse.toggle();
    },
    batbrandtoggle: function () {
      this.$.batbrandcollapse.toggle();
      this.batbrandname = document.querySelector('i18n-msg').getMsg('selbrand');
      this.batmodelname = '';
      this.batbrandfl = true;
      this.batmodelfl = false;
      this.batmodelitems = [];
      this.batbrandsel = null;
      this.batmodelsel = null;
      this.$.batmodelcollapse.opened = false;
      this.jbatbrand = 0;
      this.jbatmodel = 0;
      this.__getparam();
    },
    batmodeltoggle: function () {
      if (this.batmodelname == '') return;
      this.$.batmodelcollapse.toggle();
      this.batmodelname = document.querySelector('i18n-msg').getMsg('selmodel');
      this.batmodelfl = true;
      this.jbatmodel = 0;
      this.__getparam();
    },

    capacitytoggle: function () {
      this.$.capacitycollapse.toggle();
      if (this.jcapacity == 99999) return;
      this.capacityname = document.querySelector('i18n-msg').getMsg('all');
      this.colorcapacity = '';
      this.capacityfl = true;
      this.jcapacity = 99999;
      this.capacitysel = null;
      this.__getparam();

    },
    obscapacitysel: function () {
      if (this.capacitysel == null) return;
      this.capacityname = this.capacityitems[this.capacitysel].name;
      this.capacityfl = false;
      this.colorcapacity = 'background-color: rgba(0, 0, 0, 0.25);';
      this.jcapacity = this.capacityitems[this.capacitysel].capacity;
      this.$.capacitycollapse.opened = false;
      this.__getparam();
    },

    currenttoggle: function () {
      this.$.currentcollapse.toggle();
      if (this.jcurrent == 0) return;
      this.currentname = document.querySelector('i18n-msg').getMsg('all');
      this.currentfl = true;
      this.colorcurrent = '';
      this.jcurrent = 0;
      this.currentsel = null;
      this.__getparam();
    },
    obscurrentsel: function () {
      if (this.currentsel == null) return;
      this.currentname = this.currentitems[this.currentsel].current;
      this.currentfl = false;
      this.colorcurrent = 'background-color: rgba(0, 0, 0, 0.25);';
      this.jcurrent = this.currentitems[this.currentsel].current;
      this.$.currentcollapse.opened = false;
      this.__getparam();
    },

    voltagetoggle: function () {
      this.$.voltagecollapse.toggle();
      if (this.jvoltage == 0) return;
      this.voltagename = document.querySelector('i18n-msg').getMsg('all');
      this.voltagefl = true;
      this.colorvoltage = '';
      this.jvoltage = 0;
      this.voltagesel = null;
      this.__getparam();
    },
    obsvoltagesel: function () {
      if (this.voltagesel == null) return;
      this.voltagename = this.voltageitems[this.voltagesel].name;
      this.voltagefl = false;
      this.colorvoltage = 'background-color: rgba(0, 0, 0, 0.25);';
      this.jvoltage = this.voltageitems[this.voltagesel].voltage;
      this.$.voltagecollapse.opened = false;
      this.__getparam();
    },

    terminaltoggle: function () {
      this.$.terminalcollapse.toggle();
      if (this.jterminal == 0) return;
      this.terminalname = document.querySelector('i18n-msg').getMsg('all');
      this.terminalfl = true;
      this.colorterminal = '';
      this.jterminal = 0;
      this.terminalsel = null;
      this.__getparam();
    },
    obsterminalsel: function () {
      if (this.terminalsel == null) return;
      this.terminalname = this.terminalitems[this.terminalsel].name;
      this.terminalfl = false;
      this.colorterminal = 'background-color: rgba(0, 0, 0, 0.25);';
      this.jterminal = this.terminalitems[this.terminalsel].terminal;
      this.$.terminalcollapse.opened = false;
      this.__getparam();
    },

    lengthtoggle: function () {
      this.$.lengthcollapse.toggle();
      if (this.jlength == 0) return;
      this.lengthname = document.querySelector('i18n-msg').getMsg('all');
      this.lengthfl = true;
      this.colorlength = '';
      this.jlength = 0;
      this.lengthsel = null;
      this.__getparam();
    },
    obslengthsel: function () {
      if (this.lengthsel == null) return;
      this.lengthname = this.lengthitems[this.lengthsel].length;
      this.lengthfl = false;
      this.colorlength = 'background-color: rgba(0, 0, 0, 0.25);';
      this.jlength = this.lengthitems[this.lengthsel].length;
      this.$.lengthcollapse.opened = false;
      this.__getparam();
    },

    widthtoggle: function () {
      this.$.widthcollapse.toggle();
      if (this.jwidth == 0) return;
      this.widthname = document.querySelector('i18n-msg').getMsg('all');
      this.widthfl = true;
      this.colorwidth = '';
      this.jwidth = 0;
      this.widthsel = null;
      this.__getparam();
    },
    obswidthsel: function () {
      if (this.widthsel == null) return;
      this.widthname = this.widthitems[this.widthsel].width;
      this.widthfl = false;
      this.colorwidth = 'background-color: rgba(0, 0, 0, 0.25);';
      this.jwidth = this.widthitems[this.widthsel].width;
      this.$.widthcollapse.opened = false;
      this.__getparam();
    },

    heighttoggle: function () {
      this.$.heightcollapse.toggle();
      if (this.jheight == 0) return;
      this.heightname = document.querySelector('i18n-msg').getMsg('all');
      this.heightfl = true;
      this.colorheight = '';
      this.jheight = 0;
      this.heightsel = null;
      this.__getparam();
    },
    obsheightsel: function () {
      if (this.heightsel == null) return;
      this.heightname = this.heightitems[this.heightsel].height;
      this.heightfl = false;
      this.colorheight = 'background-color: rgba(0, 0, 0, 0.25);';
      this.jheight = this.heightitems[this.heightsel].height;
      this.$.heightcollapse.opened = false;
      this.__getparam();
    },

    obsmarksel: function () {
      if (this.marksel == null) return;
      this.markname = this.markitems[this.marksel].name;
      this.yearname = document.querySelector('i18n-msg').getMsg('selyear');
      this.modelname = '';
      this.modifname = '';
      this.yearitems = [];
      this.modelitems = [];
      this.modifitems = [];

      this.yearsel = null;
      this.modelsel = null;
      this.modifsel = null;

      this.markfl = false;
      this.yearfl = true;
      this.modelfl = false;
      this.modiffl = false;

      this.$.markcollapse.opened = false;
      this.$.yearcollapse.opened = true;
      this.$.modelcollapse.opened = false;
      this.$.modifcollapse.opened = false;

      this.$.idajax.params.sost = 8;
      this.$.idajax.params.id = this.markitems[this.marksel].id;
      this.$.idajax.generateRequest();

      this.cardbat = [];
    },
    obsyearsel: function () {
      if (this.yearsel == null) return;
      this.yearname = this.yearitems[this.yearsel];
      this.modelname = document.querySelector('i18n-msg').getMsg('selmodel');
      this.modifname = '';
      this.modelitems = [];
      this.modifitems = [];

      this.markfl = false;
      this.yearfl = false;
      this.modelfl = true;
      this.modiffl = false;

      this.modelsel = null;
      this.modifsel = null;

      this.$.idajax.params.sost = 1;
      this.$.idajax.params.id = this.markitems[this.marksel].id;
      this.$.idajax.params.year = this.yearitems[this.yearsel];
      this.$.idajax.generateRequest();
      this.$.markcollapse.opened = false;
      this.$.yearcollapse.opened = false;
      this.$.modelcollapse.opened = true;
      this.$.modifcollapse.opened = false;
      this.cardbat = [];
    },
    obsmodelsel: function () {
      if (this.modelsel == null) return;
      this.modelname = this.modelitems[this.modelsel].name + ' c ' + this.modelitems[this.modelsel].start_date;
      this.modifname = document.querySelector('i18n-msg').getMsg('selmodif');

      this.markfl = false;
      this.yearfl = false;
      this.modelfl = false;
      this.modiffl = true;

      this.modifsel = null;

      this.$.idajax.params.sost = 2;
      this.$.idajax.params.id = this.modelitems[this.modelsel].id;
      this.$.idajax.generateRequest();
      this.$.markcollapse.opened = false;
      this.$.yearcollapse.opened = false;
      this.$.modelcollapse.opened = false;
      this.$.modifcollapse.opened = true;
      this.cardbat = [];
    },
    obsmodifsel: function () {
      if (this.modifsel == null) return;
      this.modifname = this.modifitems[this.modifsel].name_full;

      this.markfl = false;
      this.yearfl = false;
      this.modelfl = false;
      this.modiffl = false;

      this.$.idajax.params.sost = 3;
      this.$.idajax.params.page = this.curpage;
      this.$.idajax.params.id = this.modifitems[this.modifsel].id;
      this.$.idajax.generateRequest();
      this.$.markcollapse.opened = false;
      this.$.yearcollapse.opened = false;
      this.$.modelcollapse.opened = false;
      this.$.modifcollapse.opened = false;
      this.cardbat = [];
    },
    obsbatbrandsel: function () {
      if (this.batbrandsel == null) return;
      this.batbrandname = this.batbranditems[this.batbrandsel].name;
      this.batbrandfl = false;
      this.jbatbrand = this.batbranditems[this.batbrandsel].id;

      this.$.idajax.params.sost = 5;
      this.$.idajax.params.id = this.batbranditems[this.batbrandsel].id;

      this.$.idajax.generateRequest();
      this.$.batbrandcollapse.opened = false;
      this.$.batmodelcollapse.opened = true;
      this.cardbat = [];
    },
    obsbatmodelsel: function () {
      if (this.batmodelsel == null) return;
      this.batmodelname = this.batmodelitems[this.batmodelsel].name;
      this.batmodelfl = false;
      this.jbatmodel = this.batmodelitems[this.batmodelsel].id;

      this.$.batbrandcollapse.opened = false;
      this.$.batmodelcollapse.opened = false;
      this.__getcard();
    },

    //======================================================================

    begPage: function () {
      this.curpage = 1;
      this.getpage();
    },
    previousPage: function () {
      if (this.curpage > 1) {
        this.curpage--;
        this.getpage();
      }
    },
    nextPage: function () {
      if ((this.itemscount / this.pagesize) > this.curpage) {
        this.curpage++;
        this.getpage();
      }
    },
    endPage: function () {
      this.curpage = this.numpage;
      this.getpage();
    },
    getpage: function () {
      if (this.tabselected == 0) {
        this.$.idajax.params.sost = 3;
        this.$.idajax.params.page = this.curpage;
        this.$.idajax.params.id = this.modifitems[this.modifsel].id;
        this.$.idajax.generateRequest();
      } else {
        this.__getcard();
      }
    },

    //======================================================================

    price_format: function (min, max) {
      var res;
      if (min == max) {
        res = this.numeric_format(min)
      }
      else {
        res = this.numeric_format(min) + ' - ' + this.numeric_format(max)
      }
      return res;
    },

    /**
     * Форматирование числа.
     * @author Andrey Mishchenko (http://www.msav.ru/)
     * @param val - Значение для форматирования
     * @param thSep - Разделитель разрядов
     * @param dcSep - Десятичный разделитель
     * @returns string
     */
    numeric_format: function (val, thSep, dcSep) {

      // Значение не установлено    ***ONB***
      if (!val) return (' ');

      // Проверка указания разделителя разрядов
      if (!thSep) thSep = ' ';

      // Проверка указания десятичного разделителя
      if (!dcSep) dcSep = ',';

      var res = val.toString();
      var lZero = (val < 0); // Признак отрицательного числа

      // Определение длины форматируемой части
      var fLen = res.lastIndexOf('.'); // До десятичной точки
      fLen = (fLen > -1) ? fLen : res.length;

      // Выделение временного буфера
      var tmpRes = res.substring(fLen);
      var cnt = -1;
      for (var ind = fLen; ind > 0; ind--) {
        // Формируем временный буфер
        cnt++;
        if (((cnt % 3) === 0) && (ind !== fLen) && (!lZero || (ind > 1))) {
          tmpRes = thSep + tmpRes;
        }
        tmpRes = res.charAt(ind - 1) + tmpRes;
      }
      return tmpRes.replace('.', dcSep);
    }


  });

})();

