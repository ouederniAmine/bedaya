import "./Questionslist.css"
import Sidebar from "../../components/sidebar/sidebar"
import Navbar from "../../components/navbar/navbar"
import Datatable from "../../components/datatable/datatable"

const Questionslist = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable addNew={true}/>
      </div>
    </div>
  )
}

export default Questionslist