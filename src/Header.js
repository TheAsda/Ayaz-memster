import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to="/">Home</Link>
        <Link to="/constructor">Contructor</Link>
      </header>
    );
  }
}
