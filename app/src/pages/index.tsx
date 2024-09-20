import OpenAI from "openai";
import { useState } from 'react';

const openai = new OpenAI({
  apiKey: '',
  dangerouslyAllowBrowser: true
});

export default function Home() {
  const [feeling, setFeeling] = useState('');
  const [quote, setQuote] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);

  const getAIQuote = async () => {
    if (isWaiting) {
      alert('Please wait a moment before making another request.');
      return;
    }

    if (!feeling) {
      alert('Please enter how you are feeling.');
      return;
    }

    setIsWaiting(true); // Prevent multiple requests
    setTimeout(() => setIsWaiting(false), 5000); // Allow new requests after 5 seconds

    try {
      // API call to OpenAI using the openai instance
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Adjust the model name accordingly
        messages: [{ role: 'user', content: `Give me an inspiring quote based on feeling ${feeling}.` }],
        max_tokens: 60, // Limit the response length
      });
      console.log(response)
      const quote = response.choices[0]?.message?.content;
      
      if (quote) {
        setQuote(quote);
      } else {
        alert('No quote generated. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching the quote:', error);
      alert('Error generating quote.');
    }
  };

  return (
    <div className="container">
    <div className="card-header">
      <h1 className="card-title">Uplift AI</h1>
      <p className="card-subtitle">Generate an inspiring quote based on your feelings</p>
    </div>
    <div className="card-content">
      <input
        type="text"
        value={feeling}
        onChange={(e) => setFeeling(e.target.value)}
        placeholder="How are you feeling?"
        className="input"
      />
      <button 
        onClick={getAIQuote}
        className="button"
        disabled={isWaiting}
      >
        {isWaiting ? 'Generating...' : 'Get Inspired'}
      </button>
      {quote && (
        <div className="quote-container">
          <h2 className="quote-title">Your Inspiration:</h2>
          <p className="quote-text">{quote}</p>
        </div>
      )}
    </div>
</div>
  );
}