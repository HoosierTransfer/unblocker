let allLogs = [];
const logStyles = { log: 'white', error: 'red', warn: 'yellow', debug: 'gray' };

['log', 'error', 'warn', 'debug'].forEach(type => {
    const original = console[type].bind(console);
    console[type] = (...args) => {
        original(...args);
        allLogs.push(`<span style="color:${logStyles[type]}">${args.join(' ')}</span>`);
    };
});

window.onerror = (e, url, line) => allLogs.push(`<span style="color:red;">Error: ${e} at ${url}, line ${line}</span>`);

let consoleInterval;

let consoleDiv;

function addConsole() {    
    consoleDiv = Object.assign(document.body.appendChild(document.createElement('div')), {
    style: `position:fixed;z-index:100000;margin:10px;padding:10px;font-family:monospace;
    width:500px;height:200px;color:white;background:black;border-radius:10px;border:white 2px solid;
    overflow-y:auto;box-sizing:border-box;`
    });
    
    consoleInterval = setInterval(() => consoleDiv.innerHTML = allLogs.join('<br>'), 100);

    let settings = JSON.parse(localStorage.getItem("settings"));
    settings.console = true;
    localStorage.setItem("settings", JSON.stringify(settings));
}

function removeConsole() {
    ['log', 'error', 'warn', 'debug'].forEach(type => {
        console[type] = console[type].bind(console);
    });
    
    window.onerror = null;
    
    clearInterval(consoleInterval);
    consoleDiv.remove();

    let settings = JSON.parse(localStorage.getItem("settings"));
    settings.console = false;
    localStorage.setItem("settings", JSON.stringify(settings));
}

if (localStorage.getItem("settings") != null) {
    let settings = JSON.parse(localStorage.getItem("settings"));

    if (settings.console) {
        addConsole();
    }
}

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
        try {
            document.getElementById("themeToggle").innerText = "Dark Mode";
        } catch (e) {
            
        }
    } else {
        document.getElementsByTagName("html")[0].setAttribute('data-theme', 'default');
        try {
            document.getElementById("themeToggle").innerText = "Light Mode";
        } catch (e) {
            
        }
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
}

function unregisterServiceWorkers() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations()
          .then(function(registrations) {
            for (let registration of registrations) {
              registration.unregister()
                .then(function(success) {
                  if (success) {
                    console.log('Service worker unregistered successfully:', registration);
                  } else {
                    console.log('Service worker unregistration failed:', registration);
                  }
                });
            }
          })
          .catch(function(error) {
            console.log('Error getting service workers:', error);
          });
      } else {
        console.log('Service workers are not supported in this browser.');
      }
}

window.onload = () => {
    applySettings();
}
