import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  console.log(process.env.REACT_APP_API_BASE_URL);
  const handleSave = () => {
    setCurrentStudent(null); 
    setRefreshList(!refreshList);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <h3>{currentStudent ? 'Edit Student' : 'Add New Student'}</h3>
          <StudentForm currentStudent={currentStudent} onSave={handleSave} />
        </Col>
        <Col md={8}>
          <h3>Student List</h3>
          <StudentList onEdit={handleEditStudent} refresh={refreshList} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
