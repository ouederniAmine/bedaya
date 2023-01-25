import "./Userlist.css"
import Sidebar from "../../components/sidebar/sidebar"
import Navbar from "../../components/navbar/navbar"
import InvoiceTable from "../../components/invoiceTable/invoiceTable"
import { useEffect, useState } from "react"
import axios from "axios"

const Userlist = () => {
  const [data, setData] = useState([])
// get the invoices from the database
  useEffect(() => {
    const getInvoices = async () => {
      const res = await axios.get("http://localhost:3001/api/invoices")
      setData(res.data)
    }
    console.log(data)
    getInvoices()
  }, [])

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <InvoiceTable />
      </div>
    </div>
  )
}

export default Userlist