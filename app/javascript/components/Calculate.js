import React from 'react';

export default function Calculate({ activeCurrency, handleSubmit, handleChange, amount }) {
  return (
    <div>
      <h1>How much {activeCurrency.name} do you own?</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Enter Amount Owned:</label>
          <br />
          <input
            onChange={handleChange}
            autoComplete='off'
            type='text'
            name='amount'
            placeholder='How much do you own?'
            value={amount}
            className='field'
          ></input>
        </div>
        <div className="form-group">
            <input type="submit" className="calculate-btn" value="Calculate My Total"></input>
        </div>
      </form>
    </div>
  );
}
