// Define OpenAI API Key (ensure to keep this secure in real implementations)
const apiKey = '';

// Function to send request to OpenAI API
async function getAIQuote(feeling) {
  const url = 'https://api.openai.com/v1/completions';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${apiKey}`
    },
    body: JSON.stringify({
      model: "text-davinci-003",  // Choose an appropriate language model
      prompt: `Give me an inspiring quote based on feeling ${feeling}.`,
      max_tokens: 60,
      temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

// Event listener for the button
document.getElementById('generate').addEventListener('click', async () => {
  const feeling = document.getElementById('feeling').value;

  if (feeling) {
    // Display loading message while waiting for the response
    document.getElementById('quote').innerText = "Generating a quote...";
    
    // Get quote from AI
    const quote = await getAIQuote(feeling);
    
    // Display the returned quote
    document.getElementById('quote').innerText = quote;
  } else {
    alert("Please enter how you're feeling.");
  }
});
