import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Getstoragedata, Setstoragedata } from "../service/sessionstorage";
import { useNavigate } from "react-router";

const Home = () => {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    let data = Getstoragedata();
    let filterData = data.filter((pro) => pro.id != id);
    setproducts(filterData);
    Setstoragedata(filterData);
  };

  const handleEdit = (id) => {
    navigate(`/Edit-product/${id}`);
  };

  useEffect(() => {
    let data = Getstoragedata();
    console.log(data);
    setproducts(data);
  }, []);
  return (
    <Container className="mt-4">
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col lg={3} md={3} sm={6} xs={12} className="mb-4" key={product.id}>
              <Card className="product-card h-100 border-0 shadow-sm text-center">
                <div className="text-center p-3">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ height: "140px", objectFit: "contain" }}
                  />
                </div>

                <Card.Body>
                  <Card.Title className="product-title">
                    {product.title}
                  </Card.Title>

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

                  <div className="d-flex justify-content-between mt-3">
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
    </Container>
  );
};
export default Home;
