import "./editVar.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import SearchBar from "../../components/searchBar/searchBar";
const EditVar = ({ inputs, title }) => {
  // get data from variable api endpoint
  const [data, setData] = useState([{ name: "loading" }]);
  const [value1, setValue1] = useState("");
  const [id2, Setid2] = useState(1);
  const[id1, Setid1] = useState(1);
  const [value2, setValue2] = useState("");
  //state for the select
  const [selectedOption, setSelectedOption] = useState("+");

  
const navigate = useNavigate();
  const onChange = (event , choix) => {
    if (choix == 1) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name == event.target.value) {
          Setid1(data[i].id);
        }
      }

      setValue1(event.target.value);
    }
    else {
            //get the id of the variable from data array
            for (let i = 0; i < data.length; i++) {
              if (data[i].name == event.target.value) {
                Setid2(data[i].id);
              }
            }

      setValue2(event.target.value);
    }
  };

  const onSearch = (searchTerm ,choix) => {
    if (choix == 1) {
      setValue1(searchTerm);
    }
    else {
      setValue2(searchTerm);
    }
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/variable")
      .then((res) => {
        setData(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // handle the submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value1, value2, selectedOption);  
    //send the data to the api
    let id ;
    //get the parameter id from the url
    const url = window.location.href;
    const urlParts = url.split('/');
    id = urlParts[urlParts.length - 1];

    const variable = {
      var1id: id1,
      var2id: id2,
      resultid: id,
    }
    if (selectedOption == "/") {
      setSelectedOption("div");
    }
    axios
      .put(`http://localhost:3001/api/operation/${selectedOption}` , variable)
      .then((res) => {
        console.log(res);
        navigate("/variables");
      })
      
  };


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
            <form onSubmit={handleSubmit}>
          
                <div className="formInput" key={2}>
                  <label>Operation Type</label>
                  <select name="cars" id="cars" onChange={(e)=>{setSelectedOption(e.target.value)}}>
  <option value="+">+</option>
  <option value="-">-</option>
  <option value="/">/</option>
  <option value="*">*</option>
</select>                </div><div className="formInput" key={3}>
                  <label>Variable1 ID</label>
                  <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value1} onChange={(e)=>onChange(e,1)} />
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value1.toLowerCase();
              const fullName = item.name.toLowerCase();
              console.log(fullName);

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item ,i) => (
              <div
                onClick={() => onSearch(item.name ,1)}
                className="dropdown-row"
                key={i}
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>                </div><div className="formInput" key={4}>
                  <label>Variable2 ID</label>
                  <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value2} onChange={(e)=>onChange(e,2)} />
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value2.toLowerCase();
              const fullName = item.name.toLowerCase();
              console.log(fullName);

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item ,i) => (
              <div
                onClick={() => onSearch(item.name,2)}
                className="dropdown-row"
                key={i}
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>          
                   </div>

              <button className="submit" type="submit">
                Submit
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVar;