import React from 'react';
import axios from 'axios';
import PortfolioContainer from './PortfolioContainer';

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

export default function App() {
  return <PortfolioContainer></PortfolioContainer>;
}
