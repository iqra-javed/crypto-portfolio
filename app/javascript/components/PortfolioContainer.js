import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Portfolio from './Portfolio';
import Search from './Search';
import Calculate from './Calculate';

export default function PortfolioContainer() {
  const [portfolio, setPortfolio] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [activeCurrency, setActiveCurrency] = useState(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    axios
      .post('http://localhost:3000/search', {
        search: e.target.value,
      })
      .then((data) => {
        setSearchResults([...data.data.currencies]);
      })
      .catch((data) => {
        debugger;
      });
  };

  const handleSelect = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('data-id');
    const activeCurrency = searchResults.filter(
      (item) => item.id == parseInt(id)
    )[0];
    setActiveCurrency(activeCurrency);
    setSearchResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let currency = activeCurrency;
    let currentAmount = amount;

    axios
      .post('http://localhost:3000/calculate', {
        id: currency.id,
        amount: currentAmount,
      })
      .then((data) => {
        setPortfolio((prevPortfolio) => [...prevPortfolio, data.data]);
        setAmount('');
        setActiveCurrency(null);
      })
      .catch((data) => {
        debugger;
      });
  };

  const handleAmount = (e) => {
    const amount = e.target.value;
    if (isNaN(amount)) {
      setError('Please enter a numerical value.');
    } else {
      setError('');
      setAmount(e.target.value);
    }
  };

  const searchOrCalculate = activeCurrency ? (
    <Fragment>
      <Calculate
        handleChange={handleAmount}
        handleSubmit={handleSubmit}
        activeCurrency={activeCurrency}
        amount={amount}
        error={error}
      />
      {error && <div className='error'>{error}</div>}
    </Fragment>
  ) : (
    <Search
      searchResults={searchResults}
      handleChange={handleChange}
      handleSelect={handleSelect}
    />
  );
  return (
    <div className='grid'>
      <div className='left'> {searchOrCalculate}</div>
      <div className='right'>
        <Portfolio portfolio={portfolio} />
      </div>
    </div>
  );
}
