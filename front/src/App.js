
import './App.css';
import{BrowserRouter, Route, Routes}from "react-router-dom"
import { Register } from './pages/register';
import { Login } from './pages/login';
import { Chat } from './pages/chat';
import SetAvatar from './pages/setAvatar';





function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Chat/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/SetAvatar' element={<SetAvatar/>}/>

      </Routes>
    </BrowserRouter>
  );
}


export default App;
