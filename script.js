const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twiter');
const newQuotebtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiquotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// show new quote
function newQuote(){
    loading();
    // pick a randon quote from apiquotes array
    const quote = apiquotes[Math.floor(Math.random() * apiquotes.length)];
    
// check if author blank and replace with quote unknown
if (!quote.author) {
    quoteAuthor.textContent = 'Unknown'
} else {
    quoteAuthor.textContent = quote.author;
}

// check quote lenght to determine styling
if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
}
else {
    quoteText.classList.remove('long-quote')
}

// set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiURL);
    apiquotes = await response.json();
    newQuote();
  } catch (error) {
    // handle error
  }
}

// tweet quote
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl,'_blank');
}

twitterBtn.addEventListener('click',tweetQuote)
newQuotebtn.addEventListener('click',newQuote)



// on Load
getQuotes();
// loading();