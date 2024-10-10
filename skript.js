// ==UserScript==
// @name         UnivIS Refined
// @namespace    https://gomorrha.dev
// @version      1.0
// @author       gmrrh
// @description  An attempt to finally make UnivIS usable
// @match        https://univis.uni-luebeck.de/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        body {
        /* Hintergrund ändern */

            background-image: url("https://moodle.uni-luebeck.de/pluginfile.php/1/theme_boost_union/loginbackgroundimage/0/uzl24_s.jpg");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
    `);
})();
