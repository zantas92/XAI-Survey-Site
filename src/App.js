import Home from './pages/protected/Home';
import ImageMarking from './pages/protected/survey/ImageMarking';
import ImageRanking from './pages/protected/survey/ImageRanking';
import ImageQuestionaire from './pages/protected/survey/ImageQuestionaire';
import Feedback from './pages/protected/survey/Feedback';
import Submit from './pages/protected/survey/Submit';
import Login from './pages/auth/Login';
import './css/App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes';
import { useEffect } from 'react';
import { auth } from './configs/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { saveUser} from "./redux/slice/authSlice";
import ValidateScreenSize from '../src/components/ValidateScreenSize';

function App() {
  const user = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  useEffect(() => {
    wakeupServer();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.uid));
      } else {
        dispatch(saveUser(undefined));
        localStorage.removeItem('ageGenderAndEducationData');
        localStorage.removeItem('pixelData');
        localStorage.removeItem('rankData');
        localStorage.removeItem('questionaireData');
        localStorage.removeItem('feedbackData');
        localStorage.removeItem('imageOrder');
      }
    });
  }, [auth, dispatch]);

  function wakeupServer() {
    fetch("https://stormy-plains-42247.herokuapp.com/test"); 
  };


  return (
    <Router>
    <div className="app">
    <ValidateScreenSize/>
      <Routes>         
        <Route path="/" element={user ? <Home /> : <Login/>} replace/>
        <Route path="/home" replace element={<ProtectedRoutes/>}>
        <Route path="/home" replace element={<Home/>}/>
        </Route>
        <Route path="/survey" replace element={<ProtectedRoutes/>}>
        <Route path="/survey/image-marking" replace element={<ImageMarking/>}/>
        <Route path="/survey/image-ranking" replace element={<ImageRanking/>}/>
        <Route path="/survey/image-questionaire" replace element={<ImageQuestionaire/>}/>
        <Route path="/survey/feedback" replace element={<Feedback/>}/>
        <Route path="/survey/submit" replace element={<Submit/>}/>
        </Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
