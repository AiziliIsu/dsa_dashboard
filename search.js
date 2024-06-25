const linearSearchVisualization = document.getElementById('linear-search-visualization');
const binarySearchVisualization = document.getElementById('binary-search-visualization');
const explanationArea = document.getElementById('explanation');

const generateLinearArrayBtn = document.getElementById('generate-linear-array');
const generateBinaryArrayBtn = document.getElementById('generate-binary-array');
const targetValueInput = document.getElementById('target-value');
const searchLinearBtn = document.getElementById('search-linear');
const searchBinaryBtn = document.getElementById('search-binary');

let linearArray = [];
let binaryArray = [];

function generateLinearArray(size = 10, maxValue = 100) {
    linearArray = [];
    linearSearchVisualization.innerHTML = ''; // Clear visualization
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * maxValue) + 1;
        linearArray.push(value);
        renderBar(value, linearSearchVisualization);
    }
}

function generateBinaryArray(size = 10, maxValue = 100) {
    binaryArray = [];
    binarySearchVisualization.innerHTML = ''; // Clear visualization
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * maxValue) + 1;
        binaryArray.push(value);
    }
    binaryArray.sort((a, b) => a - b); // Sort array in ascending order
    binaryArray.forEach(value => renderBar(value, binarySearchVisualization));
}

function renderBar(value, container) {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    if (container === binarySearchVisualization) {
        bar.classList.add('sorted'); // Add sorted class for binary search visualization
    }
    bar.textContent = value;
    container.appendChild(bar);
}

function linearSearch() {
    const targetValue = parseInt(targetValueInput.value);
    let found = false;
    explanationArea.textContent = '';

    linearArray.forEach((value, index) => {
        if (value === targetValue && !found) {
            const bar = linearSearchVisualization.children[index];
            bar.classList.add('found');
            explanationArea.textContent = `Linear search: ${targetValue} found at index ${index}.`;
            found = true;
        }
    });

    if (!found) {
        explanationArea.textContent = `Linear search: ${targetValue} not found.`;
    }
}

function binarySearch() {
    const targetValue = parseInt(targetValueInput.value);
    let left = 0;
    let right = binaryArray.length - 1;
    explanationArea.textContent = '';

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = binaryArray[mid];
        if (midValue === targetValue) {
            const bar = binarySearchVisualization.children[mid];
            bar.classList.add('found');
            explanationArea.textContent = `Binary search: ${targetValue} found at index ${mid}.`;
            return;
        } else if (midValue < targetValue) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    explanationArea.textContent = `Binary search: ${targetValue} not found.`;
}

generateLinearArrayBtn.addEventListener('click', () => generateLinearArray());
generateBinaryArrayBtn.addEventListener('click', () => generateBinaryArray());
searchLinearBtn.addEventListener('click', () => linearSearch());
searchBinaryBtn.addEventListener('click', () => binarySearch());
