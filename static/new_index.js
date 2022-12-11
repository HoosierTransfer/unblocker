particlesJS("particles-js", { "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#BF616A" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#D08770", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "bounce", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false, "mode": "grab" }, "onclick": { "enable": false, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": false });

// localStorage.clear();

try {
/**
 * filters the image buttons based on the search bar.           
 * @returns None           
 */
const image_buttons = document.getElementsByClassName("imagebutton");

const search_bar = document.getElementById("search");
search_bar.oninput = function() {
for(var i = 0; i < image_buttons.length; i++) {
        image_buttons[i].style.display = "inline";
        if(!(image_buttons[i].innerHTML.toLowerCase().replace(/\s+/g, '').includes(search_bar.value.toLowerCase().replace(/\s+/g, ''))) && search_bar.value != '') {
            //alert(image_buttons[i].style.display);
            image_buttons[i].style.display = "none";
        }
    }
}
}
catch {

}
try {

const uv_bar = document.getElementById("searchuv");
const search_dropdown = document.getElementById("prev");

function fil(value) {
    return value.toLowerCase().includes(uv_bar.value.toLowerCase());
}

/**
 * Takes in an event and checks if the key pressed is enter.       
 * If it is, it adds the value of the input to the local storage.       
 * @param {Event} event - the event that is passed in.       
 * @returns None       
 */
function clickPress(event) {
    if (event.key == "Enter") {
        if(localStorage.getItem('searches') == null) {
            localStorage.setItem('searches', JSON.stringify([uv_bar.value, ""]));
        } else {
            var tmp = JSON.parse(localStorage.getItem('searches'));
            tmp.push(uv_bar.value);
            localStorage.setItem('searches', JSON.stringify(tmp));
            // alert(tmp);
        }
    }
}

/**
 * Handles the input of the search bar.           
 * @returns None           
 */
uv_bar.oninput = function() {
    var tmp_ = JSON.parse(localStorage.getItem('searches'));
    if(tmp_.filter(fil)[0] != undefined)
    {
        document.getElementById("1_").innerText = tmp_.filter(fil)[0];
        document.getElementById("1_").onclick = "location.href=__uv$config.prefix + __uv$config.encodeUrl('https://"+tmp_.filter(fil)[0] + "'); timer()";
    }
    else{
        document.getElementById("3_").onclick = '';
        document.getElementById("1_").innerText = '';
    }
    if(tmp_.filter(fil)[1] != undefined){
        document.getElementById("2_").innerText = tmp_.filter(fil)[1];
        document.getElementById("2_").onclick = "location.href=__uv$config.prefix + __uv$config.encodeUrl('https://"+tmp_.filter(fil)[1] + "'); timer()";
    }
    else {
        document.getElementById("3_").onclick = '';
        document.getElementById("2_").innerText = '';
    }
    if(tmp_.filter(fil)[2] != undefined) {
        document.getElementById("3_").innerText = tmp_.filter(fil)[2];
        document.getElementById("3_").onclick = "location.href=__uv$config.prefix + __uv$config.encodeUrl('https://"+tmp_.filter(fil)[2] + "'); timer()";
    }
    else {
        document.getElementById("3_").onclick = '';
        document.getElementById("3_").innerText = '';
    }

    if(uv_bar.value != "") {
        search_dropdown.style.height = "200px";
        search_dropdown.style.padding = "12px 15px";
        search_dropdown.style.visibility = "visible";
        uv_bar.style.borderRadius = "5px 5px 0px 0px";
    } else {
        search_dropdown.style.height = "0px";
        search_dropdown.style.padding = "0px 15px";
        search_dropdown.style.visibility = "hidden";
        setTimeout(function () {
            uv_bar.style.borderRadius = "5px 5px 5px 5px";
    }, 400)
}
// for(var i = 0; i < localStorage.getItem("prev_searches"); i++) {
//     image_buttons[i].style.display = "inline";
//     if(!(image_buttons[i].innerHTML.toLowerCase().replace(/\s+/g, '').includes(search_bar.value.toLowerCase().replace(/\s+/g, ''))) && search_bar.value != '') {
//         //alert(image_buttons[i].style.display);
//         image_buttons[i].style.display = "none";
//     }
// }
} 
}
catch {

}