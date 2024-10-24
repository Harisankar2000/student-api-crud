import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../api';
import Swal from 'sweetalert2';

function StudentForm({ currentStudent, onSave }) {
  const [student, setStudent] = useState({
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
  });

  useEffect(() => {
    if (currentStudent) {
      setStudent(currentStudent);
    } else {
      setStudent({
        first_name: '',
        last_name: '',
        email: '',
        dob: '',
      });
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentStudent) {
        // Update operation
        await api.put(`/students/${currentStudent.student_id}`, student);
        Swal.fire('Success', 'Student updated successfully', 'success');
      } else {
        // Create operation
        await api.post('/students', student);
        Swal.fire('Success', 'Student created successfully', 'success');
      }
      onSave(); // Callback to refresh the student list
    } catch (error) {
      Swal.fire('Error', 'Failed to save student', 'error');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          value={student.first_name}
          onChange={handleChange}
          placeholder="Enter first name"
          required
        />
      </Form.Group>

      <Form.Group controlId="lastName" className="mt-2">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          value={student.last_name}
          onChange={handleChange}
          placeholder="Enter last name"
          required
        />
      </Form.Group>

      <Form.Group controlId="email" className="mt-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group controlId="dob" className="mt-2">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="dob"
          value={student.dob}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        {currentStudent ? 'Update Student' : 'Add Student'}
      </Button>
    </Form>
  );
}

export default StudentForm;