import './App.css';
import { useEffect, useState } from 'react';

const Quote = (props) => {

  const { quote } = props;

  if (quote == null || quote === '') {
    return (
      <div className="loader">
        <div className="animated"></div>
      </div>
    )
  }

  return (
    <p className='quote'>
      "{quote}"
    </p>
  )
};

export function App () {

  const [quote, setQuote] = useState(null);
  const [number, setNumber] = useState(null);

  const loadQuote = () => {
    setQuote(null);
    setNumber(null);
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then((data) => {
        setQuote(data.slip.advice);
        setNumber(data.slip.id);
      });
  };

  const handleClick = () => {
    if (quote == null || quote === '') {
      return;
    }

    loadQuote();
  };

  useEffect(loadQuote, []);

  return (
    <article className='layout'>
      <main className='content'>
        <p className='number'>{number ? `Advice #${number}` : 'Loading...'}</p>
        <div className="wrapper">
          <Quote quote={quote} />
        </div>
        <div className='decoration'>
          <span className='line' />
          <span className='stroke' />
          <span className='stroke' />
          <span className='line' />
        </div>
        <button className='button' onClick={handleClick}>
          <svg
            className='icon'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'>
              <path
                fillRule='evenodd'
                d='M4 0h16a4.005 4.005 0 0 1 4 4v16a4.005 4.005 0 0 1-4 4H4a4.005 4.005 0 0 1-4-4V4a4.005 4.005 0 0 1 4-4Zm2 16.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM7.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3 3a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Zm6 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM15 7.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z'
                clipRule='evenodd'
              />
          </svg>
        </button>
      </main>
    </article>
  )
};