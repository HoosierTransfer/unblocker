let out = false;

function triggerBar() {
  let bottomBar = document.getElementById("bottomHandle");
  bottomBar.style = "transform: translateY(17px);"
  let navbarContainer = document.getElementById("navbarContainer");
  navbarContainer.style = "transform: translateX(-50%) translateY(0%);"
  
  out = true;
}

function untriggerBar() {
    let bottomBar = document.getElementById("bottomHandle");
  bottomBar.style = "transform: translateY(0px);"
  let navbarContainer = document.getElementById("navbarContainer");
  navbarContainer.style = "transform: translateX(-50%) translateY(120%);"
  
  out = false;
}