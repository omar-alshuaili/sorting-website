let board = document.querySelector(".bottom")
let main = document.getElementsByTagName('main')[0].clientHeight
let h = board.clientHeight / main * 100
let boradWidth = parseInt(board.clientWidth / 10)

let circle_slider = document.getElementById('circle').oninput = function () {
    var value = (this.value - this.min) / (this.max - this.min) / 100
    boradWidth = parseInt(board.clientWidth / 10) * Math.max(this.value, 10) / 100
    clearBoard()
    creatBoard()
}

if (boradWidth % 2 != 0) {
    boradWidth -= 1
}




let sort_algo = document.getElementById('sort_algo')
let sort_algo_choices = ['Bubble sort', 'Quick sort', 'Other sort']
sort_algo.innerHTML = sort_algo_choices[0]

let algo_back_button = document.getElementById("algo_back_button")
let algo_next_button = document.getElementById("algo_next_button")


algo_back_button.addEventListener('click', async () => {
    sort_algo.classList.remove('sort_algo');
    const x = await resolveAfter2Seconds();
    let choice = sort_algo_choices.indexOf(sort_algo.innerHTML)
    choice--;
    if (choice < 0) {
        choice = sort_algo_choices.length - 1;
    }
    sort_algo.innerHTML = sort_algo_choices[choice]
    sort_algo.classList.add('sort_algo')

})

algo_next_button.addEventListener('click', async () => {
    sort_algo.classList.remove('sort_algo');
    const x = await resolveAfter2Seconds();

    let choice = sort_algo_choices.indexOf(sort_algo.innerHTML)
    choice++;
    if (choice > sort_algo_choices.length - 1) {
        choice = 0;
    }
    sort_algo.innerHTML = sort_algo_choices[choice]
    sort_algo.classList.add('sort_algo')
})





let speed = document.getElementById('speed')
let speed_choices = ['One by one', 'Slow', 'Medium', 'High']
speed.innerHTML = speed_choices[0]

let speed_back_button = document.getElementById("speed_back_button")
let speed_next_button = document.getElementById("speed_next_button")

speed_back_button.addEventListener('click', async () => {
    speed.classList.remove('sort_algo');
    const x = await resolveAfter2Seconds();
    let choice = speed_choices.indexOf(speed.innerHTML)
    choice--;
    if (choice < 0) {
        choice = speed_choices.length - 1;
    }
    speed.innerHTML = speed_choices[choice]
    speed.classList.add('sort_algo')

})

speed_next_button.addEventListener('click', async () => {
    speed.classList.remove('sort_algo');
    const x = await resolveAfter2Seconds();

    let choice = speed_choices.indexOf(speed.innerHTML)
    choice++;
    if (choice > speed_choices.length - 1) {
        choice = 0;
    }
    speed.innerHTML = speed_choices[choice]
    speed.classList.add('sort_algo')
})



let clear_btn = document.getElementById('clear_btn')
let fill_btn = document.getElementById('fill_btn')
let start_btn = document.getElementById('start_btn')

clear_btn.addEventListener('click', clearBoard)
fill_btn.addEventListener('click', creatBoard)
start_btn.addEventListener('click', solveBoard)
clear_btn.classList.add('disable-div')
start_btn.classList.add('disable-div')
function creatBoard() {
    for (let i = 0; i < boradWidth; i++) {
        let height = Math.floor(Math.random() * 100) + 1;

        let col = document.createElement('div')
        col.classList.add('col')
        col.style.height = height + '%'
        board.appendChild(col)
    }
    fill_btn.classList.add('disable-div')
    clear_btn.classList.remove('disable-div')
    start_btn.classList.remove('disable-div')

}

function clearBoard() {
    board.replaceChildren();
    clear_btn.classList.add('disable-div')
    fill_btn.classList.remove('disable-div')
    start_btn.classList.add('disable-div')

}


async function solveBoard() {
    let cols = document.querySelectorAll('.bottom .col');
    start_btn.classList.add('disable-div')

    if (sort_algo.innerHTML === 'Bubble sort') {
        BubbleSort();
    }
    else {
        quickSort(cols, 0, cols.length - 1)
        // console.log(board)
    }

}

async function quickSort(cols, from, to) {
    if (from < to) {
        // console.log(from, to
        pivot_location = await Partition(cols, from, to)
        // console.log(pivot_location)
        await quickSort(cols, from, pivot_location - 1)
        await quickSort(cols, pivot_location + 1, to)
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function quickSort(cols, from, to) {
    if (from < to) {
        const pivot_location = await Partition(cols, from, to);
        await quickSort(cols, from, pivot_location - 1);
        await quickSort(cols, pivot_location + 1, to);
    }
}

async function Partition(cols, from, to) {
    let temp = from;
    cols[temp].classList.add('pivot');

    while (from < to) {
        cols[from].classList.remove('current');
        cols[to].classList.remove('next');
        if (
            parseInt(cols[from + 1].style.height) * h >
            parseInt(cols[temp].style.height) * h &&
            parseInt(cols[temp].style.height) * h <
            parseInt(cols[to].style.height) * h
        ) {
            let delay = 0;
            if (speed_choices.indexOf(speed.innerHTML) === 0) {
                delay = 1000;
            } else if (speed_choices.indexOf(speed.innerHTML) === 1) {
                delay = 50;
            } else if (speed_choices.indexOf(speed.innerHTML) === 2) {
                delay = 10;
            }
            await sleep(delay); // Introduce a delay here.
            swap(cols, from, to);
            cols[from].classList.add('current');
            cols[to].classList.add('next');
        } else {
            temp++;
        }

        from++;
        to--;
    }
    cols[temp].classList.remove('pivot');
    return temp;
}

async function swap(cols, a, b) {
    let temp = cols[a].style.height;
    cols[a].style.height = cols[b].style.height;
    cols[b].style.height = temp;
}




async function BubbleSort() {
    let cols = document.querySelectorAll('.bottom .col');
    console.log(cols.length)

    for (let j = 0; j < cols.length; j++) {
        for (let i = 0; i < cols.length - 1; i++) {
            cols[i].classList.add('current')
            cols[i + 1].classList.add('next')
            let delay = 0;
            console.log(speed_choices.indexOf(speed.innerHTML))
            if (speed_choices.indexOf(speed.innerHTML) === 0) {
                delay = 1000;

            }
            else if (speed_choices.indexOf(speed.innerHTML) === 1) {
                delay = 50
            }
            else if (speed_choices.indexOf(speed.innerHTML) === 2) delay = 10
            const result = await Makedelay(delay);
            if (parseInt(cols[i].style.height) * h > parseInt(cols[i + 1].style.height) * h) {
                let temp = cols[i].style.height
                cols[i].style.height = cols[i + 1].style.height
                cols[i + 1].style.height = temp

            }
            cols[i].classList.remove('current')
            cols[i + 1].classList.remove('next')

            if (sorted(cols)) {
                for (let j = 0; j < cols.length; j++) {
                    cols[j].classList.add('current')
                    await resolveAfter2Seconds();
                }
                break;
            }
        }
    }
}
function sorted(cols) {
    for (let j = 0; j < cols.length - 1; j++) {
        if (parseInt(cols[j].style.height) > parseInt(cols[j + 1].style.height)) {
            return false;
        }
    }
    return true;
}
function resolveAfter2Seconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, 1);
    });
}

function Makedelay(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, time);
    });
}
