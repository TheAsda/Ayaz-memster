import { useStore } from 'effector-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FlexboxGrid, Nav, Navbar, Affix } from 'rsuite';
import { selectedStore, toggleSelected } from './models/selected';

const Header = () => {
  const { selected } = useStore(selectedStore);

  return (
    <Affix>
      <Navbar style={{ padding: '0 10%' }}>
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
          <FlexboxGrid justify="space-between" align="middle">
            <Nav>
              <Nav.Item>
                <Link to="/constructor">Constructor</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/add">Add image</Link>
              </Nav.Item>
            </Nav>
            <div>
              {selected && (
                <FlexboxGrid align="middle">
                  <div>
                    Selected:{' '}
                    <a href={`#${selected.title}`}>{selected.title}</a>
                  </div>
                  <Button onClick={() => toggleSelected(selected)}>
                    Clear
                  </Button>
                </FlexboxGrid>
              )}
            </div>
          </FlexboxGrid>
        </Navbar.Body>
      </Navbar>
    </Affix>
  );
};

export { Header };
