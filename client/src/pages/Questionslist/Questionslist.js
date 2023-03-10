import "./Questionslist.css"
import Sidebar from "../../components/sidebar/sidebar"
import Navbar from "../../components/navbar/navbar"
import QuestionTable from "../../components/questionTable/questionTable"
const Questionslist = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <QuestionTable />
      </div>
    </div>
  )
}

export default Questionslist