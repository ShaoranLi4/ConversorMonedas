document.addEventListener('DOMContentLoaded', () => {
    const inputAmount = document.getElementById('inputAmount');
    const outputAmount = document.getElementById('outputAmount');
    const buttons = document.querySelectorAll('button');

    let amount = '';
    let rates = {};

    // Fetch exchange rates from the API
    fetch('https://v6.exchangerate-api.com/v6/37cfa12930bb01ea731f686d/latest/MXN')
        .then(response => response.json())
        .then(data => {
            rates = data.conversion_rates;
            console.log('Exchange rates:', rates);
        })
        .catch(error => console.error('Error fetching exchange rates:', error));

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('num')) {
                amount += button.getAttribute('data-value');
                inputAmount.value = amount + ' MXN';
            } else if (button.id === 'clear') {
                amount = '';
                inputAmount.value = '';
                outputAmount.value = '';
            } else if (button.classList.contains('currency')) {
                const currency = button.getAttribute('data-currency');
                convertCurrency(amount, currency);
            }
        });
    });

    function convertCurrency(amount, currency) {
        if (!amount) return;

        const mxnAmount = parseFloat(amount);
        const convertedAmount = mxnAmount * (rates[currency] || 1);
        outputAmount.value = convertedAmount.toFixed(2) + ' ' + currency;
    }
});
