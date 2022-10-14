var buttons = document.getElementsByTagName('button');

for (var i = 0; i < buttons.length; i++) {
    var rand = randomInRange(2)
    // buttons[i].style.backgroundColor = 'linear-gradient(to right,' + color[rand].color1 + ',' + color[rand].color2 + ');';
    buttons[i].className = rand ? 'a' : 'b';
    console.log(buttons[i].className);
}

function randomInRange(max) {
    return Math.round(Math.random() * max-1);
}