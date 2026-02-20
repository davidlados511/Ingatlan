import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Offers from './Offers';
import Newad from './Newad';
import '../style/homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = () => {
    return(
        <div className="container">
           <div className="start w-100">
            <h1 className="text-center pt-2 pt-lg-4">Á.L.B. Ingatlanügynöség</h1>
            <div className="row">
                <div className="col-12 col-sm-6 text-center">
                    <button className="btn btn-primary" onClick={() => window.location.href = '/newad'}>Hírdesse nálunk!</button>
                </div>
                <div className="col-12 col-sm-6 text-center">
                    <button className="btn btn-primary" onClick={() => window.location.href = '/offers'}>Nézze meg kínálatunkat</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Homepage;