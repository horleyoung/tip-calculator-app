const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.percent');
const customInput = document.querySelector('.custom-input');
const tipAmountDisplay = document.querySelector('.cost .price');
const totalAmountDisplay = document.querySelectorAll('.cost .price')[1];
const resetButton = document.querySelector('button[type="submit"]');

let selectedTip = 0;

// Handle clicking a tip button
tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // If it's the custom input, ignore it
        if (btn.contains(customInput)) return;

        selectedTip = parseFloat(btn.dataset.value);
        calculateTip();
    });
});

// Handle typing into custom tip field
customInput.addEventListener('input', () => {
    selectedTip = parseFloat(customInput.value) || 0;
    calculateTip();
});

customInput.addEventListener('input', () => {
    const customValue = parseFloat(customInput.value);
    if (!isNaN(customValue) && customValue > 0) {
        selectedTip = customValue;
        calculateTip();
    }
});


// Calculate tip per person and total per person
function calculateTip() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);

    if (bill > 0 && people > 0) {
        const tipTotal = (bill * selectedTip) / 100;
        const tipPerPerson = tipTotal / people;
        const totalPerPerson = (bill + tipTotal) / people;

        tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
    }
}

// Reset everything
resetButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission

    billInput.value = '';
    peopleInput.value = '';
    customInput.value = '';
    selectedTip = 0;

    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
});
