
// localStorage.clear();

if(localStorage.getItem("settings") == null) {
    localStorage.setItem("settings", JSON.stringify({light_theme: false, title: "Science Help", favicon: ""}))
}

function setFavicon(favImg, set){
    var icon = JSON.parse(localStorage.getItem("settings"));
    if(set){
        icon.favicon = favImg;
        localStorage.setItem("settings", JSON.stringify(icon));
    }
    let headTitle = document.querySelector('head');
    let setFavicon = document.createElement('link');
    setFavicon.setAttribute('rel','shortcut icon');
    setFavicon.setAttribute('href',icon.favicon);
    headTitle.appendChild(setFavicon);
}

function toggleTheme(set) {
    if(set){
        var toggle = JSON.parse(localStorage.getItem("settings"));
        toggle.light_theme = !toggle.light_theme;
        localStorage.setItem("settings", JSON.stringify(toggle));
    }
    if(JSON.parse(localStorage.getItem("settings")).light_theme) {
        document.getElementsByTagName("html")[0].setAttribute('data-theme', 'light');
        document.getElementById("themeToggle").innerText = "Dark Mode";
    } else {
        document.getElementsByTagName("html")[0].setAttribute('data-theme', 'default');
        document.getElementById("themeToggle").innerText = "Light Mode";
    }
}

function setTitle(title, set) {
    var title_ = JSON.parse(localStorage.getItem("settings"));
    if(set){
        title_.title = title;
        localStorage.setItem("settings", JSON.stringify(title_))
    }
    document.title = title_.title;
}

function applySettings() {
    toggleTheme(false);
    setTitle('', false);
    setFavicon('', false);
}

try {
    document.getElementById("title_input").oninput = function() {
        if(document.getElementById("title_input").value != '') {
        setTitle(document.getElementById("title_input").value, true);
    } else {
        setTitle("Science Help", true);
    }
    }

}
catch {
    
}

try {
    document.getElementById("icon_input").oninput = function() {
        if(document.getElementById("icon_input").value != '') {
        setFavicon(document.getElementById("icon_input").value, true);
    } else {
        setFavicon('', true);
    }
}
}
catch {

}

applySettings();


