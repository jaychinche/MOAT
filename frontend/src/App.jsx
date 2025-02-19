import { Routes, Route } from "react-router-dom";
import "./SignIn"
import SignIn from "./SignIn";
import Dashboard from "./dashboardMain/DashboardAdmin";
import EmployeList from "./EmployeList"
import IndivEmpDetail from "./IndivEmpDetail";
import AddEmployee from "./AddEmployee";
import DashboardUser from "./dashboardMain/DashboardUser";
import IndivDetail from "./IndivDetail";
import PageNotFound from "./PageNotFound";
import AddEmployeePage  from "./AddEmployee"

const App = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Dashboard/>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard-user" element={<DashboardUser/>} />
        <Route path="/addemp" element={<AddEmployee/>} />
        <Route path="/emplist" element={<EmployeList/>} />
        <Route path="/indiv-emp-detail/:email" element={<IndivEmpDetail/>} />
        <Route path="/indiv-detail/:id" element={<IndivDetail/>} />     
        <Route path="*" element={<PageNotFound />} />  
      </Routes>
    </>
  );
};

export default App;
