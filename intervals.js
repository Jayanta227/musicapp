var pi = document.querySelectorAll('.practice-interval');
var temp_value1 = [0,1,2,3,4,5,6,7,8,9,10,11,12];
var temp_value2 = [0,1,2,3,4,5,6,7,8,9,10,11,12];
const freq = {
    C: 261.63,
    CS: 277.18,
    D: 293.66,
    DS: 311.13,
    E: 329.63,
    F: 349.23,
    FS: 369.99,
    G: 392.00,
    GS: 415.30,
    A: 440.00,
    AS: 466.16,
    B: 493.88,
    C1: 523.25,
    C1S: 554.37,
    D1: 587.33,
    D1S: 622.25,
    E1: 659.25,
    F1: 698.46,
    F1S: 739.99,
    G1: 783.99,
    G1S: 830.61,
    A1: 880.00,
    A1S: 932.33,
    B1: 987.77,
    C2: 1046.50,
}

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
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1);
        this.oscillator.stop(this.context.currentTime + 1);
    }
}

let context = new (window.AudioContext || window.webkitAudioContext)();
function playSound(note) {
    let sound = new Sound(context);
    sound.play(note);
    sound.stop();
}

var freq_list = Object.keys(freq); //creating an array from the object property
var rand_index = function (max) { return max * Math.random() << 0; } //return a random index between 0 and calculated maximum

var randomKey = function (obj) {
    return freq_list[freq_list.length * Math.random() << 0];
};

for (var i = 0; i < pi.length; i++) {
    pi[i].id = 'pi' + i;
    pi[i].addEventListener('click', function (e) {
        var id = parseInt(this.id.match(/\d+/)[0]);
        var child = this.children[0];

        child.style.width = "50px";
        setTimeout(function () { child.style.width = "100%"; }, 300);

        index = rand_index(freq_list.length - id);
        let value1 = freq[freq_list[index]];
        temp_value1[id] = value1;
        playSound(value1);


        let value2 = freq[freq_list[index + id]];
        temp_value2[id] = value2;
        setTimeout(function () {
            playSound(value2)
        }, 600);

        console.log('interval: '+id+' values: '+value1+', '+value2+' ratio: '+value2/value1);
        
    });

}


let repeat = document.querySelectorAll('.repeat');
for(let i=0;i<repeat.length;i++){
    repeat[i].id = 're' + i
    repeat[i].addEventListener('click', function(){
        let id = parseInt(this.id.match(/\d+/)[0]);
        playSound(temp_value1[id]);
        setTimeout(function(){
            playSound(temp_value2[id]);
        }, 600)
    });
}