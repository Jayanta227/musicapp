document.addEventListener('DOMContentLoaded', () => {
    let maj = [2, 2, 1, 2, 2, 2, 1];
    let min = [2, 1, 2, 2, 1, 2, 2];
    let notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    let maj_ch = ['M', 'm', 'm', 'M', 'M', 'm', 'D'];
    let min_ch = ['m', 'D', 'M', 'm', 'm', 'M', 'M'];
    let key = document.querySelector('#scale-select');
    let maj_min = document.querySelector('#maj-min');
    let labelc = document.querySelector('#label-chords');//chords label
    let labeln = document.querySelector('#label-notes');//notes label

    function build_chords(arr, m) {
        let temp = [];
        temp = [...arr];
        if (m == 'major') { m = maj_ch } else { m = min_ch; }
        for (let i = 0; i < arr.length; i++) {
            temp[i] += m[i];
        }
        return temp;
    };
    function build_notes(k, m) {//k is key m is maj or min
        let ind = notes.indexOf(k);
        let temp_notes = [];
        for (let i = 0, j = ind; i < 12; i++) {
            temp_notes[i] = notes[j]
            if (j == 11) {
                j = 0;
            }
            else { j++; }
        }
        let temp = [];
        let shift = 0;
        for (let i = 0; i < 7; i++) {
            temp[i] = temp_notes[shift];
            if (m == 'major') {
                shift += maj[i];
            } else {
                shift += min[i];
            }
        }
        return temp;
    }

    {   //this block is created just to use local scope
        tempn = build_notes(key.value, maj_min.value);
        tempc = build_chords(tempn, maj_min.value);
        for(let i = 0;i<tempc.length; i++){
            let lc = document.createElement('label');
            lc.innerText = tempc[i];
            document.querySelector('.chords').appendChild(lc);

            let ln = document.createElement('label');
            ln.innerText = tempn[i];
            document.querySelector('.notes').appendChild(ln);
        }
    }
    
    
    key.addEventListener('change', () => {
        document.querySelector('.chords').innerHTML = "<span>Chords</span>";//remove all existing child label nodes
        document.querySelector('.notes').innerHTML = "<span>Notes</span>";//remove all existing child label nodes
        let tempn = build_notes(key.value, maj_min.value);
        let tempc = build_chords(tempn, maj_min.value);
        
        // labeln.innerHTML = tempn;
        // labelc.innerHTML = build_chords(tempn, maj_min.value);
        for(let i = 0;i<tempc.length; i++){
            let lc = document.createElement('label');
            lc.innerText = tempc[i];
            document.querySelector('.chords').appendChild(lc);

            let ln = document.createElement('label');
            ln.innerText = tempn[i];
            document.querySelector('.notes').appendChild(ln);
        }
    });
    maj_min.addEventListener('change', () => {
        document.querySelector('.chords').innerHTML = "<span>Chords</span>";//remove all existing child label nodes
        document.querySelector('.notes').innerHTML = "<span>Notes</span>";//remove all existing child label nodes
        let tempn = build_notes(key.value, maj_min.value);
        let tempc = build_chords(tempn, maj_min.value);

        for(let i = 0;i<tempc.length; i++){
            let lc = document.createElement('label');
            lc.innerText = tempc[i];
            document.querySelector('.chords').appendChild(lc);

            let ln = document.createElement('label');
            ln.innerText = tempn[i];
            document.querySelector('.notes').appendChild(ln);
        }
    });
});