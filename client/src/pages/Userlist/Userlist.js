import "./Userlist.css"
import Sidebar from "../../components/sidebar/sidebar"
import Navbar from "../../components/navbar/navbar"
import Datatable from "../../components/datatable/datatable"

const Userlist = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable addNew={false}/>
      </div>
    </div>
  )
}

export default Userlist