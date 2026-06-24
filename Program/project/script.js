const stage = document.getElementById('stage');
const generateBtn = document.getElementById('generate-btn');
const bubbleBtn = document.getElementById('bubble-btn');
const selectionBtn = document.getElementById('selection-btn');

let array = [];
const ARRAY_SIZE = 20; // Number of bars

// 1. Random Array Generate karne ka function
function generateNewArray() {
    stage.innerHTML = ''; // Purane bars clear karo
    array = [];
    
    for (let i = 0; i < ARRAY_SIZE; i++) {
        // 20 se 280 tak random height values
        let val = Math.floor(Math.random() * 260) + 20; 
        array.push(val);
        
        // HTML Element (Bar) banana
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${val}px`;
        bar.id = `bar-${i}`;
        stage.appendChild(bar);
    }
    enableButtons();
}

// 2. Animation Delay dene ke liye Utility Function (Asynchronous programming)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Buttons disable karne ke liye jab sorting chal rahi ho
function disableButtons() {
    bubbleBtn.disabled = true;
    selectionBtn.disabled = true;
    generateBtn.disabled = true;
}

function enableButtons() {
    bubbleBtn.disabled = false;
    selectionBtn.disabled = false;
    generateBtn.disabled = false;
}

// ==========================================
// ALGORITHM 1: BUBBLE SORT LOGIC
// ==========================================
async function bubbleSort() {
    disableButtons();
    let bars = document.querySelectorAll('.bar');
    
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            
            // Dono comparing bars ko Red karo
            bars[j].style.backgroundColor = '#ef4444';
            bars[j+1].style.backgroundColor = '#ef4444';
            
            await sleep(50); // Speed control

            if (array[j] > array[j+1]) {
                // Array values swap karo
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                
                // DOM/Screen par height swap karo
                bars[j].style.height = `${array[j]}px`;
                bars[j+1].style.height = `${array[j+1]}px`;
            }
            
            // Wapas normal color (Blue) karo
            bars[j].style.backgroundColor = '#38bdf8';
            bars[j+1].style.backgroundColor = '#38bdf8';
        }
        // Jo element sorted apni sahi jagah par aa gaya use Green karo
        bars[array.length - i - 1].style.backgroundColor = '#22c55e';
    }
    bars[0].style.backgroundColor = '#22c55e'; // Last element green
    generateBtn.disabled = false;
}

// ==========================================
// ALGORITHM 2: SELECTION SORT LOGIC
// ==========================================
async function selectionSort() {
    disableButtons();
    let bars = document.querySelectorAll('.bar');

    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        bars[i].style.backgroundColor = '#ef4444'; // Current minimum red

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = '#f59e0b'; // Scanning color (Yellow)
            await sleep(30);

            if (array[j] < array[minIdx]) {
                if (minIdx !== i) {
                    bars[minIdx].style.backgroundColor = '#38bdf8'; // Purana min normal blue
                }
                minIdx = j;
                bars[minIdx].style.backgroundColor = '#ef4444'; // Naya min red
            } else {
                bars[j].style.backgroundColor = '#38bdf8';
            }
        }

        if (minIdx !== i) {
            let temp = array[i];
            array[i] = array[minIdx];
            array[minIdx] = temp;

            bars[i].style.height = `${array[i]}px`;
            bars[minIdx].style.height = `${array[minIdx]}px`;
        }
        
        bars[minIdx].style.backgroundColor = '#38bdf8';
        bars[i].style.backgroundColor = '#22c55e'; // Final sorted position green
    }
    generateBtn.disabled = false;
}

// Event Listeners
generateBtn.addEventListener('click', generateNewArray);
bubbleBtn.addEventListener('click', bubbleSort);
selectionBtn.addEventListener('click', selectionSort);

// Pehli baar page khulte hi array generate ho jaye
generateNewArray();