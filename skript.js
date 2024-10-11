// ==UserScript==
// @name         UnivIS Refined
// @namespace    https://gomorrha.dev
// @version      1.1
// @author       gmrrh
// @description  An attempt to finally make UnivIS usable
// @match        https://univis.uni-luebeck.de/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Farbpalette (Bitte ändern, danke)
    const primaryColor = '#4CAF50';
    const backgroundColor = '#f5f5f5';
    const textColor = '#ffffff';

    // Custom CSS Code injekten
    GM_addStyle(`
        body {
            /* Hintergrundbild hinzufügen */
            background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://moodle.uni-luebeck.de/pluginfile.php/1/theme_boost_union/loginbackgroundimage/0/uzl24_s.jpg");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
    `);

    // UnivIS Logo entfernen
    const logo = document.querySelector('img[src="/img/anew/univis_96_20.gif"]');
    if (logo) {
        logo.remove();
    }

    // Seitenleiste
    const sidebar = document.createElement('div');
    sidebar.id = 'customSidebar';
    sidebar.style.width = '250px';
    sidebar.style.height = '100%';
    sidebar.style.position = 'fixed';
    sidebar.style.left = '-500px';
    sidebar.style.top = '0';
    sidebar.style.backgroundColor = primaryColor
    sidebar.style.color = textColor;
    sidebar.style.transition = 'left 0.3s ease';
    sidebar.style.padding = '20px';
    sidebar.style.zIndex = '1000';
    sidebar.style.boxShadow = '2px 0 5px rgba(0, 0, 0, 0.3)';

    sidebar.innerHTML = `
        <h2>Navigation</h2>
        <ul style="list-style-type:none; padding: 0;">
            <li><a href="/form?__s=2&amp;dsc=anew/main&amp;anonymous=1&amp;sem=2024w&amp;__e=6" style="color:${textColor};">Home</a></li>
            <li><a href="/form?__s=2&amp;dsc=anew/coll&amp;anonymous=1&amp;sem=2024w&amp;__e=6" style="color:${textColor};">Sammlung/Stundenplan</a></li>
            <li><a href="/search/person.xml" style="color:${textColor};">Personensuche</a></li>
            <li><a href="/form?__s=2&amp;dsc=anew/kontakt&amp;anonymous=1&amp;sem=2024w&amp;__e=6" style="color:${textColor};">Kontakt</a></li>
            <li><a href="/form?__s=2&amp;dsc=anew/help&amp;anonymous=1&amp;sem=2024w&amp;__e=6" style="color:${textColor};">Hilfe</a></li>
        </ul>
    `;

    document.body.appendChild(sidebar);

    // Floating Button zum Ausklappen
    const toggleButton = document.createElement('div');
    toggleButton.id = 'toggleButton';
    toggleButton.innerHTML = '☰';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '20px';
    toggleButton.style.left = '20px';
    toggleButton.style.width = '50px';
    toggleButton.style.height = '50px';
    toggleButton.style.backgroundColor = primaryColor
    toggleButton.style.borderRadius = '50%';
    toggleButton.style.color = textColor;
    toggleButton.style.textAlign = 'center';
    toggleButton.style.lineHeight = '50px';
    toggleButton.style.fontSize = '30px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.zIndex = '1001';
    toggleButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

    document.body.appendChild(toggleButton);

    // Funktion zum Klappen der Seitenleiste
    let isSidebarOpen = false;
    toggleButton.onclick = function() {
        if (isSidebarOpen) {
            sidebar.style.left = '-500px';
            toggleButton.innerHTML = '☰';
        } else {
            sidebar.style.left = '0';
            toggleButton.innerHTML = '-';
        }
        isSidebarOpen = !isSidebarOpen;
    };
})();
