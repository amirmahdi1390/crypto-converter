// Define and reference HTML elements for later use
const d = document;
const cryptoInputELem = d.querySelector(".crypto");
const currencyInputElem = d.querySelector(".currency");
const amountInputElem = d.querySelector(".amount");
const convertBtn = d.querySelector(".convert-btn");
const changeBtn = d.querySelector(".change-btn");
const cryptoMenu = d.querySelector(".crypto-menu");
const resultElem = d.querySelector(".result");
const currencyMenu = d.querySelector(".currency-menu");
const bitcoinCardPrice = d.querySelector(".bitcoinCardPrice");
const ethereumCardPrice = d.querySelector(".ethereumCardPrice");
const bitcoinCardRange = d.querySelector(".bitcoinCardRange");
const ethereumCardRange = d.querySelector(".ethereumCardRange");
const cryptoModalList = d.querySelector(".crypto-modal-list");
const currencyModalList = d.querySelector(".currency-modal-list");
const cryptoModalListLi = d.querySelectorAll(".crypto-modal-list-li");
const cryptoInputText = d.querySelector(".cryptoText");
const currencyInputText = d.querySelector(".currencytext");
const selectInputsParent = d.querySelector(".inputs-pparent");
const currenciesCard = d.querySelector(".currencies-card");
const backBlur = d.querySelector(".back-modal");
const loader = d.querySelector(".loader");
// Define and reference js variables for later use
let bitcoinCard;
let ethereumCard;
let userCryptoSelect;
let userCryptoSelectSymbol;
let userCurrencySelect;
let userCurrencySelectSymbol;
let cryptoPrice;
let currencyPrice;
let calculatorState = 0;
//random backGround
function changeBackgroundImage() {
	const images = [
		"/images/bitcoin1.jpg",
		"/images/bitcoin2.jpg",
		"/images/bitcoin3.png",
		"/images/bitcoin4.png",
		"/images/bitcoin5.png",
		"/images/bitcoin6.png",
		"/images/bitcoin7.png",
	];
	const randomImage = images[Math.floor(Math.random() * images.length)];
	document.body.style.backgroundImage = `url('${randomImage}')`;
}
window.onload = changeBackgroundImage;
//show loading
backBlur.style.display = "flex";
loader.style.display = "grid";
d.querySelector(".close-modal").style.display = `none`;
window.addEventListener("load", () => {
	backBlur.style.display = "none";
	loader.style.display = "none";
	d.querySelector(".close-modal").style.display = `block`;
});
// get bitcoin and ethereum price
setInterval(() => {
	bitcoinCard = localStorage.getItem("bitcoin");
	ethereumCard = localStorage.getItem("ethereum");
	bitcoinCardPrice.innerHTML = `${bitcoinCard} $`;
	ethereumCardPrice.innerHTML = `${ethereumCard} $`;
	bitcoinCardRange.style.width = `${bitcoinCard / 1000}%`;
	ethereumCardRange.style.width = `${ethereumCard / 100}%`;
	getBitcoinAndEthereumPrice("bitcoin", "ethereum");
}, 60000);
async function getBitcoinAndEthereumPrice(bitcoin, ethereum) {
	let api;
	let response;
	try {
		api = await fetch(`https://api.coingecko.com/api/v3/coins/${bitcoin}`);
		response = await api.json();
		bitcoinCard = await response.market_data.current_price.usd;
		localStorage.setItem("bitcoin", bitcoinCard);

		api = await fetch(`https://api.coingecko.com/api/v3/coins/${ethereum}`);
		response = await api.json();
		ethereumCard = await response.market_data.current_price.usd;
		localStorage.setItem("ethereum", ethereumCard);
	} catch (err) {
		resultElem.innerHTML = `<p>Check your Internet connection!</p>`;
		console.log(err);
	}
}
// get fiat currencies price
async function getCurrenciesPrice() {
	let api = await fetch("https://api.exchangerate-api.com/v4/latest/usd");
	let response = await api.json();
	let currencies = await response.rates;
	currenciesList.forEach((e) => {
		currenciesCard.innerHTML += `
		<div class='country-parent'>
		<div><img src ='https://countryflagsapi.netlify.app/flag/${
			e.countryCode
		}.svg' alt='${e.currencyName}'></div><div class='currency-p-parent'>
		<p>${e.currencyName}</p>
		<p style='color:goldenrod'>price:${currencies[e.currency]}$</p>
		</div>
		</div>
		`;
	});
}
getCurrenciesPrice();
// button for changing state(crypto to currency)or(currency to crypto)
changeBtn.addEventListener("click", () => {
	if (calculatorState === 0) {
		calculatorState = 1;
		selectInputsParent.style.flexDirection = "row-reverse";
	} else {
		calculatorState = 0;
		selectInputsParent.style.flexDirection = "row";
	}
	ElementFiller();
	reset();
});
// dom element filler
function ElementFiller() {
	//write price of bitcoin and ethereum on dom
	bitcoinCard = localStorage.getItem("bitcoin");
	ethereumCard = localStorage.getItem("ethereum");
	bitcoinCardPrice.innerHTML = `${bitcoinCard} $`;
	ethereumCardPrice.innerHTML = `${ethereumCard} $`;
	bitcoinCardRange.style.width = `${bitcoinCard / 1000}%`;
	ethereumCardRange.style.width = `${ethereumCard / 100}%`;
	//give click event for select inputs
	cryptoInputELem.addEventListener("click", () => {
		cryptoModalList.style.display = "flex";
		backBlur.style.display = "flex";
	});
	currencyInputElem.addEventListener("click", () => {
		currencyModalList.style.display = "flex";
		backBlur.style.display = "flex";
	});
	// show please select in select inputs
	cryptoInputText.textContent = "Select a Crypto";
	currencyInputText.textContent = "Select a Currency";
	//show cryptos and currencies in a modal
	cryptoModalList.innerHTML = "";
	cryptoList.forEach((e) => {
		cryptoModalList.innerHTML += ` <li class='crypto-modal-list-li'>
                        <div>
                            <img src="${e.icon}" alt="${e.name}">
                        </div>
                        <p class ='crypto-modal-list-li-p'>${e.name}</p>
                    </li>`;
	});
	currencyModalList.innerHTML = "";
	currenciesList.forEach((e) => {
		currencyModalList.innerHTML += ` <li class='currency-modal-list-li'>
                        <div>
                           <img src="https://countryflagsapi.netlify.app/flag/${e.countryCode}.svg" alt="${e.currency}">
                        </div>
                        <p class='currency-modal-list-li-p'>${e.country}</p>
                    </li>`;
	});
	//change text of change button
	if (calculatorState === 0) {
		changeBtn.innerHTML = `
		<span class="span-mother">
									<span>C</span>
									<span>r</span>
									<span>y</span>
									<span>p</span>
									<span>t</span>
									<span>o</span>
								</span>
								<span class="span-mother2">
									<span>C</span>
									<span>u</span>
									<span>r</span>
									<span>r</span>
									<span>e</span>
									<span>n</span>
									<span>y</span>
								</span>
		`;
	} else {
		changeBtn.innerHTML = `
		<span class="span-mother">
									<span>C</span>
									<span>u</span>
									<span>r</span>
									<span>r</span>
									<span>e</span>
									<span>n</span>
									<span>c</span>
									<span>y</span>
								</span>
								<span class="span-mother2">
									<span>C</span>
									<span>r</span>
									<span>y</span>
									<span>p</span>
									<span>t</span>
									<span>o</span>
								</span>`;
	}
}
//select and write crypto or currency that user selected
function selectCurrencyOrCrypto() {
	backBlur.addEventListener("click", (e) => {
		if (
			e.target.className.includes("crypto-modal-list-li") ||
			e.target.className.includes("crypto-modal-list-li-p")
		) {
			cryptoInputText.innerHTML = e.target.textContent;
		} else {
			backBlur.style.display = "none";
			cryptoModalList.style.display = "none";
		}
		cryptoModalList.style.display = "none";
		backBlur.style.display = "none";
	});
	backBlur.addEventListener("click", (e) => {
		if (
			e.target.className.includes("currency-modal-list-li") ||
			e.target.className.includes("currency-modal-list-li-p")
		) {
			currencyInputText.innerHTML = e.target.textContent;
		} else {
			console.log(e.target);

			backBlur.style.display = "none";
			currencyModalList.style.display = "none";
		}
		backBlur.style.display = "none";
		currencyModalList.style.display = "none";
	});
}
selectCurrencyOrCrypto();
ElementFiller();
//find crypto or currency that user selected form lists
function findSelectedOption() {
	let cryptoInputValue = cryptoInputELem.textContent;
	let currencyInputValue = currencyInputElem.textContent;
	cryptoList.forEach((e) => {
		if (cryptoInputValue.includes(e.name)) {
			userCryptoSelect = e.name;
			userCryptoSelectSymbol = e.symbol;
		}
	});
	currenciesList.forEach((e) => {
		if (currencyInputValue.includes(e.country)) {
			userCurrencySelect = e.currency;
			userCurrencySelectSymbol = e.symbol;
		}
	});
}
// get price of crypto or currency that user selected
async function getCryptosAndCurrenciesApi(cryptoName, currencyName, callback) {
	let api;
	try {
		api = await fetch(
			`https://api.coingecko.com/api/v3/coins/${cryptoName.toLowerCase()}`
		);

		if (api.ok) {
			let response = await api.json();
			cryptoPrice = await response.market_data.current_price.usd;
		} else {
			resultElem.innerHTML = "<p>Something went wrong!</p>";
		}
		api = await fetch("https://api.exchangerate-api.com/v4/latest/usd");
		if (api.ok) {
			console.log(api.ok);

			response = await api.json();
			currencyPrice = response.rates[currencyName];
		} else {
			console.log(api.ok);

			resultElem.innerHTML = "<p>Something went wrong!</p>";
		}
		callback();
	} catch (err) {
		console.log(api.ok);
		resultElem.innerHTML`<p>Something went wrong!</p>`;
	}
}
// calculate prices
convertBtn.addEventListener("click", () => {
	let amountValue = amountInputElem.value.trim();
	findSelectedOption();
	//checking that is there any selected crypto or currency
	if (!userCryptoSelect || !userCurrencySelect) {
		resultElem.innerHTML = `<p>please fill in both select fields!</p>`;
		return;
	}
	//checking that user imported correct amount
	if (amountValue <= 0 || amountValue === "" || isNaN(amountValue)) {
		resultElem.innerHTML = "<p>please enter a valid number</p>";
	} else {
		resultElem.innerHTML = "please wait...";
		//calculate prices and show on dom
		function printResult() {
			if (cryptoPrice && currencyPrice) {
				if (calculatorState === 0) {
					resultElem.innerHTML = `
					<p style ='color:goldenrod;'>${amountValue} ${userCryptoSelect}</p> <p style='color: rgba(245, 245, 245, 0.877);'> is equal to </p> <p style='color:goldenrod;'>${
						cryptoPrice * amountValue * currencyPrice
					} ${userCurrencySelectSymbol}</p>

					`;
				} else {
					resultElem.innerHTML = `
					<p style ='color:goldenrod;'>${amountValue} ${userCurrencySelectSymbol}</p> <p style='color: rgba(245, 245, 245, 0.877);'> is equal to </p> <p style='color:goldenrod;'>${
						amountValue / currencyPrice / cryptoPrice
					} ${userCryptoSelectSymbol}</p>

					`;
				}
			}
		}
		//get api
		getCryptosAndCurrenciesApi(
			userCryptoSelect,
			userCurrencySelect,
			printResult
		);
	}
});
// reset values on dom and in js code
function reset() {
	userCryptoSelect;
	userCryptoSelectSymbol;
	userCurrencySelect;
	userCurrencySelectSymbol;
	cryptoPrice;
	currencyPrice;
	resultElem.innerHTML = "";
	amountInputElem.value = "";
}
