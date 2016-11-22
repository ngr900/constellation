var skins = ["default","Starry Night","Hot Sparks","Flying Stuff","Clown Car","Love Is In The Air","Azure Pop","Fresh Turboscent","Man of Steel"];
var skin = 0;
function demo(){
	instances = new Array();
	constellationPreset('demo',skins[skin]);
	document.getElementById('info').innerHTML = skins[skin];
	skin++;
	if(skin == 7) skin = 0;
};

function demoR(){
	instances = new Array();
	constellationPreset('demo','random');
	document.getElementById('info').innerHTML = "Random";
};

function demoH(){
	instances = new Array();
	let x = random(0,360);
	constellationHue('demo',x);
	document.getElementById('info').innerHTML = "Random Hue: "+Math.round(x*100)/100;
};

window.addEventListener("keydown",function (evt) {
if(event.keyCode == 82) {
	demoR();
}
});

window.addEventListener("keydown",function (evt) {
if(event.keyCode == 69) {
	demoH();
}
});

window.addEventListener("keydown",function (evt) {
if(event.keyCode == 32) {
	demo();
}
});


demo();