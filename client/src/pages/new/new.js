import "./new.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
const New = ({ inputs, title }) => {
  // get data from variable api endpoint
  const [data, setData] = useState([{ name: "loading" }]);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [choices, setChoices] = useState([{name : "" , id:0}]);
  const navigate = useNavigate();
  
  const [questionid , setQuestionid] = useState(0);
  const [questionType , setQuestionType] = useState(false);
  const onChange = (event , choix) => {
      setValue1(event.target.value);
  
  };

  const onSearch = (searchTerm ,choix) => {
    if (choix == 1) {
      setValue1(searchTerm);
    }
    //get the id of the choice from data
    let choiceid;
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === searchTerm) {
        choiceid = data[i].id;
      }
    }
    //push to the state choices
    setChoices([...choices, {name : searchTerm , id:choiceid}]);
    // our api to fetch the search result
  };
  //handle new choice
  const handleNewChoice = (e) => {

    e.preventDefault();
   
    axios
      .post("http://localhost:3001/api/newQuestionChoice")
      .then((res) => {
        console.log(res.data);
        navigate("/newChoice/" + res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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

      axios
      .get("http://localhost:3001/api/question")
      .then((res) => {
        setQuestionid(res.data);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
      

    

  }, []);
  // handle the submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    if (questionType) {
    let choicesid = [];
    for (let i = 0; i < choices.length; i++) {
      choicesid.push(choices[i].id);
    }
    //format choicesid to be a string
    const choicesids = choicesid.toString();

    const variable = {
      choicesid: choicesids,
      text: value2,
    };
    axios
      .post("http://localhost:3001/api/question", variable)
      .then((res) => {
        navigate("/questions");
      })
      .catch((err) => {
        console.log(err);
      });
      axios
      .delete("http://localhost:3001/api/emptyquestion")
      .then((res) => {
        console.log(res.data);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );}else{
        //get the id of the variable with name value1 from data
        let variableid;
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === value1) {
            variableid = data[i].id;
          }
        }

        const variable = {
          variableid: variableid,
          text: value2,
        };
        axios
          .post("http://localhost:3001/api/vartoquest", variable)
          .then((res) => {
            navigate("/questions");
          })
          .catch((err) => {
            console.log(err);
          });
      
      }
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
          
                   
                  {
                    questionType ?( <>
                        <div className="formInput" key={0}>
                  <label>Question Text</label>
                  <input type="text" onChange={(e)=>{e.preventDefault(); setValue2(e.target.value)}} placeholder="Enter your question text : " />
                </div>
                <div className="formInput" key={1}>
                  <label>Multiple Choices? </label>
                  <Checkbox onChange={(e)=>setQuestionType(!questionType)}></Checkbox>
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
                    const fullName = item.name.toLowerCase();
      
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
            </div>                  
            <br></br>
            <button onClick={handleNewChoice}>add new answer</button>
                      </div>
                    <div>
                      <label>Question Choices:</label>
                      {//many h2 from the choices array
                          choices.map((choice, i) => {
                            return (
                              <div className="formInput" key={i}>
                                <h2>{choice.name}</h2>                          
                              </div>
                            );
                          })
                      }
                    </div></>)
                    :(
                     <>
                       <div className="formInput" key={0}>
                  <label>Question Text</label>
                  <input type="text" onChange={(e)=>{e.preventDefault(); setValue2(e.target.value)}} placeholder="Enter your question text : " />
                </div>
                <div className="formInput" key={1}>
                  <label>Multiple Choices? </label>
                  <Checkbox onChange={(e)=>setQuestionType(!questionType)}></Checkbox>
                </div>
                <div className="formInput" key={1}>
                        <label>Variable</label>
                        <div className="search-container">
              <div className="search-inner">
                <input type="text" value={value1} onChange={(e)=>onChange(e,1)} />
              </div>
              <div className="dropdown">
                {data
                  .filter((item) => {
                    const searchTerm = value1.toLowerCase();
                    const fullName = item.name.toLowerCase();
      
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
            </div>                  
            <br></br>
            <button onClick={handleNewChoice}>add new answer</button>
                      </div>

                </>
                    )

                  }
                 
              <button onClick={handleSubmit}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default New;