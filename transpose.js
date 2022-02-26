function onconvert() {
    let steps = parseInt(document.getElementById('get-interval').value);
    let input = document.getElementById('input');
    let output = document.getElementById('output');

    notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
    notes2 = ['A2', 'A#2', 'B2', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2']

    function shift_index(initial_index, shift_value, arr_len = 12) {
        let final_index = initial_index;
        function inc_1(index) {
            if (index === arr_len - 1) {//checking ifthe element is last element
                return 0;
            } else {
                return index + 1;
            }
        }
        function dec_1(index) {
            if (index === 0) {//checking ifthe element is first element
                return arr_len - 1;
            } else {
                return index - 1;
            }
        }
        if (shift_value > 0) {
            for (let i = 0; i < shift_value; i++) {
                final_index = inc_1(final_index);
            }
        }
        if (shift_value < 0) {
            for (let i = 0; i < -1 * shift_value; i++) {
                final_index = dec_1(final_index);
            }
        }
        return final_index;
    }



    let final_out = []

    let in_lines = input.value.split('\n');
    // console.log(in_lines);
    for (let line in in_lines) {
        let in_arr = in_lines[line].trim().split(' ');
        // console.log(in_arr);
        for (i in in_arr) {
            in_arr[i] = in_arr[i].trim();
            in_arr[i] = in_arr[i].toUpperCase();
            // console.log(in_arr);
        }
        let out_arr = [];
        for (i in in_arr) {
            if (notes.includes(in_arr[i])) {
                let index = notes.findIndex(element => element === in_arr[i]);

                out_arr.push(notes[shift_index(index, steps)])

            }
            if (notes2.includes(in_arr[i])) {
                let index = notes2.findIndex(element => element === in_arr[i]);

                out_arr.push(notes2[shift_index(index, steps)])

            }

        }
        final_out.push('\n'+out_arr.toString());

    }
    output.value = final_out.toString();
}


