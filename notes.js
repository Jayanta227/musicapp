var click_count = 0;
var context0;
var osc;

var range = document.querySelector('.tone-create input[type="range"]');
var number = document.querySelector('.tone-create input[type="number"]');
range.addEventListener("change", function(){
    number.value = range.value;
});
number.addEventListener("change", function(){
    range.value = number.value;
});
var geometry = document.querySelector('select[name="geometry"]');
var btn = document.querySelector('#play-pause');
btn.addEventListener('click', function(){
    if (click_count == 0){
        context0 = new (window.AudioContext || window.webkitAudioContext)();
        osc = context0.createOscillator(); // instantiate an oscillator
        osc.type = geometry.value; // this is the default - also square, sawtooth, triangle
        osc.frequency.value = number.value; // Hz
        osc.connect(context0.destination); // connect it to the destination
        osc.start();
        click_count++;
    }
    else {
        osc.stop();
        click_count = 0;
    }
});

// this is the code for the playing each notes....................................
class Sound {

    constructor(context) {
        this.context = context;
    }

    setup() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.oscillator.type = 'sine';
    }

    play(value) {
        this.setup();

        this.oscillator.frequency.value = value;
        this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.01);

        this.oscillator.start(this.context.currentTime);
        this.stop(this.context.currentTime);
    }

    stop() {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 2);
        this.oscillator.stop(this.context.currentTime + 2);
    }
}

let context = new (window.AudioContext || window.webkitAudioContext)();
function playSound(note) {
    let sound = new Sound(context);
    sound.play(note);
    sound.stop();
}





var keys = document.querySelectorAll('.container-keys .keys');
for(var i=0;i<keys.length;i++){
    keys[i].addEventListener('mousedown', generate_tone);
    keys[i].addEventListener('touchstart', generate_tone);
}

var click_count2 = 0;
var context2;
var osc2;

function generate_tone(){
    var octave_number = parseInt(document.querySelector('#choose-octave').value);
    freq = parseFloat(this.getAttribute("id"));
    playSound(freq*octave_number);
}