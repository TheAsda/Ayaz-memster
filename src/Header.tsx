import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'rsuite';

const Header = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Link
          to="/"
          style={{
            padding: '18px 20px',
            display: 'inline-block',
            fontWeight: 'bold',
          }}
        >
          Ayaz-Memster
        </Link>
      </Navbar.Header>
      <Navbar.Body>
        <Nav>
          <Nav.Item>
            <Link to="/constructor">Constructor</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/add">Add image</Link>
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

export { Header };
