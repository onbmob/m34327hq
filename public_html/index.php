<!doctype html>
<!--
Dev
@license
fff

<<<<<<< Updated upstream
test2 + 3
=======
<<<<<<< c3070da21f9cb7e4556bec552817b9cd56e81ec6
fff
hf_1
hotfix pr1hf
hotfix pr1hf

hotfix pr1hf
=======
feature1
>>>>>>> feature1

>>>>>>> Stashed changes
hotfix pr1hf
afeature1
feature2

fff
hf_1
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
-->
<?php
if (isset($_COOKIE['lang'])) $lang = $_COOKIE['lang'];
else  $lang = "en";
echo '<html lang="' . $lang . '">';
?>

<!--<html lang="">-->

<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="generator" content="Polymer Starter Kit"/>
    <title>Polymer Starter Kit 103</title>
    <!-- Place favicon.ico in the `app/` directory -->

    <!-- Chrome for Android theme color -->
    <meta name="theme-color" content="#303F9F">

    <!-- Web Application Manifest -->
    <link rel="manifest" href="manifest.json">

    <!-- Tile color for Win8 -->
    <meta name="msapplication-TileColor" content="#3372DF">

    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="PSK">
    <link rel="icon" sizes="192x192" href="images/touch/chrome-touch-icon-192x192.png">

    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Polymer Starter Kit">
    <link rel="apple-touch-icon" href="images/touch/apple-touch-icon.png">

    <!-- Tile icon for Win8 (144x144) -->
    <meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png">

    <!-- build:css styles/main.css -->
    <link rel="stylesheet" href="styles/main.css">
    <!-- endbuild-->

    <!-- build:js bower_components/webcomponentsjs/webcomponents-lite.min.js -->
    <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
    <!-- endbuild -->

    <!-- will be replaced with elements/elements.vulcanized.html -->
    <link rel="import" href="elements/elements.html">
    <!-- endreplace-->
</head>

