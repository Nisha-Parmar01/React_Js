import Container from "react-bootstrap/Container";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Bilnkit
        </Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          <Button as={Link} to="/addproduct" variant="warning">
            Add to product
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
