import { useStore } from 'effector-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Affix, Button, FlexboxGrid, Nav, Navbar } from 'rsuite';
import { selectedStore, toggleSelected } from './models/selected';

const Header = () => {
  const { selected } = useStore(selectedStore);
  const { pathname } = useLocation<{ pathname: string }>();
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
              <Nav.Item to="/constructor" componentClass={Link}>
                Constructor
              </Nav.Item>
              <Nav.Item to="/add" componentClass={Link}>
                Add image
              </Nav.Item>
            </Nav>
            <div>
              {selected && pathname !== '/constructor' && (
                <FlexboxGrid align="middle" style={{ gap: 10 }}>
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
