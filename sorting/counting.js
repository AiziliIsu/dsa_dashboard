// Asynchronous function to perform counting sort
async function counting() {
    console.log('In countingSort()');
    const ele = document.querySelectorAll(".bar");

    // Find the maximum element to determine the range
    let max = parseInt(ele[0].style.height);
    for (let i = 1; i < ele.length; i++) {
        if (parseInt(ele[i].style.height) > max) {
            max = parseInt(ele[i].style.height);
        }
    }

    // Initialize count array and output array
    const count = new Array(max + 1).fill(0);
    const output = new Array(ele.length);

    // Count occurrences of each element
    for (let i = 0; i < ele.length; i++) {
        count[parseInt(ele[i].style.height)]++;
    }

    // Update count array to store the actual position of each element
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = ele.length - 1; i >= 0; i--) {
        output[count[parseInt(ele[i].style.height)] - 1] = ele[i].style.height;
        count[parseInt(ele[i].style.height)]--;

        // Pause for visualization
        await waitforme(delay);
    }

    // Update the original array with sorted elements
    for (let i = 0; i < ele.length; i++) {
        ele[i].style.height = output[i];
        ele[i].style.background = 'lightgreen';

        // Pause for visualization
        await waitforme(delay);
    }
}

// Event listener for Counting Sort button
const countingSortBtn = document.querySelector(".countingSort");
countingSortBtn.addEventListener('click', async function(){
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await counting();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
