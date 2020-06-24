import React from 'react';
import PortfolioItem from './PortfolioItem';

export default function Portfolio({ portfolio }) {
  const portfolioItems = portfolio.map((item, index) => (
    <PortfolioItem key={index} item={item} />
  ));
  const total = portfolio.reduce((total, curr) => total + curr.value, 0);
  return (
    <div>
      <div className='portfolio-value'>
        <div className='portfolio-value--total'>
          Your Total Portfolio Value Is:
        </div>
        <div className='portfolio-value--content'>{total}</div>
      </div>
      <div className='portfolio-items'>{portfolioItems}</div>
    </div>
  );
}
