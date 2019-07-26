import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

export default class Header extends React.Component {
  state = {
    active: false
  };
  render() {
    return (
      <header>
        <h1>Ayaz-Memster</h1>
        <div
          className="navIcon"
          onClick={() => {
            this.setState({ active: !this.state.active });
          }}
        />
        <div className={this.state.active ? 'links active' : 'links'}>
          <Link to="/">Home</Link>
          <Link to="/constructor">Constructor</Link>
          <Link to="/add">Add</Link>
        </div>
      </header>
    );
  }
}
