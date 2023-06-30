import { useContext, useState } from 'react';
import { GiphyFetch } from 'react-giphy-searchbox';
import { GlobalContext } from '~/context/GlobalContext';

const hasSpecialCharacters = (value: string) => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/g;

  return regex.test(value);
};

type ErrorType = 'api' | 'improperEntry' | 'wrongCredentials';
const GateWay = () => {
  const [title, setTitle] = useState('');
  const [codePhrase, setCodePhrase] = useState('');
  const [errorType, setError] = useState<ErrorType | null>(null);
  const [gifUrl, setGifUrl] = useState('');
  const { setAdmin } = useContext(GlobalContext);

  const disableBtn = !title.trim() || !codePhrase.trim();
  const fetchRandomGif = async searchTerm => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
      const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=1`;
      const response = await fetch(url);
      const { data } = await response.json();
      setGifUrl(data[0].images.original.url ?? '');
    } catch (error) {
      console.error('Error fetching gifs:', error);
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    if (hasSpecialCharacters(title) || hasSpecialCharacters(codePhrase)) {
      setError('improperEntry');
      await fetchRandomGif('no-no-no');

      return;
    }

    try {
      const response = await fetch(`/api/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, codePhrase })
      });

      if (response.ok) {
        setAdmin(true);
      } else if (response.status === 401) {
        setError('wrongCredentials');
        await fetchRandomGif('who-are-you');
      } else {
        setError('api');
        await fetchRandomGif('not-on-the-list');
      }
    } catch (error) {
      setError('api');
      await fetchRandomGif('broken-server');
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <form className="max-w-sm w-full" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            className="block font-bold mb-2 text-gray-700 text-sm"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="appearance-none border focus:outline-none focus:shadow-outline leading-tight px-3 py-2 rounded shadow text-gray-700 w-full"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block font-bold mb-2 text-gray-700 text-sm"
            htmlFor="codePhrase"
          >
            Code Phrase
          </label>
          <input
            className="appearance-none border focus:outline-none focus:shadow-outline leading-tight px-3 py-2 rounded shadow text-gray-700 w-full"
            id="codePhrase"
            type="text"
            placeholder="Enter code phrase"
            value={codePhrase}
            onChange={e => setCodePhrase(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <button
            disabled={disableBtn}
            className="bg-blue-500 focus:outline-none focus:shadow-outline font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
        {errorType && (
          <div>
            {errorType === 'improperEntry' && <p>Improper entry detected</p>}
            {errorType === 'wrongCredentials' && (
              <p>Wrong credentials entered</p>
            )}
            <img src={gifUrl} alt="Shrugging GIF" />
          </div>
        )}
      </form>
    </div>
  );
};

export default GateWay;
