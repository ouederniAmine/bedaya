import "./editQuestion.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import SearchBar from "../../components/searchBar/searchBar";
const EditQuestion = ({ inputs, title }) => {
  // get data from variable api endpoint
  const [data, setData] = useState([{ text: "loading" }]);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const navigate = useNavigate();

  const onChange = (event , choix) => {
      setValue1(event.target.value);
  
  };

  const onSearch = (searchTerm ,choix) => {
    if (choix == 1) {
      setValue1(searchTerm);
    }
    
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/question")
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
    const variable = {
      VariableName: e.target.VariableName.value,
      VariableValue: e.target.VariableValue.value,
      VariableFactor: e.target.VariableFactor.value,
    };
    axios
      .post("http://localhost:3001/api/variable", variable)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <form>
                          
                <div className="formInput" key={0}>
                  <label>Question Text</label>
                  <input type="text" placeholder="Enter your question text : " />
                </div>
                <div className="formInput" key={1}>
                  <label>Question Possible Answers</label>
                  <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value1} onChange={(e)=>onChange(e,1)} />
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value1.toLowerCase();
              const fullName = item.text.toLowerCase();
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
                onClick={() => onSearch(item.text ,1)}
                className="dropdown-row"
                key={i}
              >
                {item.text}
              </div>
            ))}
        </div>
      </div>                       <button onClick={(e)=>{e.preventDefault();navigate("/newChoice/1")}}>add new answer</button>
                </div>
              
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default EditQuestion;