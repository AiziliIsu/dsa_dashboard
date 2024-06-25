// Asynchronous function to perform radix sort
async function radix() {
    console.log('In radixSort()');
    const ele = document.querySelectorAll(".bar");

    // Find the maximum element to know the number of digits
    let max = parseInt(ele[0].style.height);
    for (let i = 1; i < ele.length; i++) {
        if (parseInt(ele[i].style.height) > max) {
            max = parseInt(ele[i].style.height);
        }
    }

    // Perform counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        await countingSort(ele, exp);
    }
}

// Counting sort function to be used by radix sort
async function countingSort(ele, exp) {
    console.log('In countingSort()', exp);
    const n = ele.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    // Count occurrences of each digit in the current place
    for (let i = 0; i < n; i++) {
        let index = Math.floor(parseInt(ele[i].style.height) / exp) % 10;
        count[index]++;
    }

    // Update count array to store the actual position of each digit
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        let index = Math.floor(parseInt(ele[i].style.height) / exp) % 10;
        output[count[index] - 1] = ele[i].style.height;
        count[index]--;
    }

    // Update the original array with sorted elements
    for (let i = 0; i < n; i++) {
        ele[i].style.height = output[i];
        ele[i].style.background = 'lightgreen';

        // Pause for visualization
        await waitforme(delay);
    }
}

// Event listener for Radix Sort button
const radixSortBtn = document.querySelector(".radixSort");
radixSortBtn.addEventListener('click', async function(){
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await radix();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
