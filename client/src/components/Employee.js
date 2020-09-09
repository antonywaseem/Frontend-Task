import React from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http";
import { useForm } from "react-hook-form";
import "./Employee.css";

const Employee = () => {
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm();

  const [isLoading, fetchedData] = useHttp(
    `http://localhost:5000/employee/${id}`,
    []
  );

  const onSubmit = (data) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        age: data.age,
        title: data.title,
      }),
    };
    console.log(
      "Sending Http request to URL: " + `http://localhost:5000/employee/${id}`
    );
    fetch(`http://localhost:5000/employee/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        alert("Employee Updated Successfully");
        return response.json();
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const selectedEmployee = fetchedData ? fetchedData : [];

  let content = <p>Loading Employee Data...</p>;

  if (!isLoading && selectedEmployee) {
    content = (
      <div class="container">
        <h1>Employee Details</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label for="email">
            <b>Name</b>
          </label>
          <br />
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            defaultValue={selectedEmployee.name}
            id="email"
            ref={register({ required: true })}
            required
          />
          <br />

          <label for="psw">
            <b>Age</b>
          </label>
          <br />
          <input
            type="text"
            style={{ width: "30%" }}
            defaultValue={selectedEmployee.age}
            name="age"
            placeholder="Enter Age"
            ref={register({ required: true })}
            required
          />
          <br />
          <label for="psw-repeat">
            <b>Title</b>
          </label>
          <br />
          <input
            type="text"
            defaultValue={selectedEmployee.title}
            name="title"
            placeholder="Enter Title"
            ref={register({ required: true })}
            required
          />
          <br />

          <button type="submit" class="registerbtn">
            Update Employee
          </button>
        </form>
      </div>

      //   <div>
      //     <form onSubmit={handleSubmit(onSubmit)}>
      //       <table>
      //         <thead>
      //           <th>ID</th>
      //           <th>Name</th>
      //           <th>Age</th>
      //           <th>Title</th>
      //           <th>Actions</th>
      //         </thead>
      //         <tbody>
      //           <tr>
      //             <td>{selectedEmployee.id}</td>
      //             <td>
      //               <input
      //                 name="name"
      //                 defaultValue={selectedEmployee.name}
      //                 ref={register}
      //               />
      //             </td>
      //             <td>
      // <input
      //   defaultValue={selectedEmployee.age}
      //   name="age"
      //   ref={register}
      // />
      //             </td>
      //             <td>
      // <input
      //   defaultValue={selectedEmployee.title}
      //   name="title"
      //   ref={register}
      // />
      //             </td>
      //             <td>
      //               <input type="submit" value="Update Employee" />
      //             </td>
      //           </tr>
      //         </tbody>
      //       </table>
      //     </form>
      //   </div>
    );
  } else if (!isLoading && !selectedEmployee) {
    content = <p>Could not fetch any data.</p>;
  }

  return content;
};

export default Employee;
