import "./VariablesList.css"
import Sidebar from "../../components/sidebar/sidebar"
import Navbar from "../../components/navbar/navbar"
import VariableTable from "../../components/variableTable/variableTable"
const VariablesList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <VariableTable/>
      </div>
    </div>
  )
}

export default VariablesList