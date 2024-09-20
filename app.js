// Define OpenAI API Key (ensure to keep this secure in real implementations)
const apiKey = '';

// Array of default quotes
const defaultQuotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Strive not to be a success, but rather to be of value. - Albert Einstein",
  "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
  "Do what you can, with what you have, where you are. - Theodore Roosevelt",
  "Everything you've ever wanted is on the other side of fear. - George Addair",
  "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
  "I have not failed. I've just found 10,000 ways that won't work. - Thomas A. Edison",
  "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
  "Life is what happens to you while you're busy making other plans. - John Lennon",
  "It is during our darkest moments that we must focus to see the light. - Aristotle",
  "You must be the change you wish to see in the world. - Mahatma Gandhi",
  "The best way to predict the future is to create it. - Peter Drucker",
  "In the middle of difficulty lies opportunity. - Albert Einstein",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The purpose of our lives is to be happy. - Dalai Lama",
  "You miss 100% of the shots you don't take. - Wayne Gretzky",
  "Whether you think you can or you think you can't, you're right. - Henry Ford",
  "I have learned over the years that when one's mind is made up, this diminishes fear. - Rosa Parks",
  "I alone cannot change the world, but I can cast a stone across the water to create many ripples. - Mother Teresa",
  "Nothing is impossible, the word itself says 'I'm possible'! - Audrey Hepburn",
  "The question isn't who is going to let me; it's who is going to stop me. - Ayn Rand",
  "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
  "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it. - Henry Ford",
  "Change your thoughts and you change your world. - Norman Vincent Peale",
  "If you're offered a seat on a rocket ship, don't ask what seat! Just get on. - Sheryl Sandberg",
  "I would rather die of passion than of boredom. - Vincent van Gogh"
];

// Function to get a random quote from the default quotes array
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * defaultQuotes.length);
  return defaultQuotes[randomIndex];
}

// Function to send request to OpenAI API
async function getAIQuote(feeling) {
  const url = 'https://api.openai.com/v1/completions';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Give me an inspiring quote based on feeling ${feeling}.`,
        max_tokens: 60,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Error fetching AI quote:', error);
    return getRandomQuote();
  }
}

// Event listener for the button
document.getElementById('generate').addEventListener('click', async () => {
  const feeling = document.getElementById('feeling').value;

  if (feeling) {
    // Display loading message while waiting for the response
    document.getElementById('quote').innerText = "Generating a quote...";
    
    // Get quote from AI or fallback to random quote
    const quote = await getAIQuote(feeling);
    
    // Display the returned quote
    document.getElementById('quote').innerText = quote;
  } else {
    alert("Please enter how you're feeling.");
  }
});