import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>Ayaz-Memster</h1>
        <Link to="/">Home</Link>
        <Link to="/constructor">Constructor</Link>
        <Link to="/add">Add</Link>
      </header>
    );
  }
}
