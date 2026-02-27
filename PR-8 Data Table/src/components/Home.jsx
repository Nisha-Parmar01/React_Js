import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import { Getstoragedata, Setstoragedata } from "../service/Localstorage";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";

const Home = () => {
  const [products, setproducts] = useState([]);
  const [search, setsearch] = useState("");
  const [Filterproduct, setFilterproduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const navigate = useNavigate();

  const handleDelete = (id) => {
    let data = Getstoragedata();
    let filterData = data.filter((pro) => pro.id != id);
    setproducts(filterData);
    setFilterproduct(filterData);
    Setstoragedata(filterData);
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    navigate(`/Edit-product/${id}`);
  };

  const handlesearch = () => {
    const filterData = products.filter(
      (product) =>
        product.title?.toLowerCase().includes(search.toLowerCase()) ||
        product.Category?.toLowerCase().includes(search.toLowerCase()),
    );

    setFilterproduct(filterData);
    setsearch("");
    setCurrentPage(1);
  };

  const handleSorting = (type, field) => {
    let sortedData 
    if (type === "asc") {
      if (field === "price" || field === "Quantity" || field === "Rating") {
        sortedData=[...Filterproduct].sort((a,b)=> a[field] - b[field]);
      } else {
         sortedData=[...Filterproduct].sort((a,b)=> a[field].localeCompare(b[field]));
      }
    } else {
      if (field === "price" || field === "Quantity" || field === "Rating") {
        sortedData=[...Filterproduct].sort((a,b)=> b[field] - a[field]);
      } else {
         sortedData=[...Filterproduct].sort((a,b)=> b[field].localeCompare(a[field]));
      }
    }

    setFilterproduct(sortedData);
    setCurrentPage(1);
  };
  useEffect(() => {
    let data = Getstoragedata();
    console.log(data);
    setproducts(data);
    setFilterproduct(data);
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = Filterproduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(Filterproduct.length / productsPerPage);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [Filterproduct, totalPages]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <Container className="mt-2">
      <Row className="mb-4 justify-content-center align-items-center g-3">
        <Col md={5} className="d-flex">
          <input
            type="text"
            placeholder="Search by title, category..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className="form-control rounded-3"
          />

          <Button variant="primary" className="ms-2" onClick={handlesearch}>
            Search
          </Button>
        </Col>

        <Col md={3}>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" className=" rounded-3">
              Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSorting("asc", "title")}>
                Title A-Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSorting("desc", "title")}>
                Title Z-A
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSorting("asc", "Category")}>
                Category A-Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSorting("desc", "Category")}>
                Category Z-A
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSorting("asc", "Brand")}>
                Brand A-Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSorting("desc", "Brand")}>
                Brand Z-A
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSorting("asc", "price")}>
                Price Low-High
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSorting("desc", "price")}>
                Price High-Low
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Col lg={3} md={4} sm={6} xs={12} className="mb-4" key={product.id}>
              <Card className="product-card h-100 border-0 shadow-sm text-center">
                <div className="text-center p-3">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ height: "140px", objectFit: "contain" }}
                  />
                </div>

                <Card.Body className="d-flex flex-column">
                  < Card.Title className="product-title">
                    {product.title}
                  </ Card.Title>

                  <Card.Text className="text-muted small mb-2">
                    {product.Desc}
                  </Card.Text>

                  <Card.Text className="mb-1">
                    <strong>Price:₹</strong>
                    {product.price}
                  </Card.Text>

                  <Card.Text className="text-muted mb-1">
                    <strong>Brand:</strong> {product.Brand}
                  </Card.Text>

                  <Card.Text className="text-muted mb-1">
                    <strong>Category:</strong> {product.Category}
                  </Card.Text>

                  <Card.Text className="mb-1">
                    <strong>Quantity: </strong>
                    {product.Quantity}
                  </Card.Text>

                  <Card.Text className="rating">
                    <strong> Rating:</strong> {product.Rating} ⭐
                  </Card.Text>

                  <div className="mt-auto d-flex justify-content-between mt-3">
                    <Button
                      variant="outline-primary"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h4 className="text-center">No Products Found</h4>
        )}
      </Row>
      {totalPages > 1 && (
        <Stack spacing={2} className="d-flex align-items-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Stack>
      )}
    </Container>
  );
};
export default Home;
