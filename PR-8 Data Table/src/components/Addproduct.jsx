import { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import generateUniqueId from "generate-unique-id";
import { Getstoragedata, Setstoragedata } from "../service/Localstorage";
const AddProductLS = () => {
  const navigate = useNavigate();
  const intialstate = {
    id: "",
    image: "",
    title: "",
    Desc: "",
    Brand: "",
    price: "",
    Quantity: "",
    Rating: "",
    Category: "",
  };
  const [formdata, setformdata] = useState(intialstate);
  const [Errors, setErrors] = useState({});
  const validate = () => {
    let newErrors = {};

    if (!formdata.title.trim()) newErrors.title = "Title is required";
    if (!formdata.Brand.trim()) newErrors.Brand = "Brand is required";
    if (!formdata.Desc.trim()) newErrors.Desc = "Description is required";
    if (!formdata.price) newErrors.price = "Price is required";
    if (!formdata.image.trim()) newErrors.image = "Image URL is required";
    if (!formdata.Quantity) newErrors.Quantity = "Quantity is required";
    if (!formdata.Category) newErrors.Category = "Category is required";
    if (!formdata.Rating) newErrors.Rating = "Rating is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handelsubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    formdata.id = generateUniqueId({ length: 6, useLetters: false });
    let data = Getstoragedata() || [];
    data.push(formdata);
    Setstoragedata(data);

    navigate("/");
  };

  const handelchange = (e) => {
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  return (
    <>
      <Container className="mt-3 d-flex justify-content-center">
        <div style={{ maxWidth: "700px", width: "100%" }}>
          <Form onSubmit={handelsubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Title
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="title"
                  value={formdata.title}
                  onChange={handelchange}
                  isInvalid={!!Errors.title}
                  placeholder="Enter the Title"
                />
                <Form.Control.Feedback type="invalid">
                  {Errors.title}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Brand
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="Brand"
                  value={formdata.Brand}
                  onChange={handelchange}
                  isInvalid={!!Errors.Brand}
                  placeholder="Enter the Brand"
                />
                <Form.Control.Feedback type="invalid">
                  {Errors.Brand}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Descrption
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="Desc"
                  value={formdata.Desc}
                  onChange={handelchange}
                  isInvalid={!!Errors.Desc}
                  placeholder="Enter the Description"
                />
                <Form.Control.Feedback type="invalid">
                  {Errors.Desc}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Price
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  name="price"
                  value={formdata.price}
                  onChange={handelchange}
                  isInvalid={!!Errors.price}
                  placeholder="Enter the price"
                />
                <Form.Control.Feedback type="invalid">
                  {Errors.price}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                image
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="url"
                  name="image"
                  value={formdata.image}
                  onChange={handelchange}
                  isInvalid={!!Errors.image}
                  placeholder="Enter Image Url"
                />
                <Form.Control.Feedback type="invalid">
                  {Errors.image}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Quantity
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  name="Quantity"
                  value={formdata.Quantity}
                  onChange={handelchange}
                  isInvalid={!!Errors.Quantity}
                  placeholder="Enter the Quantity"
                />
                <Form.Control.Feedback type="invalid">
                  {Errors.Quantity}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Category
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  aria-label="Default select example"
                  name="Category"
                  value={formdata.Category}
                  onChange={handelchange}
                  isInvalid={!!Errors.Category}
                >
                  <option>Select category</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Grosseries">Groceries</option>
                  <option value="Mobile">Mobile</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {Errors.Category}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Rating
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  aria-label="Default select example"
                  name="Rating"
                  value={formdata.Rating}
                  onChange={handelchange}
                  isInvalid={!!Errors.Rating}
                >
                  <option>Select rating</option>
                  <option value="1">⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {Errors.Rating}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <div className="text-center mt-4">
              <Button variant="secondary" onClick={() => navigate("/")}>
                Back
              </Button>{" "}
              &nbsp; &nbsp;
              <Button type="submit" variant="primary" size="sm">
                Add Product
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};
export default AddProductLS;
