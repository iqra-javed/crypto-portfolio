import React from 'react';

export default function Search({ handleSelect, handleChange, name, searchResults }) {
  const searchResultsList = searchResults.map((curr) => (
    <li key={curr.id} data-id={curr.id} onClick={handleSelect} className='currency-list-item'>
      <a href='#' className="currency">
        <span>{curr.name} </span>
        <span className="currency_symbol">{curr.currency_symbol}</span>
      </a>
    </li>
  ));
  return (
    <div>
      <h1>Cryptocurrency Portfolio Calculator</h1>
      <form>
        <div className='form-group'>
          <label>Search for a Currency:</label>
          <br />
          <input
            onChange={handleChange}
            autoComplete='off'
            type='text'
            name='name'
            placeholder='Ex: Bitcoin, Litecoin, Ethereum...'
            value={name}
            className='field'
          ></input>
        </div>
        <ul className='currency-list'>{searchResultsList}</ul>
      </form>
    </div>
  );
}
