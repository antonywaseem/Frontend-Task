import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Employees.css";

const Employees = () => {
  let history = useHistory();
  const [pageNumber, setPageNumber] = useState(1);
  const [newEmployee, setNewEmployee] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm();
  const [
    isLoading,
    fetchedData,
  ] = useHttp(
    `http://localhost:5000/employees?page=${encodeURIComponent(pageNumber)}`,
    [pageNumber, newEmployee]
  );

  const selectedEmployees = fetchedData ? fetchedData : [];

  const employeeDetails = (id, e) => {
    e.preventDefault();
    history.push(`/employee/${id}`);
  };

  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        age: data.age,
        title: data.title,
      }),
    };
    console.log(
      "Sending Http request to URL: " + "http://localhost:5000/employees"
    );
    fetch("http://localhost:5000/employees", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        alert("Employee Added Successfully");
        setNewEmployee(!newEmployee);
        reset(response);
        return response.json();
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const nextPage = () => {
    if (selectedEmployees.length == 10) {
      setPageNumber(pageNumber + 1);
    }
  };
  let content = <p>Loading Employees...</p>;

  if (!isLoading && selectedEmployees && selectedEmployees.length > 0) {
    content = (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <table>
            <thead>
              <th>Name</th>
              <th>Age</th>
              <th>Title</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {selectedEmployees.map((employee) => (
                <tr id="body">
                  <td>
                    <a onClick={(e) => employeeDetails(employee.id, e)}>
                      {employee.name}
                    </a>
                  </td>
                  <td>
                    <a onClick={(e) => employeeDetails(employee.id, e)}>
                      {employee.age}
                    </a>
                  </td>
                  <td>
                    <a onClick={(e) => employeeDetails(employee.id, e)}>
                      {employee.title}
                    </a>
                  </td>
                  <td>
                    <button onClick={(e) => employeeDetails(employee.id, e)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    ref={register({ required: true })}
                    required
                  />
                  {errors.name?.type === "required" && "Name is required"}
                </td>
                <td>
                  <input
                    type="text"
                    name="age"
                    placeholder="Enter Age"
                    ref={register({ required: true })}
                    required
                  />
                  {errors.age?.type === "required" && "Age is required"}
                </td>
                <td>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    ref={register({ required: true })}
                    required
                  />
                  {errors.title?.type === "required" && "Title is required"}
                </td>

                <td>
                  <input
                    type="submit"
                    class="button"
                    style={{ backgroundColor: "blueviolet" }}
                    value="Add Employee"
                  />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <button
                    style={{
                      padding: "revert",
                      margin: "30px",
                      backgroundColor: "#4caf50",
                    }}
                    onClick={() => {
                      if (pageNumber != 1) {
                        setPageNumber(pageNumber - 1);
                      }
                    }}
                  >
                    Previous Page
                  </button>

                  <button
                    style={{
                      padding: "revert",
                      margin: "30px",
                      backgroundColor: "#4caf50",
                    }}
                    onClick={nextPage}
                  >
                    Next Page
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </form>
      </div>
    );
  } else if (
    !isLoading &&
    (!selectedEmployees || selectedEmployees.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }

  return content;
};

export default Employees;
