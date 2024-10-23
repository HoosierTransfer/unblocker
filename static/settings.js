
// localStorage.clear();

if (localStorage.getItem("settings") == null) {
    localStorage.setItem("settings", JSON.stringify({ light_theme: false, title: "Science Help", favicon: "" }))
}

function setFavicon(favImg, set) {
    var icon = JSON.parse(localStorage.getItem("settings"));
    if (set) {
        icon.favicon = favImg;
        localStorage.setItem("settings", JSON.stringify(icon));
    }
    let headTitle = document.querySelector('head');
    let setFavicon = document.createElement('link');
    setFavicon.setAttribute('rel', 'shortcut icon');
    setFavicon.setAttribute('href', icon.favicon);
    headTitle.appendChild(setFavicon);
}

function toggleTheme(set) {
    if (set) {
        var toggle = JSON.parse(localStorage.getItem("settings"));
        toggle.light_theme = !toggle.light_theme;
        localStorage.setItem("settings", JSON.stringify(toggle));
    }
    if (JSON.parse(localStorage.getItem("settings")).light_theme) {
        document.getElementsByTagName("html")[0].setAttribute('data-theme', 'light');
        document.getElementById("themeToggle").innerText = "Dark Mode";
    } else {
        document.getElementsByTagName("html")[0].setAttribute('data-theme', 'default');
        document.getElementById("themeToggle").innerText = "Light Mode";
    }
}

function setTitle(title, set) {
    var title_ = JSON.parse(localStorage.getItem("settings"));
    if (set) {
        title_.title = title;
        localStorage.setItem("settings", JSON.stringify(title_))
    }
    document.title = title_.title;
}

function setSearchEngine(engine) {
    var search = JSON.parse(localStorage.getItem("settings"));
    search.search_engine = engine;
    localStorage.setItem("settings", JSON.stringify(search));
}

function applySettings() {
    toggleTheme(false);
    setTitle('', false);
    setFavicon('', false);
    var settings = JSON.parse(localStorage.getItem("settings"));
    if (settings.light_theme) {
        document.getElementsByTagName("html")[0].setAttribute('data-theme', 'light');
        document.getElementById("themeToggle").innerText = "Dark Mode";
    } else {
        document.getElementsByTagName("html")[0].setAttribute('data-theme', 'default');
        document.getElementById("themeToggle").innerText = "Light Mode";
    }

    if (settings.title != '') {
        document.title = settings.title;
    }

    if (settings.favicon != '') {
        let headTitle = document.querySelector('head');
        let setFavicon = document.createElement('link');
        setFavicon.setAttribute('rel', 'shortcut icon');
        setFavicon.setAttribute('href', settings.favicon);
        headTitle.appendChild(setFavicon);
    }

    if (settings.search_engine != undefined) {
        document.getElementById("search-engine-select").value = settings.search_engine;
    }
}

window.onload = () => {
    document.getElementById("title_input").oninput = function () {
        if (document.getElementById("title_input").value != '') {
            setTitle(document.getElementById("title_input").value, true);
        } else {
            setTitle("Science Help", true);
        }
    }


    document.getElementById("icon_input").oninput = function () {
        if (document.getElementById("icon_input").value != '') {
            setFavicon(document.getElementById("icon_input").value, true);
        } else {
            setFavicon('', true);
        }
    }

    document.getElementById("search-engine-select").onchange = function () {
        alert()
        setSearchEngine(document.getElementById("search-engine-select").value);
    }

    applySettings();
}
