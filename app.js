// Global Scope Variables - anybody can access this data
let apiQuotes = [];

// Dom
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const quoteContainer = document.getElementById('quote-container');
const btnTweet = document.getElementById('twitter');
const btnNewQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader')

console.log(quote);
console.log(author);
console.log(quoteContainer);
console.log(btnTweet);
console.log(btnNewQuote);
// Function to get Quotes from API > getQuotes()
const getQuotes = async () => {
    showLoader()
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		const quote = apiQuotes[randomNumber(apiQuotes.length - 1)];
        const isEmpty = Object.keys(quote).length;
        console.log(isEmpty)  
        displayQuote(quote);
	} catch (error) {
		console.log(error);
	}
};

// Return a random number between 0 and the length of array
const randomNumber = (lengthOfArray) => {
	return Math.floor(Math.random() * lengthOfArray) + 1;
};
// Access array on local server
const getLocalQuotes = () => {
	try {
		console.log(localQuotes[randomNumber(localQuotes.length - 1)]);
	} catch (error) {
		console.log(error);
	}
};

// loader functions
const showLoader = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const hideLoader = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

const displayQuote = (data) => {
    showLoader()
    //console.log(Object.keys(data).length)
	// Check to see if the author variable is null and replace with 'Anonymous'
	if (!data.author) {
		author.textContent = 'Anonymous';
	} else {
		author.textContent = data.author;
	}

    //Check the quote length to decrease the size of the quote depending on length.
    //console.log(data.text.length)
    if(data.text.length > 100) {
        quote.classList.add('long-quote')
    } else {
        quote.classList.remove('long-quote');
    }
	// display quote
	quote.textContent = data.text;

    //
    hideLoader()
};

// tweet your favourit quote
const tweetQuote = (data) => {
 const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
 this.open(twitterUrl, '_blank')
}

// Event listeners
btnNewQuote.addEventListener('click', getQuotes)
btnTweet.addEventListener('click', tweetQuote)
// on page load
//getQuotes();
//getLocalQuotes();
getQuotes();
