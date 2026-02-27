import Container from "react-bootstrap/Container";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

const Header = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand className="fw-bold fs-4 d-flex align-items-center gap-2">
          <BsCart3 size={26} color="#0d6efd" />
          ShopNest
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-lg-end"
        >
          <Button
            as={Link}
            to="/addproduct"
            variant="warning"
            className="fw-semibold px-4 mt-3 mt-lg-0"
          >
            + Add Product
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
