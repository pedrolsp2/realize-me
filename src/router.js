import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Index from './Pages/Index';

function RoutesApp(){
    return(
    <BrowserRouter> 
    <Header/>
        <Routes>
            <Route path="/" element={ <Index/> }/> 
        </Routes>
    </BrowserRouter>
);
}

export default RoutesApp;