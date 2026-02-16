import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import "./Employee.css";

const EmployeeLS = () => {
  const initialState = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    image: "",
    status: "",
  };

  const [formdata, setFormdata] = useState(initialState);
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("employees");
    if (stored) setEmployees(JSON.parse(stored));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const generateID = () => {
    return "EMP" + Date.now();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formdata.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formdata.firstName.trim().length < 3) {
      newErrors.firstName = "First name must be at least 3 characters";
    }

    if (!formdata.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formdata.lastName.trim().length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters";
    }

    if (!formdata.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formdata.phone.trim()) {
      newErrors.phone = "Phone number required";
    } else if (!/^\d{10}$/.test(formdata.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formdata.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!formdata.department) {
      newErrors.department = "Select department";
    }

    if (!formdata.designation.trim()) {
      newErrors.designation = "Designation required";
    }

    if (!formdata.salary) {
      newErrors.salary = "Salary required";
    } else if (!/^\d+$/.test(formdata.salary)) {
      newErrors.salary = "Salary must be a number";
    } else if (Number(formdata.salary) < 1000) {
      newErrors.salary = "Salary must be at least 1000";
    }

    if (!formdata.joiningDate) {
      newErrors.joiningDate = "Joining date required";
    }

    if (!formdata.image.trim()) {
      newErrors.image = "Image URL required";
    }

    if (!formdata.status) {
      newErrors.status = "Select status";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (editIndex !== null) {
        const updated = [...employees];
        updated[editIndex] = formdata;
        setEmployees(updated);
        setEditIndex(null);
      } else {
        const newEmployee = {
          ...formdata,
          id: generateID(),
        };
        setEmployees([...employees, newEmployee]);
      }
      setFormdata(initialState);
      setErrors({});
    }
  };

  const handleEdit = (id) => {
    const index = employees.findIndex((emp) => emp.id === id);
    setFormdata(employees[index]);
    setEditIndex(index);
  };
  const handleDelete = (id) => {
    const filtered = employees.filter((emp) => emp.id !== id);
    setEmployees(filtered);
  };

  return (
    <Container className="main-container">
      <h2 className="title">Employee Management System</h2>
      <Form onSubmit={handleSubmit} className="form-box">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                value={formdata.firstName}
                placeholder="Enter firstName"
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={formdata.lastName}
                placeholder="Enter lastName"
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formdata.email}
                placeholder="Enter email address"
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={formdata.phone}
                placeholder="Enter phone number"
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {/* Designation */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={formdata.designation}
                onChange={handleChange}
                isInvalid={!!errors.designation}
                placeholder="Enter designation"
              />
              <Form.Control.Feedback type="invalid">
                {errors.designation}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          {/* Salary */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={formdata.salary}
                onChange={handleChange}
                isInvalid={!!errors.salary}
                placeholder="Enter salary"
              />
              <Form.Control.Feedback type="invalid">
                {errors.salary}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formdata.gender}
                onChange={handleChange}
                isInvalid={!!errors.gender}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                name="department"
                value={formdata.department}
                onChange={handleChange}
                isInvalid={!!errors.department}
              >
                <option value="">Select Department</option>
                <option>HR</option>
                <option>IT</option>
                <option>Finance</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.department}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Profile Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formdata.image}
                onChange={handleChange}
                isInvalid={!!errors.image}
                placeholder="image URL here"
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {/* Joining Date */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                type="date"
                name="joiningDate"
                value={formdata.joiningDate}
                onChange={handleChange}
                isInvalid={!!errors.joiningDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.joiningDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          {/* Status */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formdata.status}
                onChange={handleChange}
                isInvalid={!!errors.status}
              >
                <option value="">Select Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.status}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className="submit-btn">
          {editIndex !== null ? "Update Employee" : "Add Employee"}
        </Button>
      </Form>
      <Row className="mt-5">
        {employees.map((emp) => (
          <Col md={4} key={emp.id} className="mb-4">
            <Card className="employee-card shadow-lg border-0 rounded-4 h-100">
              <div className="image-wrapper">
                <Card.Img
                  variant="top"
                  src={emp.image}
                  className="employee-img"
                />
              </div>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title className="fw-bold mb-0">
                    {emp.firstName} {emp.lastName}
                  </Card.Title>

                  <Badge bg={emp.status === "Active" ? "success" : "secondary"}>
                    {emp.status}
                  </Badge>
                </div>
                <p className="text-muted small mb-2">{emp.email}</p>
                <Badge bg="primary" className="mb-3">
                  {emp.department}
                </Badge>
                <hr />
                <p className="mb-1">
                  <strong>Designation:</strong> {emp.designation}
                </p>
                <p className="mb-1">
                  <strong>Gender:</strong> {emp.gender}
                </p>
                <p className="mb-1">
                  <strong>Phone:</strong> {emp.phone}
                </p>
                <p className="mb-1 text-success fw-bold">
                  ₹ {Number(emp.salary).toLocaleString()}
                </p>
                <p className="text-muted small">Joined: {emp.joiningDate}</p>

                <div className="d-flex justify-content-between mt-3">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleEdit(emp.id)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default EmployeeLS;
