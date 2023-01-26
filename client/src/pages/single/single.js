import "./single.css";
import Sidebar from "../../components/sidebar/sidebar"; 
import Navbar from "../../components/navbar/navbar";

const Single = () => {
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
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
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