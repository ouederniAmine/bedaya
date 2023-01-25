import "./editVar.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";


const EditVar = ({ inputs, title }) => {

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
            <div className="formInput" key={1}>
                  <label>Variable numbers</label>
                  <input type="text" placeholder="Enter variable numbers" />
                </div>     
                <div className="formInput" key={1}>
                  <label>Operation Type</label>
                  <select name="cars" id="cars">
  <option value="+">+</option>
  <option value="-">-</option>
  <option value="/">/</option>
  <option value="*">*</option>
</select>                </div><div className="formInput" key={1}>
                  <label>Variable1 ID</label>
                  <input type="text" placeholder="Enter the first variable id" />
                </div><div className="formInput" key={1}>
                  <label>Variable2 ID</label>
                  <input type="text" placeholder="Enter the first variable id" />
                </div><div className="formInput" key={1}>
                  <label>Variable1 ID</label>
                  <input type="text" placeholder="Enter the first variable id" />
                </div>
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVar;