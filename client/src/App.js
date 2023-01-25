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
import Questionslist from './pages/Questionslist/Questionslist';
import Variableslist from "./pages/Variableslist/VariablesList";
import HomePage from './pages/Home';
import Single from './pages/single/single';
import {userInputs} from './assets/formsource';
import PrivateRoute from './services/PrivateRoute';
export default function App() {
  return (
   
 

     <BrowserRouter>
        <Routes>
        <Route element={<PrivateRoute/>}>
            <Route path="/" element={<HomePage />} />
          </Route>  
          <Route path="users">
              <Route index element={<UserList />} />
              <Route path=":userId" element={<Single />} /></Route>   
              <Route path="questions">
              <Route index element={<Questionslist />} />
              <Route
                path=":questionId"
                element={<New inputs={userInputs} title="Add New Question" />}
              /></Route>  
              <Route path="variables">
              <Route index element={<Variableslist />} />
              <Route
                path=":variableId"
                element={<EditVar inputs={userInputs} title="Edit your variable" />}
              /></Route>  
              <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
        </Routes>
      </BrowserRouter>
 
  );
}

