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
    console.log('activeCurrency', activeCurrency)
    setActiveCurrency(activeCurrency);
    setSearchResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let currency = activeCurrency;
    let currentAmount = amount;
    console.log('currency', currency)
    console.log('currentAmount', currentAmount)
    axios
      .post('http://localhost:3000/calculate', {
        id: currency.id,
        amount: currentAmount,
      })
      .then((data) => {
          console.log('testing data response: ', data)
        setPortfolio(prevPortfolio => [...prevPortfolio, data.data]);
        setAmount('');
        setActiveCurrency(null);
      })
      .catch((data) => {
        debugger;
      });
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const searchOrCalculate = activeCurrency ? (
    <Calculate
      handleChange={handleAmount}
      handleSubmit={handleSubmit}
      activeCurrency={activeCurrency}
      amount={amount}
    />
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
