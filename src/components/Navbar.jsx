import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import classNames from 'classnames';
import styles from '../assets/styles/Navbar.module.css';
import imdbLogo from '../assets/images/logos/IMDB.png';
import searchBtn from '../assets/images/buttons/search.svg';
import { NavLink } from 'react-router-dom';


function NavbarComponent() {

  return (
    <>
      {['sm'].map((expand) => (
        <Navbar key={expand} expand={expand} className={classNames(styles.nav, 'mb-3')}>
          <Container className={classNames(styles.container, 'ps-4', 'pe-4')}>
          <Navbar.Brand className={classNames(styles.brand, 'me-5', styles.navlink_a)} as={NavLink} to="/">
            <img
              src={imdbLogo}
              className={classNames(styles.brand_svg, 'd-inline-block', 'align-top')}
              alt="IMDB logo"
            />
          </Navbar.Brand>
            <Navbar.Toggle className={styles.collapse_btn} aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              <Form className={classNames(styles.searchBar, 'd-flex', 'flex-grow-1')}> 
                  <Form.Control
                    type="search"
                    placeholder="Buscar"
                    className={classNames(styles.searchInput)}
                    aria-label="Search"
                  />
                  <Button variant="dark" className={classNames(styles.searchBtn)}>
                    <img
                    src={searchBtn}
                    alt="Search btn"
                  />
                  </Button>
                </Form>
                <Nav className="ms-5">
                <Nav.Link href="/movie">Movies</Nav.Link>
                <Nav.Link href="/tv">Tv Shows</Nav.Link>
                  <NavDropdown
                    title="People"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    className={classNames(styles.peopleTab)}
                  >
                    <NavDropdown.Item as={NavLink} to="/person/popular" className={classNames(styles.navlink_a)}>Popular People</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarComponent;