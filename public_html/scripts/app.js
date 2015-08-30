/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  //var lang = '';
  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
    // i18n
    I18nMsg.lang = document.documentElement.lang || 'en';
    app.lang = I18nMsg.lang;
    document.querySelector('#slang').value = I18nMsg.lang;

  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  addEventListener('paper-header-transform', function(e) {
    var appName = document.querySelector('.app-name');
    var middleContainer = document.querySelector('.middle-container');
    var bottomContainer = document.querySelector('.bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1-maxMiddleScale))  + maxMiddleScale);
    var scaleBottom = 1 - yRatio;
    var fadd=0;
    var fsave=0;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  // i18n
  // Event is only needed when running under the HTMLImports polyfill.
  window.addEventListener('HTMLImportsLoaded', function () {

    I18nMsg.lang = document.documentElement.lang || 'en';
    //app.lang = I18nMsg.lang;  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log('polyfill='+app.lang);
  });

  //console.log('getLocale=' + getLocale());

  //document.addEventListener('i18n-language-ready', function(e) {
  //var daysMsgEl = document.querySelector('#daysMsgEl');
  //input.placeholder = daysMsgEl.getMsg(daysMsgEl.msgid);
  //console.log('i18n-language-ready');
  //var sel = document.querySelector('#slang');
  //app.set('ls.lang', sel.value);
  //});


  app.onLangSelect = function () {
    var sel = document.querySelector('#slang');
    document.documentElement.lang = sel.value;
    I18nMsg.lang = sel.value;
    app.lang = I18nMsg.lang;
    console.log('onLangSelec=' + I18nMsg.lang);
    //   app.ls.lang = I18nMsg.lang;
    var today = new Date();
    var expires = new Date(today.getTime() + 24*60*60*1000);
    document.cookie = "lang=" + sel.value + "; expires=" + expires;
    //console.log('get_name_browser=' + get_name_browser());

    if(get_name_browser()) location.reload();

    //setTimeout(function () {
    //  app.set('ls.lang', sel.value);
    //}, 500);
  };
  app.tapadd = function () {
    this.fadd++;
  };
  app.tapsave = function () {
    this.fsave++;
  };

  //app.initializeDefaultValue = function() { // установка LS по дефолту, срабатывает при удалении значения
  //  app.ls = {
  //    lang: ""
  //  };
  //  app.ls.lang = getLocale();
  //  console.log("initializeDefaultValue ="+app.ls.lang);
  //};

  function getLocale() {
    return (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase();
  }
  function get_name_browser(){
    // получаем данные userAgent
    var ua = navigator.userAgent;
    console.log(ua);
    // с помощью регулярок проверяем наличие текста,
    // соответствующие тому или иному браузеру
    if (ua.search(/Chrome/) > 0) return false;
    //if (ua.search(/Firefox/) > 0) return 'Firefox';
    //if (ua.search(/Opera/) > 0) return 'Opera';
    //if (ua.search(/Safari/) > 0) return 'Safari';
    //if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
    // условий может быть и больше.
    // сейчас сделаны проверки только
    // для популярных браузеров
    return true;
  }
  console.log("!!!!!!initialize = "+ app.lang);//app.get('ls.lang'));

})(document);
