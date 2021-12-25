// Global Scope Variables - anybody can access this data
let apiQuotes = [];

// DOM Elements
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const quoteContainer = document.getElementById('quote-container');
const btnTweet = document.getElementById('twitter');
const btnNewQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Main App
const getQuotesFromAPI = async () => {
	showLoadingSpinner();
	// set the api url for use later
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		// ask api for a response
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		const quote = apiQuotes[generateRandomNumber(apiQuotes.length - 1)];
		displayQuoteToUI(quote);
	} catch (error) {
		// display an error if something went wrong
		getQuotesFromLocalDB();
		//console.log('Whoops, something is not right', error);
	}
};

const getQuotesFromLocalDB = () => {
	try {
		const data = localQuotes[generateRandomNumber(localQuotes.length - 1)];
		displayQuoteToUI(data);
	} catch (error) {
		console.log(error);
	}
};

const displayQuoteToUI = (data) => {
	showLoadingSpinner();
	// Check to see if the author variable is null and replace with 'Anonymous'
	if (!data.author) {
		author.textContent = 'Anonymous';
	} else {
		author.textContent = data.author;
	}

	//Check the quote length to decrease the size of the quote depending on length.
	if (data.text.length > 100) {
		quote.classList.add('long-quote');
	} else {
		quote.classList.remove('long-quote');
	}
	quote.textContent = data.text;
	hideLoadingSpinner();
};

const generateRandomNumber = (lengthOfArray) => {
	return Math.floor(Math.random() * lengthOfArray) + 1;
};

const tweetQuote = (data) => {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
	this.open(twitterUrl, '_blank');
};

// Loading Spinners
const showLoadingSpinner = () => {
	loader.hidden = false;
	quoteContainer.hidden = true;
};
const hideLoadingSpinner = () => {
	loader.hidden = true;
	quoteContainer.hidden = false;
};

// Event listeners
btnNewQuote.addEventListener('click', getQuotesFromAPI);
btnTweet.addEventListener('click', tweetQuote);

// initialize the application with the main function
getQuotesFromAPI();
