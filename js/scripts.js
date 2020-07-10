function changeColorHelper(color, time) {
    setTimeout(function() {
        let innerFlame = document.getElementsByClassName("inner flame")[0];
        innerFlame.setAttribute("style", "background-color: " + color + "; box-shadow: 0px 0px 9px 4px " + color + ";");
    }, time);
}

function changeColor() {
    changeColorHelper("#00e600", 1500);
    changeColorHelper("#6495ED", 3000);
}