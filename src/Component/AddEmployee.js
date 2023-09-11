import { TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Navbar/Navbar.css";
import dayjs from "dayjs";
import moment from "moment";
import axios from "axios";

const AddEmployee = () => {
  const [startDateOptions, setStartDateOptions] = useState([]);
  const [endDateOptions, setEndDateOptions] = useState([]);
  const [startDateType, setStartDateType] = useState("");
  const [endDateType, setEndDateType] = useState("");
  const [emp, setEmp] = useState({
    localEmployeeId: 0,
    globalGroupId: 0,
    name: "",
    localGrade: "",
    roleName: "",
    production: "",
    productionUnitName: "",
    localApprover: "",
    peopleManager: "",
    projectCode: "",
    projectName: "",
    startDate: null,
    endDate: null,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name  ,"==>", value);
    if(name == "startDate"){
      const newStartDate = dayjs(value).format("YYYY-MM-DD");
      setStartDateOptions(newStartDate);
    }
    if(name == "endDate"){
      const newEndDate = dayjs(value).format("YYYY-MM-DD");
      setEndDateOptions(newEndDate);
    }
    setEmp((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = () => {
    const emps = {
      localEmployeeId: emp.localEmployeeId,
      globalGroupId: emp.globalGroupId,
      name: emp.name,
      localGrade: emp.localGrade,
      roleName: emp.roleName,
      production: emp.production,
      productionUnitName: emp.productionUnitName,
      localApprover: emp.localApprover,
      peopleManager: emp.peopleManager,
      projectCode: emp.projectCode,
      projectName: emp.projectName,
      startDate: startDateOptions,
      endDate: endDateOptions,
    };

    if (emp.localEmployeeId < 1 || emp.globalGroupId < 1) {
      alert("Ids can't be less than 1");

      return;
    } else if (
      emp.name == "" ||
      emp.localGrade == "" ||
      emp.roleName == "" ||
      emp.production == "" ||
      emp.productionUnitName == "" ||
      emp.localApprover == "" ||
      emp.peopleManager == "" ||
      emp.projectCode == "" ||
      emp.projectName == "" ||
      emp.startDate == "" ||
      emp.endDate == ""
    ) {
      alert("required field can't be empty.");

      return;
    } else {
      axios
        .post("http://localhost:8080/employees", emp)
        .then((res) => {
          alert(emp.name + "Employee Added Successfully");
          setEmp({});
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err)
          alert("Something went wrong. Please try again");
          window.location.href = "/";
        });
    }
  };

  

  const startDateClick = () => {
    setStartDateType("date");
  };

  const startDateBlur = () => {
    setStartDateType("");
  };

  const endDateClick = () => {
    setEndDateType("date");
  };

  const endDateBlur = () => {
    setEndDateType("");
  };

  return (
    <div>
      <toolbar className="navbar">
        <h1 className="headertext">ADD EMPLOYEE </h1>
      </toolbar>

      {/* <Typography variant="h5">BASIC WITH MATERIAL UI</Typography> */}
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <TextField
            style={{ width: "400px", margin: "15px" }}
            type="number"
            label="Local Employee Id"
            name="localEmployeeId"
            variant="outlined"
            value={emp.localEmployeeId}
            onChange={handleChange}
            required
          />

          <TextField
            style={{ width: "400px", margin: "15px" }}
            type="number"
            label="Global Group Id"
            name="globalGroupId"
            variant="outlined"
            value={emp.globalGroupId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <TextField
            style={{ width: "400px", margin: "15px" }}
            type="text"
            label="Name"
            name="name"
            variant="outlined"
            value={emp.name}
            onChange={handleChange}
            required
          />

          <TextField
            style={{ width: "400px", margin: "15px" }}
            type="text"
            label="Local Grade"
            name="localGrade"
            variant="outlined"
            value={emp.localGrade}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <TextField
            style={{ width: "400px", margin: "15px" }}
            type="text"
            label="Role Name"
            name="roleName"
            variant="outlined"
            value={emp.roleName}
            onChange={handleChange}
            required
          />

          <TextField
            style={{ width: "400px", margin: "15px" }}
            type="text"
            label="Production"
            name="production"
            variant="outlined"
            value={emp.production}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <TextField
            style={{ width: "400px", margin: "15px" }}
            type="text"
            label="Production Unit Name"
            name="productionUnitName"
            variant="outlined"
            value={emp.productionUnitName}
            onChange={handleChange}
            required
          />

          <TextField
            style={{ width: "400px", margin: "15px" }}
            type="text"
            label="Local Approver"
            name="localApprover"
            variant="outlined"
            value={emp.localApprover}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <TextField
            style={{ width: "400px", margin: "15px" }}
            type="text"
            label="People Manager"
            name="peopleManager"
            variant="outlined"
            value={emp.peopleManager}
            onChange={handleChange}
            required
          />

          <TextField
            style={{ width: "400px", margin: "15px" }}
            type="text"
            label="Project Code"
            name="projectCode"
            variant="outlined"
            value={emp.projectCode}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <TextField
            style={{ width: "400px", margin: "15px" }}
            type="text"
            label="Project Name"
            name="projectName"
            variant="outlined"
            value={emp.projectName}
            onChange={handleChange}
            required
          />

          <TextField
            onBlur={startDateBlur}
            onFocus={startDateClick}
            style={{ width: "400px", margin: "15px" }}
            id="date"
            label="StartDate"
            type={startDateType}
            variant="outlined"
            onChange={handleChange}
            value={startDateOptions}
            name="startDate"
          />
        </div>

        <TextField
          onBlur={endDateBlur}
          onFocus={endDateClick}
          style={{ width: "400px", margin: "15px" }}
          id="date"
          label="EndDate"
          type={endDateType}
          variant="outlined"
          onChange={handleChange}
          value={endDateOptions}
          name="endDate"
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          save
        </Button>
      </form>
    </div>
  );
};
export default AddEmployee;
