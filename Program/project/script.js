// ==========================================
// GLOBALS & DOM INITIALIZATION
// ==========================================
const stage = document.getElementById('stage');
const generateBtn = document.getElementById('generate-btn');
const algoButtons = document.querySelectorAll('.algo-btn');

let array = [];
const ARRAY_SIZE = 15; 
const ANIMATION_SPEED = 50; // 🚀 SPEED UP: Changed from 120ms to 20ms for blazing fast results!

// ==========================================
// CORE UTILITIES
// ==========================================

function generateNewArray() {
    stage.innerHTML = '';
    array = [];
    
    for (let i = 0; i < ARRAY_SIZE; i++) {
        let val = Math.floor(Math.random() * 85) + 15; 
        array.push(val);
        
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${val * 2.8}px`; 
        bar.textContent = val; 
        bar.id = `bar-${i}`;
        stage.appendChild(bar);
    }
    enableUI();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function disableUI() {
    if(generateBtn) generateBtn.disabled = true;
    algoButtons.forEach(btn => btn.disabled = true);
}

function enableUI() {
    if(generateBtn) generateBtn.disabled = false;
    algoButtons.forEach(btn => btn.disabled = false);
}

function updateBarVisual(index, value, color) {
    let bar = document.getElementById(`bar-${index}`);
    if(bar) {
        if(value !== null) {
            bar.style.height = `${value * 2.8}px`;
            bar.textContent = value;
        }
        if(color) bar.style.backgroundColor = color;
    }
}

// ==========================================
// SPEED-OPTIMIZED ALGORITHMS
// ==========================================

// 1. BUBBLE SORT
async function bubbleSort() {
    disableUI();
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            updateBarVisual(j, null, '#ef4444');
            updateBarVisual(j+1, null, '#ef4444');
            await sleep(ANIMATION_SPEED);

            if (array[j] > array[j+1]) {
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                
                updateBarVisual(j, array[j], '#ef4444');
                updateBarVisual(j+1, array[j+1], '#ef4444');
            }
            updateBarVisual(j, null, '#38bdf8');
            updateBarVisual(j+1, null, '#38bdf8');
        }
        updateBarVisual(array.length - i - 1, null, '#22c55e');
    }
    updateBarVisual(0, null, '#22c55e');
    enableUI();
}

// 2. SELECTION SORT
async function selectionSort() {
    disableUI();
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        updateBarVisual(i, null, '#ef4444'); 

        for (let j = i + 1; j < array.length; j++) {
            updateBarVisual(j, null, '#eab308'); 
            await sleep(ANIMATION_SPEED);

            if (array[j] < array[minIdx]) {
                if (minIdx !== i) updateBarVisual(minIdx, null, '#38bdf8');
                minIdx = j;
                updateBarVisual(minIdx, null, '#ef4444');
            } else {
                updateBarVisual(j, null, '#38bdf8');
            }
        }
        if (minIdx !== i) {
            let temp = array[i];
            array[i] = array[minIdx];
            array[minIdx] = temp;

            updateBarVisual(i, array[i], null);
            updateBarVisual(minIdx, array[minIdx], null);
        }
        updateBarVisual(minIdx, null, '#38bdf8');
        updateBarVisual(i, null, '#22c55e'); 
    }
    enableUI();
}

// 3. INSERTION SORT
async function insertionSort() {
    disableUI();
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        
        updateBarVisual(i, null, '#eab308');
        await sleep(ANIMATION_SPEED);

        while (j >= 0 && array[j] > key) {
            updateBarVisual(j, null, '#ef4444');
            array[j + 1] = array[j];
            updateBarVisual(j + 1, array[j + 1], '#ef4444');
            await sleep(ANIMATION_SPEED);
            
            updateBarVisual(j + 1, null, '#38bdf8');
            j--;
        }
        array[j + 1] = key;
        updateBarVisual(j + 1, array[j + 1], '#22c55e');
    }
    for(let k=0; k<array.length; k++) updateBarVisual(k, null, '#22c55e');
    enableUI();
}

// 4. QUICK SORT
async function quickSortPartition(low, high) {
    let pivot = array[high];
    updateBarVisual(high, null, '#ef4444'); 
    let i = low - 1;

    for (let j = low; j < high; j++) {
        updateBarVisual(j, null, '#eab308'); 
        await sleep(ANIMATION_SPEED);

        if (array[j] < pivot) {
            i++;
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            
            updateBarVisual(i, array[i], '#ef4444');
            updateBarVisual(j, array[j], '#38bdf8');
        } else {
            updateBarVisual(j, null, '#38bdf8');
        }
    }
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    updateBarVisual(i + 1, array[i + 1], '#22c55e'); 
    updateBarVisual(high, array[high], '#38bdf8');

    return i + 1;
}

async function quickSortHelper(low, high) {
    if (low < high) {
        let pi = await quickSortPartition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
    } else if (low >= 0 && low < array.length) {
        updateBarVisual(low, null, '#22c55e');
    }
}

async function startQuickSort() {
    disableUI();
    await quickSortHelper(0, array.length - 1);
    for(let k=0; k<array.length; k++) updateBarVisual(k, null, '#22c55e');
    enableUI();
}

// 5. MERGE SORT
async function merge(start, mid, end) {
    let tempArray = [];
    let i = start;
    let j = mid + 1;

    for (let k = start; k <= end; k++) {
        updateBarVisual(k, null, '#eab308');
    }
    await sleep(ANIMATION_SPEED);

    while (i <= mid && j <= end) {
        updateBarVisual(i, null, '#ef4444');
        updateBarVisual(j, null, '#ef4444');
        await sleep(ANIMATION_SPEED);

        if (array[i] <= array[j]) {
            tempArray.push(array[i]);
            i++;
        } else {
            tempArray.push(array[j]);
            j++;
        }
    }

    while (i <= mid) {
        tempArray.push(array[i]);
        i++;
    }
    while (j <= end) {
        tempArray.push(array[j]);
        j++;
    }

    for (let k = start; k <= end; k++) {
        array[k] = tempArray[k - start];
        updateBarVisual(k, array[k], '#22c55e'); 
    }
}

async function mergeSortHelper(start, end) {
    if (start >= end) return;
    let mid = Math.floor((start + end) / 2);
    
    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);
    await merge(start, mid, end);
}

async function startMergeSort() {
    disableUI();
    await mergeSortHelper(0, array.length - 1);
    for(let k=0; k<array.length; k++) updateBarVisual(k, null, '#22c55e');
    enableUI();
}

// 6. SHELL SORT
async function shellSort() {
    disableUI();
    let n = array.length;

    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i += 1) {
            let temp = array[i];
            let j;
            
            updateBarVisual(i, null, '#ef4444'); 
            updateBarVisual(i - gap, null, '#eab308'); 
            await sleep(ANIMATION_SPEED);

            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
                updateBarVisual(j, array[j], '#ef4444');
                updateBarVisual(j, null, '#38bdf8');
            }
            
            array[j] = temp;
            updateBarVisual(j, array[j], '#22c55e');
            updateBarVisual(i, null, '#38bdf8');
            if(i - gap >= 0) updateBarVisual(i - gap, null, '#38bdf8');
        }
    }
    for(let k=0; k<array.length; k++) updateBarVisual(k, null, '#22c55e');
    enableUI();
}

// ==========================================
// EVENT LISTENERS & INVOCATION
// ==========================================
if(generateBtn) generateBtn.addEventListener('click', generateNewArray);

const bBtn = document.getElementById('bubble-btn');
if(bBtn) bBtn.addEventListener('click', bubbleSort);

const sBtn = document.getElementById('selection-btn');
if(sBtn) sBtn.addEventListener('click', selectionSort);

const iBtn = document.getElementById('insertion-btn');
if(iBtn) iBtn.addEventListener('click', insertionSort);

const qBtn = document.getElementById('quick-btn');
if(qBtn) qBtn.addEventListener('click', startQuickSort);

const mBtn = document.getElementById('merge-btn');
if(mBtn) mBtn.addEventListener('click', startMergeSort);

const shBtn = document.getElementById('shell-btn');
if(shBtn) shBtn.addEventListener('click', shellSort);

generateNewArray();