<body unresolved class="fullbleed layout vertical">
<span id="browser-sync-binding"></span>
<template is="dom-bind" id="app">

    <paper-drawer-panel id="paperDrawerPanel">
        <!-- Drawer Scroll Header Panel -->
        <paper-scroll-header-panel drawer fixed>

            <!-- Drawer Toolbar -->
            <paper-toolbar id="drawerToolbar">
                <!--          <span class="paper-font-title">Menu</span>-->
                <iron-image style="width:255px; height:60px;" sizing="contain" src="images/logotype.png"></iron-image>
            </paper-toolbar>

            <!-- Drawer Content -->
            <paper-menu class="list" attr-for-selected="data-route" selected="{{route}}" on-iron-select="onMenuSelect">

                <a data-route="home" href="/">
                    <iron-icon icon="home"></iron-icon>
                    <span><i18n-msg msgid="home"></i18n-msg></span>
                </a>

                <a data-route="users" href="/users">
                    <iron-icon icon="info"></iron-icon>
                    <span>Users</span>
                </a>

                <!--          <a data-route="contact" href="/contact">-->
                <!--            <iron-icon icon="mail"></iron-icon>-->
                <!--            <span>Contact</span>-->
                <!--          </a>-->

                <a data-route="contact" href="/contact">
                    <iron-icon icon="face"></iron-icon>
                    <span><i18n-msg msgid="contact"></i18n-msg></span>
                </a>

                <a data-route="howtobuy" href="/howtobuy">
                    <iron-icon icon="shopping-cart"></iron-icon>
                    <span><i18n-msg msgid="howtobuy"></i18n-msg></span>
                </a>

                <a data-route="battery" href="/battery">
                    <iron-icon icon="today"></iron-icon>
                    <span><i18n-msg msgid="battery"></i18n-msg></span>
                </a>

                <a data-route="translate" href="/translate">
                    <iron-icon icon="translate"></iron-icon>
                    <span>Translate</span>
                    <!--            <span><i18n-msg msgid="battery"></i18n-msg></span>-->
                </a>

            </paper-menu>
        </paper-scroll-header-panel>

        <!-- Main Area -->
        <paper-scroll-header-panel main condenses keep-condensed-header>

            <!-- Main Toolbar -->
            <paper-toolbar id="mainToolbar" class="tall">
                <paper-icon-button id="paperToggle" icon="menu" paper-drawer-toggle></paper-icon-button>
                <span class="flex"></span>

                <!-- Toolbar icons -->
                <paper-icon-button icon="refresh"></paper-icon-button>
                <paper-icon-button icon="search"></paper-icon-button>

                <select id="slang" on-change="onLangSelect">
                    <option selected>en</option>
                    <option>ru</option>
                    <option>fr</option>
                </select>


                <!-- Application name -->
                <div class="middle middle-container center horizontal layout">
                    <div class="app-name">Polymer Starter Kit 1.0.3</div>
                </div>

                <!-- Application sub title -->
                <div class="bottom bottom-container center horizontal layout">
                    <div class="bottom-title paper-font-subhead">The future of the web today</div>
                </div>

            </paper-toolbar>

            <!-- Main Content -->
            <div class="content">
                <iron-pages attr-for-selected="data-route" selected="{{route}}">

                    <section data-route="home">
                        <paper-material elevation="1">
                            <my-greeting></my-greeting>

                            <p class="paper-font-subhead">You now have:</p>
                            <my-list></my-list>

                            <p class="paper-font-body2">Looking for more Web App layouts? Check out our <a
                                    href="https://github.com/PolymerElements/app-layout-templates">layouts</a>
                                collection. You can also <a
                                    href="http://polymerelements.github.io/app-layout-templates/">preview</a> them live.
                            </p>
                        </paper-material>
                        <paper-material elevation="1">
                            <p class="paper-font-body2">This is another card.</p>
                        </paper-material>
                    </section>

                    <section data-route="users">
                        <paper-material elevation="1">
                            <h2 class="paper-font-display2">Users</h2>

                            <p>This is the users section</p>
                            <a href="/users/Rob">Rob</a>
                        </paper-material>
                    </section>

                    <section data-route="user-info">
                        <paper-material elevation="1">
                            <h2 class="paper-font-display2">
                                User:<span>{{params.name}}</span>
                            </h2>

                            <div>This is <span>{{params.name}}</span>'s section</div>
                        </paper-material>
                    </section>

                    <section data-route="contact">
                        <paper-material elevation="1">
                            <!--                <h2 class="paper-font-display2">Contact</h2>-->
                            <!--                <p>This is the contact section</p>-->
                            <my-contact></my-contact>
                        </paper-material>
                    </section>

                    <section data-route="battery">
                        <paper-material elevation="1">
                            <!--                              <h2 class="paper-font-subhead">-->
                            <!--                                <i18n-msg msgid="battery"></i18n-msg>-->
                            <!--                              </h2>-->
                            <my-battery lang="{{lang}}"></my-battery>
                        </paper-material>
                    </section>

                    <section data-route="howtobuy">
                        <paper-material elevation="1">
                            <how-buy></how-buy>
                        </paper-material>
                    </section>

                    <section data-route="translate">
                        <paper-material elevation="1">
                            <my-translate fadd="{{fadd}}" fsave="{{fsave}}" lang="{{lang}}"></my-translate>
                        </paper-material>
                    </section>

                </iron-pages>
            </div>
        </paper-scroll-header-panel>
    </paper-drawer-panel>

    <!-- Uncomment next block to enable Service Worker support (1/2) -->
    <!--
    <paper-toast id="caching-complete"
                 duration="6000"
                 text="Caching complete! This app will work offline.">
    </paper-toast>

    <platinum-sw-register auto-register
                          clients-claim
                          skip-waiting
                          on-service-worker-installed="displayInstalledToast">
      <platinum-sw-cache default-cache-strategy="networkFirst"
                         precache-file="precache.json">
      </platinum-sw-cache>
    </platinum-sw-register>
    -->

<!--    <iron-localstorage
        name="polymer-localstorage"
        value="{{ls}}"
        on-iron-localstorage-load-empty="initializeDefaultValue">
    </iron-localstorage>
 -->
    <paper-fab icon="add" title="add" id="fabadd" on-tap="tapadd"></paper-fab>
    <paper-fab icon="save" title="save" id="fabsave" on-tap="tapsave"></paper-fab>

</template>

<!-- build:js scripts/app.js -->
<script src="scripts/app.js"></script>
<!-- endbuild-->
</body>

</html>
