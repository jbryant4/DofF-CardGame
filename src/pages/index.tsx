import { useState } from 'react';
import createComponent from '~/utils/styles/createComponent';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    // Your login logic here, e.g. sending a POST request to your server
  };

  return (
    <div className="bg-[url('/veggies-background.jpg')] bg-cover h-full w-full">
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
