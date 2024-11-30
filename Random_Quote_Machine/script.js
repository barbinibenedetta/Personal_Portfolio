const randomQuoteURL = 'https://api.quotable.io/random';

// DOM
const newQuoteBtn = document.getElementById('new-quote');
const quoteText = document.getElementById('text');
const author = document.getElementById('author');
const tweetBtn = document.getElementById('tweet-btn');
const tweetLink = document.getElementById('tweet-quote');

const fetchData = async () => {
  try {
    const res = await fetch('https://dummyjson.com/quotes/random');
    const data = await res.json();
    if (res.ok && data.quote.length < 160) {
      quoteText.innerText = data.quote;
      author.innerText = data.author;

      const tweetText = `"${data.quote} - (${data.author})`
      tweetLink.setAttribute('href', `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`);
    } else {
      fetchData();
    }
  } catch (err) {
    console.log(err);
  }
};

fetchData();

newQuoteBtn.addEventListener('click', fetchData);

tweetBtn.addEventListener('click', () => {
  
});