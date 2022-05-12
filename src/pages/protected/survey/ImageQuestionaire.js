import React from 'react';
import '../../../css/App.css';
import { useEffect } from "react";
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Button from 'react-bootstrap/Button';
import GetImageData from '../../../utils/GetImageData';
import { useNavigate } from 'react-router-dom';

const ImageQuestionaire = () => {
    var userData = undefined;
    let navigate = useNavigate();

    useEffect(() => { 
        if(localStorage.getItem('questionaireData') == null) {
            userData = ["",""];
            localStorage.setItem('questionaireData', JSON.stringify(userData));
        }
        else {
            userData = JSON.parse(localStorage.getItem('questionaireData'));           
        }
        setTextAreaData();    
        setImageData();  
      },[])

      function Next() {
        saveData();
        navigate('/survey/feedback')        
    }

    function Previous() {
        saveData();
        navigate('/survey/image-ranking')  
    }

    function saveData() {
        userData[0] = document.getElementById("areaOne").value;
        userData[1] = document.getElementById("areaTwo").value;
        localStorage.setItem('questionaireData', JSON.stringify(userData));
    }

    function setTextAreaData() {
        document.getElementById("areaOne").value = userData[0];
        document.getElementById("areaTwo").value =  userData[1];
    }

    function setImageData() {
        var rankData = JSON.parse(localStorage.getItem('rankData'));
        var index = 5; //default;
        if(rankData[0] === "Human") {
            if(rankData[1] === "Layer gradcam") {
                index = 5;
            }
            else {
                index = 9;
            }
        }
        else {
            if(rankData[0] === "Layer gradcam") {
                index = 5;
            }
            else {
                index = 9;
            }
        }
        for(var i = 0; i < 4; i++) {
            var img = document.getElementById("img_" + i);
            img.src = GetImageData(index+i)[0];
        }
    }
return (
    <div id="image-questionaire">
        <div className="main-container">
            <div className="header">
                <Navbar/>
            </div>
            <div className="container">
                <div className="content" style={{textAlign: "center"}}>
                <div>
                <h1>Del 3</h1>
                <h4>Frågor</h4>
                <br>
                </br>
                <br>
                </br>
                </div>
                <div className="row">
                    <div style={{float: "left", width: "50%"}}>
                                <div className="div-questionaire-images">  
                                    <label>Struts</label>
                                    <label>Gepard</label>
                                </div>    
                                <div className="div-questionaire-images">                            
                                    <img id="img_0"></img>                          
                                    <img id="img_1"></img>
                                </div> 
                                <div className="div-questionaire-images">  
                                    <label>Koala</label>
                                    <label>Surikat</label>
                                </div>    
                                <div className="div-questionaire-images">                             
                                    <img id="img_2"></img>                          
                                    <img id="img_3"></img>
                                </div>                     
                        <br>
                        </br>
                        <div>
                            <i>Håll muspekaren över en bild för att förstora den</i>
                        </div>
                    </div>
                    <div style={{float: "left", width: "50%"}}>
                        <div className="questionaire" style={{textAlign: "left"}}>
                            <p><b>Scenario:</b> Markeringarna i bilderna till vänster representerar vad som är viktigast i bilden enligt ett system som assisterar människor vid identifieringen av djur. Använd gärna djuren i bilderna för att exemplifiera dina svar.</p>
                            <br>
                            </br>
                            <label>Hur påverkar markeringarna ditt förtroende för att systemet identifierar djuren korrekt?</label>
                            <textarea id="areaOne"></textarea>             
                            <label>Kan du se några fördelar eller nackdelar med denna typ av markering i scenariot ovan?</label>
                            <textarea  id="areaTwo"></textarea>     
                            <div style={{textAlign: "center"}}>
                                <Button id="Previous-button-part3" style={{ marginBottom: "20px", marginRight: "20px", width: "90px"}} variant="outline-secondary" onClick={Previous}>Tillbaka</Button>
                                <Button id="Next-button-part3" style={{ marginBottom: "20px", marginLeft: "20px", width: "90px"}} variant="outline-secondary"onClick={Next}>Nästa</Button>       
                            </div>
                        </div>
                    </div>
                </div>   
                </div> 
                <Footer/>
            </div>
        </div>
    </div>
    )   
}



export default ImageQuestionaire;