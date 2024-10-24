import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import api from '../api';
import Swal from 'sweetalert2';

function StudentList({ onEdit }) {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchStudents(pagination.currentPage);
  }, [pagination.currentPage, refresh]);

  const fetchStudents = async (page) => {
    try {
      const response = await api.get(`/students?page=${page}&limit=5`);
      setStudents(response.data.students);
      setPagination({
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
        currentPage: Number(page),
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch students', 'error');
    }
  };

  const handleDelete = (studentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/students/${studentId}`);
          Swal.fire('Deleted!', 'Student has been deleted.', 'success');
          setRefresh(!refresh);
        } catch (error) {
          Swal.fire('Error', 'Failed to delete student', 'error');
        }
      }
    });
  };

  const handlePageChange = (pageNumber) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
  };

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= pagination.totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === pagination.currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student.student_id}>
                <td>{(pagination.currentPage - 1) * 5 + index + 1}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{student.email}</td>
                <td>{new Date(student.dob).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => onEdit(student)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(student.student_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No students found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {pagination.totalPages > 1 && (
        <Pagination>{renderPaginationItems()}</Pagination>
      )}
    </>
  );
}

export default StudentList;