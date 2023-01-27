import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import UserList from './pages/Userlist/Userlist';
import New from './pages/new/new';
import EditVar from './pages/editVar/editVar';
import EditQuestion from './pages/editQuestion/editQuestion';
import Questionslist from './pages/Questionslist/Questionslist';
import Variableslist from "./pages/Variableslist/VariablesList";
import NewChoice from './pages/NewChoice/NewChoice';
import HomePage from './pages/Home';
import Single from './pages/single/single';
import NewVar from "./pages/NewVar/NewVar"
import NewUnit from "./pages/NewUnit/NewUnit"
import {userInputs} from './assets/formsource';
import Calculator from './pages/Calculator/Calculator';
import PrivateRoute from './services/PrivateRoute';
export default function App() {
  return (
   
 

     <BrowserRouter>
        <Routes>
        <Route element={<PrivateRoute/>}>
            <Route path="/app" element={<HomePage />} />
          </Route>  
          <Route path="/" element={<Calculator />} />
          <Route path="users">
              <Route index element={<UserList />} />
              <Route path=":userId" element={<Single />} /></Route>  
              <Route
                path="NewUnit"
                element={<NewUnit inputs={userInputs} title="Add New Unit" />}
              /> 
              <Route path="questions">
              <Route index element={<Questionslist />} />
              <Route
                path="edit/:questionId"
                element={<EditQuestion inputs={userInputs} title="Edit your Question" />}
              />
              <Route
                path="new/"
                element={<New inputs={userInputs} title="Add New Question" />}
              /></Route>  
              <Route
                path="newChoice/:questionId"
                element={<NewChoice inputs={userInputs} title="Add New Choice" />}
              />
              <Route path="variables">
             
              <Route index element={<Variableslist />} />
              <Route
                path="edit/:variableId"
                element={<EditVar inputs={userInputs} title="Edit your variable" />}
              />
               <Route
                path="new/"
                element={<NewVar inputs={userInputs} title="Edit your variable" />}
              /></Route>  
              
              <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
        </Routes>
      </BrowserRouter>
 
  );
}

