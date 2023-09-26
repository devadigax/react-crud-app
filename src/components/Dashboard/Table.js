import React, { useState } from 'react';

const Table = ({ employees, handleEdit, handleDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const pageSize = 8;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  // Calculate the slice of employees to display based on current page and page size
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter employees based on the search query
  const filteredEmployees = employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleEmployees = filteredEmployees.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'card' : 'table');
  };

  return (
    <div className="container">
      {/* Add a toggle button to switch between table and card view */}
      <div className="view-toggle right-content">
        <button onClick={toggleViewMode}>
          Switch to {viewMode === 'table' ? 'Card View' : 'Table View'}
        </button>
      </div>

      <input
        className="left-content"
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {viewMode === 'table' ? (
        <table className="striped-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Date</th>
              <th colSpan={2} className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleEmployees.length > 0 ? (
              visibleEmployees.map((employee, i) => (
                <tr key={employee.id}>
                  <td>{startIndex + i + 1}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{formatter.format(employee.salary)}</td>
                  <td>{employee.date} </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleEdit(employee.id)}
                      className="button muted-button"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="text-left">
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="button muted-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Employees</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        // Card view rendering goes here
        // You can create a Card component to display employee details in card format
        // and map through visibleEmployees to render each card
        <div className="card-grid">
          {visibleEmployees.length > 0 ? (
            visibleEmployees.map((employee, i) => (
              <div key={employee.id} className="card">
                {/* Card content */}
                <h3>{`${employee.firstName} ${employee.lastName}`}</h3>
                <p>Email: {employee.email}</p>
                <p>Salary: {formatter.format(employee.salary)}</p>
                <p>Date: {employee.date}</p>
                <div className="card-actions">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No Employees</div>
          )}
        </div>
      )}

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Table;
