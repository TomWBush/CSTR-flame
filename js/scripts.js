function changeColorHelper(color, time) {
    setTimeout(function() {
        let innerFlame = document.getElementsByClassName("inner flame")[0];
        innerFlame.setAttribute("style", "background-color: " + color + "; box-shadow: 0px 0px 9px 4px " + color + ";");
	}, time);
}

function changeColor() {
	for (let i = 0; i < gradient.length; i++) {
		changeColorHelper(gradient[i], (i + 1) * 100);
	}
}

function changeTemp() {
	let innerFlame = document.getElementsByClassName("inner flame")[0];
	let val = document.getElementById("temp-range").value;
	var color = gradient[val];
	innerFlame.setAttribute("style", "background-color: " + color + "; box-shadow: 0px 0px 9px 4px " + color + ";");
}

function setColor(temp) {
	let innerFlame = document.getElementsByClassName("inner flame")[0];
	let val = Math.round(temp / 10000 * (gradient.length-1)); //document.getElementById("temp-range").value;
	if(val > 149){
		val = 149;
	}
	var color = gradient[val];
	innerFlame.setAttribute("style", "background-color: " + color + "; box-shadow: 0px 0px 9px 4px " + color + ";");
}

var gradient = [];

function computeGradient(c1, c2){
	// construct gradient linearly
	let m_red = c2[0] - c1[0];
	let m_green = c2[1] - c1[1];
	let m_blue = c2[2] - c1[2];

	let b_red = c1[0];
	let b_green = c1[1];
	let b_blue = c1[2];

	for(let i = 0.0; i < 50; i++){
		let p = i / 50;
		gradient.push('rgb('+(m_red*p + b_red)+','+(m_green*p + b_green)+','+(m_blue*p +b_blue)+')');
	}
}

c0 = [254,28,0];
c1 = [254,255,11];
c2 = [149,234,253];
c3 = [2,122,254];

computeGradient(c0, c1);
computeGradient(c1, c2);
computeGradient(c2, c3);
