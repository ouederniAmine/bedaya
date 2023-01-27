import "./single.css";
import Sidebar from "../../components/sidebar/sidebar"; 
import Navbar from "../../components/navbar/navbar";
import { useState ,  useEffect} from "react";
import axios from "axios";
const Single = () => {
  const [data, setData] = useState({
    id:0,
    name:"", 
    phone:"",
    date:"",
    pdflink:""
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/invoices")
      .then((res) => {
        setData(res.data);
        })

      .catch((err) => {
        console.log(err);
      });
      axios
      .get("http://localhost:3001/api/clients")
      .then((res) => {
        //get the invoice id from the url
        let invoiceId = window.location.pathname.split("/")[2];
        //get the invoice from the invoices array
        let invoice = res.data.find((invoice) => invoice.id == invoiceId);
   
        setData(invoice)
        console.log(invoice)
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Invoice Informations</h1>
            <div className="item">
              
              <div className="details">
              <div className="detailItem">
                  <span className="itemKey">Client Name:</span>
                  <span className="itemValue">{data.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date:</span>
                  <span className="itemValue">{data.date}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
             
                <button className="linkbu">PDF link</button>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Single;