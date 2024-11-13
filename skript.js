// ==UserScript==
// @name         UnivIS Refined
// @namespace    https://gomorrha.dev
// @version      1.4
// @author       gmrrh
// @description  A refined version of UnivIS with Material Design
// @match        https://univis.uni-luebeck.de/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    "use strict";

    const primaryColor = "#4CAF50"; // Grün
    const secondaryColor = "#A5D6A7"; // Helles Grün
    const textColor = "#ffffff"; // Weiß

    // Lade Material Design Styles und Icons
    GM_addStyle(`
        @import url("https://code.getmdl.io/1.3.0/material.indigo-teal.min.css");
        @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
        body {
            background: url("https://panel.mine-server.net/univis_latest.png") no-repeat center center fixed;
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
            padding-top: 20px;
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
        .mdl-button {
            width: 100%; /* Buttons sollen die ganze Breite einnehmen */
            text-align: left; /* Text linksbündig */
            margin: 5px 0; /* Abstand zwischen den Buttons */
        }
        .mdl-button--fab {
            background-color: ${primaryColor}; /* Hamburger-Button im Material-Stil */
            color: white;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1001;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            font-size: 32px; /* Größe des Hamburger-Menüzeichens */
            text-align: center;
            line-height: 56px; /* Vertikale Zentrierung des Symbols */
        }
        .mdl-button--fab:hover {
            background-color: #388E3C; /* Dunklerer Grünton für den Hover-Effekt */
        }
    `);

    function removeBgcolor() {
        const elements = document.querySelectorAll("*");
        elements.forEach(element => {
            if (element.getAttribute("bgcolor") === "#ffffff" || element.getAttribute("bgcolor") === "#eeeeee" || element.getAttribute("bgcolor") === "#000000" || element.getAttribute("bgcolor") === "#cccccc") {
                element.removeAttribute("bgcolor");
            }
        });
    }

    function changeBlackTextColor() {
        const elements = document.querySelectorAll("*");

        elements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const color = computedStyle.color;

            if (color === "#000000") {
                element.style.color = textColor;
            }
        });
    }

    function updateUniLink() {
        const link = document.querySelector('a[href="http://www.uni-luebeck.de/"]');
        if (link) {
            link.href = 'https://univis.uni-luebeck.de/';
        }
    }

    //Lets do it!!!
    removeBgcolor();
    changeBlackTextColor();
    updateUniLink();

    // Seitenleiste mit Material Design
    const sidebar = document.createElement("div");
    sidebar.className = "mdl-layout__drawer custom-sidebar";
    sidebar.innerHTML = `
        <h2 class="mdl-typography--headline" style="color:white;">Navigation</h2>
        <ul class="mdl-list">
            <li class="mdl-list__item">
                <span class="mdl-list__item-icon material-icons">home</span>
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--rounded mdl-button--accent mdl-list__item-primary-content" style="color:black;">Home</button>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-icon material-icons">schedule</span>
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--rounded mdl-button--accent mdl-list__item-primary-content" style="color:black;">Stundenplan</button>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-icon material-icons">contact_mail</span>
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--rounded mdl-button--accent mdl-list__item-primary-content" style="color:black;">Kontakt</button>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-icon material-icons">help</span>
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--rounded mdl-button--accent mdl-list__item-primary-content" style="color:black;">Hilfe</button>
            </li>
        </ul>
    `;

    document.body.appendChild(sidebar);

    function clickButtonByText(buttonText) {
        const link = Array.from(document.querySelectorAll("a")).find(anchor => anchor.textContent.trim() === buttonText);
        if (link) {
            link.click();
        }
    }

    const buttons = sidebar.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent.trim();
            if (buttonText === "Stundenplan") {
                clickButtonByText("Sammlung/Stundenplan");
            } else {
                clickButtonByText(buttonText);
            }
        });
    });

    // Hamburger-Button zum Umschalten der Sidebar
    const toggleButton = document.createElement("button");
    toggleButton.className = "mdl-button mdl-js-button mdl-button--fab mdl-button--colored";
    toggleButton.innerHTML = "☰";
    document.body.appendChild(toggleButton);

    let isSidebarOpen = false;
    toggleButton.onclick = function() {
        if (isSidebarOpen) {
            sidebar.style.transform = "translateX(-100%)"; // Sidebar ausblenden
            toggleButton.innerHTML = "☰";
        } else {
            sidebar.style.transform = "translateX(0)"; // Sidebar einblenden
            toggleButton.innerHTML = "-";
        }
        isSidebarOpen = !isSidebarOpen;
    };

    sidebar.style.position = "fixed";
    sidebar.style.transform = "translateX(-100%)";
    sidebar.style.top = "0";
    sidebar.style.width = "250px";
    sidebar.style.height = "100%";
    sidebar.style.transition = "transform 0.3s ease";
    sidebar.style.zIndex = "1000";
})();
