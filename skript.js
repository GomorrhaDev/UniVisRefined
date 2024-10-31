// ==UserScript==
// @name         UnivIS Refined
// @namespace    https://gomorrha.dev
// @version      1.2
// @author       gmrrh
// @description  A refined version of UnivIS with Material Design
// @match        https://univis.uni-luebeck.de/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const primaryColor = '#4CAF50'; // Grün
    const secondaryColor = '#A5D6A7'; // Helles Grün
    const textColor = '#ffffff'; // Weiß

    GM_addStyle(`
        @import url("https://code.getmdl.io/1.3.0/material.indigo-teal.min.css");
        @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
        body {
            background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.5)), url("https://moodle.uni-luebeck.de/pluginfile.php/1/theme_boost_union/loginbackgroundimage/0/uzl24_s.jpg") no-repeat center center fixed;
            background-size: cover;
            margin: 0;
            color: ${textColor}; /* Textfarbe */
        }
        .mdl-layout__header {
            background-color: ${primaryColor}; /* Headerfarbe */
        }
        .mdl-button--colored {
            background-color: ${primaryColor}; /* Farbe für Buttons */
            color: ${textColor};
        }
        .mdl-button--colored:hover {
            background-color: #388E3C; /* Dunklerer Grünton beim Hover */
        }
        .custom-sidebar {
            background-color: ${secondaryColor}; /* Hintergrundfarbe der Sidebar */
            color: black; /* Textfarbe in der Sidebar */
        }
        .mdl-list__item {
            color: black; /* Farbe für Listenelemente */
        }
        .mdl-list__item-primary-content {
            display: flex;
            align-items: center;
        }
        .mdl-list__item-icon {
            margin-right: 16px; /* Abstand zwischen Icon und Text */
        }
    `);

    function removeWhiteBgcolor() {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            if (element.getAttribute('bgcolor') === '#ffffff' || element.getAttribute('bgcolor') === '#eeeeee') {
                element.removeAttribute('bgcolor');
            }
        });
    }

    removeWhiteBgcolor();

    // UnivIS Logo entfernen
    const logo = document.querySelector('img[src="/img/anew/univis_96_20.gif"]');
    if (logo) {
        logo.remove();
    }

    // Seitenleiste
    const sidebar = document.createElement('div');
    sidebar.className = 'mdl-layout__drawer custom-sidebar';
    sidebar.innerHTML = `
        <h2 class="mdl-typography--headline">Navigation</h2>
        <ul class="mdl-list">
            <li class="mdl-list__item">
                <span class="mdl-list__item-icon material-icons">home</span>
                <a href="/form" class="mdl-list__item-primary-content" style="color:black;">Home</a>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-icon material-icons">schedule</span>
                <a href="/form?__s=2&dsc=anew/coll&anonymous=1&sem=2024w&__e=27" class="mdl-list__item-primary-content" style="color:black;">Sammlung/Stundenplan</a>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-icon material-icons">contact_mail</span>
                <a href="/form?__s=2&dsc=anew/kontakt&anonymous=1&sem=2024w&__e=27" class="mdl-list__item-primary-content" style="color:black;">Kontakt</a>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-icon material-icons">help</span>
                <a href="/form?__s=2&dsc=anew/help&anonymous=1&sem=2024w&__e=27" class="mdl-list__item-primary-content" style="color:black;">Hilfe</a>
            </li>
        </ul>
    `;

    document.body.appendChild(sidebar);

    // Floating Button zum Ausklappen
    const toggleButton = document.createElement('button');
    toggleButton.className = 'mdl-button mdl-js-button mdl-button--fab mdl-button--colored';
    toggleButton.innerHTML = '☰';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '20px';
    toggleButton.style.left = '20px';
    toggleButton.style.zIndex = '1001';
    toggleButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    document.body.appendChild(toggleButton);

    let isSidebarOpen = false;
    toggleButton.onclick = function() {
        if (isSidebarOpen) {
            sidebar.style.transform = 'translateX(-100%)'; // Sidebar ausblenden
            toggleButton.innerHTML = '☰';
        } else {
            sidebar.style.transform = 'translateX(0)'; // Sidebar einblenden
            toggleButton.innerHTML = '-';
        }
        isSidebarOpen = !isSidebarOpen;
    };

    sidebar.style.position = 'fixed';
    sidebar.style.transform = 'translateX(-100%)';
    sidebar.style.top = '0';
    sidebar.style.width = '250px';
    sidebar.style.height = '100%';
    sidebar.style.transition = 'transform 0.3s ease';
    sidebar.style.zIndex = '1000';
})();
