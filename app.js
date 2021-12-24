// Global Scope Variables - anybody can access this data
let apiQuotes = [];

// get dom elements that you want to manipulate
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const quoteContainer = document.getElementById('quote-container');
const btnTweet = document.getElementById('twitter');
const btnNewQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Function to get Quotes from API > getQuotes()
const getQuotes = async () => {
	// display a loading css loader to show that something is working while we retrieve the quotes
	showLoader();
	// set the api url for use later
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		// ask api for a response
		const response = await fetch(apiUrl);
		// add the response to the global variable so we dont have to access the api everytime we want a new quote
		apiQuotes = await response.json();
		// Pull one quote from the global variable to work with
		const quote = apiQuotes[randomNumber(apiQuotes.length - 1)];
		// take the data and show it on the ui
		displayQuote(quote);
	} catch (error) {
		// display an error if something went wrong
        getLocalQuotes()
		//console.log('Whoops, something is not right', error);
	}
};

// Return a random number between 0 and the length of array
const randomNumber = (lengthOfArray) => {
	return Math.floor(Math.random() * lengthOfArray) + 1;
};

// Access array on local server
const getLocalQuotes = () => {
	try {
		const data = localQuotes[randomNumber(localQuotes.length - 1)];
        displayQuote(data)
	} catch (error) {
		console.log(error);
	}
};

// loader functions
const showLoader = () => {
	loader.hidden = false;
	quoteContainer.hidden = true;
};
const hideLoader = () => {
	loader.hidden = true;
	quoteContainer.hidden = false;
};

// function that takes an object and displays it depending on particular criteria
const displayQuote = (data) => {
	// display a loading css loader to show that something is working while we retrieve the quotes
	showLoader();
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
	// display quote text
	quote.textContent = data.text;

	// hide the loader as data has been displayed
	hideLoader();
};

// tweet your favourit quote
const tweetQuote = (data) => {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
	this.open(twitterUrl, '_blank');
};

// Event listeners
btnNewQuote.addEventListener('click', getQuotes);
btnTweet.addEventListener('click', tweetQuote);

// initialize the application with the main function
getQuotes();
