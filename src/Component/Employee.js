import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Button, TextField } from "@mui/material";

const Employee = () => {
  const [dropDownNameOptions, setdropDownNameOptions] = useState([]);
  const [dropDownManagerOptions, setdropDownManagerOptions] = useState([]);
  const [dropDownProjectCodeOptions, setdropDownProjectCodeOptions] = useState(
    []
  );
  const [dropDownStartDateOptions, setdropDownStartDateOptions] = useState([]);
  const [dropDownEndDateOptions, setdropDownEndDateOptions] = useState([]);
  const [dropDownProductionOptions, setdropDownProductionOptions] = useState(
    []
  );
  const [dropDownProjectNameOptions, setdropDownProjectNameOptions] = useState(
    []
  );
  const [empname, setEmpName] = useState([]);
  const [empmanager, setEmpManager] = useState([]);
  const [empprojectCode, setEmpprojectCode] = useState([]);
  const [empstartDate, setEmpstartDate] = useState([]);
  const [empendDate, setEmpendDate] = useState([]);
  const [empproduction, setEmpProduction] = useState([]);
  const [empprojectName, setEmpprojectName] = useState([]);
  const [emps, setEmps] = useState([]);
  const [employes, setEmployes] = useState([]);
  const [rowsPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState("");
  const [searchData, setSearchData] = useState("");
  const [searchVal, setSearchVal] = useState([]);
  const [searchResult, setSearchResult] = useState();
  const [searchItemsClick, setSearchItemsClick] = useState("");
  const [startDateType, setStartDateType] = useState("");
  const [endDateType, setEndDateType] = useState("");

  useEffect(() => {
    fetchEmployees();
    fetchDropdownData();
  }, []);

  const extraUniqueValues = (data, key) =>
    new Set(data.map((item) => item[key]));

  const fetchEmployees = async () => {
    try {
      const Response = await axios.get("http://localhost:8080/employees");
      const data = Response.data;
      setEmps(data);
      setEmployes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = (event) => {
    window.location.href = "/AddEmployee";
  };

  const handleUpdate = (id) => {
    window.location.href = `/UpdateEmployee/${id}`;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/employees/${id}`);
      alert("record deleted successfully");
      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const inputChange = (event) => {
    setSearchData(event.target.value);
    if (event.target.value != "") {
      const searchResults = emps.map((employee) => {
        const matchedDetails = [];

        if (employee.name.toLowerCase().startsWith(searchData.toLowerCase())) {
          matchedDetails.push(employee.name);
        }
        if (
          employee.peopleManager
            .toLowerCase()
            .startsWith(searchData.toLowerCase())
        ) {
          matchedDetails.push(employee.peopleManager);
        }
        if (
          employee.production.toLowerCase().startsWith(searchData.toLowerCase())
        ) {
          matchedDetails.push(employee.production);
        }
        if (
          employee.projectCode
            .toLowerCase()
            .startsWith(searchData.toLowerCase())
        ) {
          matchedDetails.push(employee.projectCode);
        }
        if (
          employee.projectName
            .toLowerCase()
            .startsWith(searchData.toLowerCase())
        ) {
          matchedDetails.push(employee.projectName);
        }
        if (matchedDetails.length > 0) {
          return matchedDetails.join(",");
        }

        return null;
      });
      const searchValue = [...new Set(searchResults)];
      setSearchResult(searchValue.filter((result) => result != null));

      console.log(filterData);
      setSearchVal(filterData);
    } else {
      <p>No result found</p>;
    }
  };

  const onSearch = () => {};

  const resetButtonClick = () => {
    Reset();
    fetchEmployees();
    setSearchData("");
    setSearchResult(null);
  };
  const Reset = () => {
    setEmpName([""]);
    setEmpManager([""]);
    setEmpProduction([""]);
    setEmpprojectCode([""]);
    setEmpprojectName([""]);
    setEmpstartDate([""]);
    setEmpendDate([""]);
  };

  const handleChange = (data) => async (event) => {
    const value = event.target.value;
    Reset();
    switch (data) {
      case "name":
        setEmpName(value);
        break;
      case "managers":
        setEmpManager(value);
        break;
      case "projectcode":
        setEmpprojectCode(value);
        console.log(value);
        break;
      case "projectname":
        setEmpprojectName(value);
        break;
      case "production":
        setEmpProduction(value);
        break;
      case "startdate":
        console.log(value);
        setEmpstartDate(value);
        break;
      case "enddate":
        setEmpendDate(value);
        break;
      default:
        break;
    }
    setFilterData(value);

    try {
      const Response = await axios.get(
        `http://localhost:8080/${data}/${value}`
      );
      Response.data = Array.isArray(Response.data)
        ? Response.data
        : [Response.data];
      console.log(Response);
      setEmps(Response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
    fetchEmployees(0, +event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchEmployees(newPage, rowsPerPage);
  };

  const searchDataClick = (event) => {
    const value = event.target.textContent.split(",");
    const searchText = value[0].trim().toLowerCase(); // Trim and convert to lowercase for case-insensitive search
    setSearchItemsClick(searchText);
  
    const filterTableData = employes.filter((employee) =>
      Object.values(employee).some((employeeValue) =>
        String(employeeValue).toLowerCase().startsWith(searchText)
      )
    );
  
    console.log(filterTableData);
    setEmps(filterTableData)
  };
  

  const fetchDropdownData = async () => {
    try {
      const dropdownResponse = await axios.get(
        "http://localhost:8080/employees"
      );
      const dropdownData = dropdownResponse.data;

      const nameSet = extraUniqueValues(dropdownData, "name");
      const PeopleManagerSet = extraUniqueValues(dropdownData, "peopleManager");
      const ProjectCodeSet = extraUniqueValues(dropdownData, "projectCode");
      const StartDateSet = extraUniqueValues(dropdownData, "startDate");
      const EndDateSet = extraUniqueValues(dropdownData, "endDate");
      const ProductionSet = extraUniqueValues(dropdownData, "production");
      const ProjectNameSet = extraUniqueValues(dropdownData, "projectName");

      setdropDownNameOptions(Array.from(nameSet));
      setdropDownManagerOptions(Array.from(PeopleManagerSet));
      setdropDownProjectCodeOptions(Array.from(ProjectCodeSet));
      setdropDownStartDateOptions(Array.from(StartDateSet));
      setdropDownEndDateOptions(Array.from(EndDateSet));
      setdropDownProductionOptions(Array.from(ProductionSet));
      setdropDownProjectNameOptions(Array.from(ProjectNameSet));
    } catch (error) {
      console.log(error);
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
      <div
        style={{
          display: "flex",
          marginTop: 10,
          justifyContent: "flex-end",
        }}
      >
        <button
          value="Send"
          onClick={handleAdd}
          style={{
            padding: 8,
            borderRadius: 4,
            backgroundColor: "#3f51b5",
            color: "white",
          }}
        >
          +Add Employee
        </button>
      </div>
      <div style={{ marginLeft: 20, marginTop: 20, marginBott: 15 }}>
        <FormControl sx={{ m: 1, width: 350 }}>
          <InputLabel>Name</InputLabel>
          <Select
            value={empname}
            onChange={handleChange("name")}
            input={<OutlinedInput label="Name" />}
          >
            {dropDownNameOptions.map((names) => (
              <MenuItem
                key={names}
                value={names}
                //style={getStyles(name, personName, theme)}
              >
                {names}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 350 }}>
          <InputLabel>People Manager</InputLabel>
          <Select
            value={empmanager}
            onChange={handleChange("managers")}
            input={<OutlinedInput label="People Manager" />}
          >
            {dropDownManagerOptions.map((name) => (
              <MenuItem
                key={name}
                value={name}
                //style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 350 }}>
          <InputLabel>Project Code</InputLabel>
          <Select
            value={empprojectCode}
            onChange={handleChange("projectcode")}
            input={<OutlinedInput label="Project Code" />}
          >
            {dropDownProjectCodeOptions.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 350 }}>
          <TextField
            onBlur={startDateBlur}
            onFocus={startDateClick}
            id="date"
            label="StartDate"
            type={startDateType}
            onChange={handleChange("startdate")}
            value={empstartDate}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 350 }}>
          <TextField
            onBlur={endDateBlur}
            onFocus={endDateClick}
            id="date"
            label="EndDate"
            type={endDateType}
            onChange={handleChange("enddate")}
            value={empendDate}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 350 }}>
          <InputLabel>Production</InputLabel>
          <Select
            value={empproduction}
            onChange={handleChange("production")}
            input={<OutlinedInput label="Production" />}
          >
            {dropDownProductionOptions.map((name) => (
              <MenuItem
                key={name}
                value={name}
                //style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 350 }}>
          <InputLabel>Project Name</InputLabel>
          <Select
            value={empprojectName}
            onChange={handleChange("projectname")}
            input={<OutlinedInput label="Project Name" />}
          >
            {dropDownProjectNameOptions.map((name) => (
              <MenuItem
                key={name}
                value={name}
                //style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div
        style={{
          display: "flex",
          marginRight: 20,
          justifyContent: "flex-end",
        }}
      >
        <input
          onChange={inputChange}
          value={searchData}
          placeholder="Search"
          style={{ padding: 10, width: "15%", borderRadius: 4, borderWidth: 1 }}
        />

        <button
          onClick={() => onSearch()}
          style={{
            marginLeft: 10,
            marginRight: 10,
            paddingRight: 20,
            paddingLeft: 20,
            backgroundColor: "#3f51b5",
            color: "white",
          }}
        >
          Search
        </button>
        <button
          onClick={resetButtonClick}
          style={{
            paddingRight: 20,
            paddingLeft: 20,
            backgroundColor: "#3f51b5",
            color: "white",
          }}
        >
          Reset
        </button>
      </div>
      <div>
        {searchResult?.map((result, index) => (
          <p key={index} onClick={searchDataClick}>
            {result}
          </p>
        ))}
      </div>

      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          marginTop: 5,
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead style={{ backgroundColor: "#3f51b5" }}>
              <TableRow>
                {[
                  "Local Employee Id",
                  "Global Group Id",
                  "Name",
                  "Local Grade",
                  "Role Name",
                  "Production",
                  "Production Unit Name",
                  "LocalApprover",
                  "PeopleManager",
                  "ProjectCode",
                  "ProjectName",
                  "StartDate",
                  "EndDate",
                  "",
                  "",
                ].map((headerText, index) => (
                  <TableCell
                    key={index}
                    style={{
                      fontWeight: 700,
                      backgroundColor: "#3f51b5",
                      color: "white",
                    }}
                  >
                    {headerText}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {emps
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((Emp) => (
                  <TableRow key={Emp.localEmployeeId}>
                    <TableCell>{Emp.localEmployeeId}</TableCell>
                    <TableCell>{Emp.globalGroupId}</TableCell>
                    <TableCell>{Emp.name}</TableCell>
                    <TableCell>{Emp.localGrade}</TableCell>
                    <TableCell>{Emp.roleName}</TableCell>
                    <TableCell>{Emp.production}</TableCell>
                    <TableCell>{Emp.productionUnitName}</TableCell>
                    <TableCell>{Emp.localApprover}</TableCell>
                    <TableCell>{Emp.peopleManager}</TableCell>
                    <TableCell>{Emp.projectCode}</TableCell>
                    <TableCell>{Emp.projectName}</TableCell>
                    <TableCell>{Emp.startDate}</TableCell>
                    <TableCell>{Emp.endDate}</TableCell>

                    <TableCell>
                      <Button
                        value="Update"
                        variant="contained"
                        onClick={() => handleUpdate(Emp.localEmployeeId)}
                        style={{
                          backgroundColor: "#3f51b5",
                          color: "white",
                        }}
                      >
                        Update
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button
                        value="Delete"
                        variant="contained"
                        onClick={() => handleDelete(Emp.localEmployeeId)}
                        style={{
                          backgroundColor: "#3f51b5",
                          color: "white",
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={emps.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Employee;
