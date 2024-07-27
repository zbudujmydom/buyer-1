const form = document.querySelector("#converter");
const resultText = document.getElementById("result");
const errorText = document.getElementById("converterError");
const submitButton = document.getElementById("submitButton");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // blokuje przeładowanie strony

  submitButton.disabled = true;
  errorText.textContent = "";

  const amount = Number(event.target.amount.value);
  const currency = event.target.currency.value;

  //   fetch("https://api.nbp.pl/api/exchangerates/rates/A/" + currency);
  fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${currency}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject();
    })
    .then((data) => {
      const isDataValid = data.rates?.length > 0 && data.rates[0].mid;

      if (isDataValid) {
        const rate = data.rates[0].mid;
        const result = (amount * rate).toFixed(2);

        resultText.textContent = `${result} PLN`;
      }
    })
    .catch(() => {
      errorText.textContent = "Błąd";
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});
