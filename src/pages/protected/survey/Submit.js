import React from 'react';
import '../../../css/App.css';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const Submit = () => {

return (
    <div id="Survey_Submit">
        <div className="main-container">
            <div className="header">
                <Navbar/>
            </div>
            <div className="container">
                <div className="content" style={{textAlign: "center"}}>
                    <div style={{paddingTop: "300px"}}>
                    <h1>Stort tack för din medverkan i vår enkät.</h1>
                    <br>
                    </br>
                    <div>
                        <h4>Dina svar är inskickade och du kan nu lämna sidan om du vill!</h4> 
                    </div>
                    </div>
                </div> 
                <Footer/>
            </div>
        </div>
    </div>
    )   
}



export default Submit;