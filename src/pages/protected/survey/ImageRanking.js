import React from 'react';
import '../../../css/App.css';
import { useEffect } from "react";
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import GetModelImageData from '../../../utils/GetModelImageData';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const ImageRanking= () => {
    var userData = undefined;
    var modelData = GetModelImageData();
    let navigate = useNavigate();
    let methods = undefined;

    useEffect(() => {
        if(localStorage.getItem('rankData') == null) {
            userData = ["","",""];
            localStorage.setItem('rankData', JSON.stringify(userData));

            methods = [["Occlusion", 0], ["Layer gradcam", 3], ["Human", 6]];
            shuffle();
            localStorage.setItem('imageOrder', JSON.stringify(methods));
        }
        else {
            userData = JSON.parse(localStorage.getItem('rankData'));
            methods = JSON.parse(localStorage.getItem('imageOrder'));
        }
        setImageOrder();
        setOptionValues();
        setSelectData();
        changeButtonState();     
      },[])

    function shuffle() {
        let currentIndex = methods.length, randomIndex;

        while(currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [methods[currentIndex], methods[randomIndex]] = [
                methods[randomIndex], methods[currentIndex]];       
        }
    }  

    function setOptionValues() {
        var selectors = document.getElementsByClassName("selectImage");
        for(var i = 0; i < selectors.length; i++) {
            var options = selectors[i].getElementsByTagName("option");
            for(var j = 1; j < options.length; j++) {
                options[j].value = methods[j-1][0];
            }
        }
    }

    function setImageOrder() {
        var divA = document.getElementById("A");
        var divB = document.getElementById("B");
        var divC = document.getElementById("C");
        var images;

        images = divA.getElementsByTagName("img");
        for(var i = 0; i<images.length; i++) {
            images[i].src = modelData[methods[0][1]+i][2];
        }
        images = divB.getElementsByTagName("img");
        for(var i = 0; i<images.length; i++) {   
            images[i].src = modelData[methods[1][1]+i][2];
        }
        images = divC.getElementsByTagName("img");
        for(var i = 0; i<images.length; i++) {
            images[i].src = modelData[methods[2][1]+i][2];
        }
    }

    function Next() {
        saveData();
        navigate('/survey/image-questionaire')       
    }

    function Previous() {
        saveData();
        navigate('/survey/image-marking')  
    }

    function setSelectData() {
        if(userData[0] != "") {
            document.getElementById("rank-one").value = userData[0];
        }
        if(userData[0] != "") {
            document.getElementById("rank-two").value =  userData[1];
        }
        if(userData[0] != "") {
            document.getElementById("rank-three").value =  userData[2];
        } 
    }

    function saveData() {
        userData[0] = document.getElementById("rank-one").value;
        userData[1] = document.getElementById("rank-two").value;
        userData[2] = document.getElementById("rank-three").value;
        localStorage.setItem('rankData', JSON.stringify(userData)); 
    }

    function changeButtonState() {
        if(
            document.getElementById("rank-one").value == "" || 
            document.getElementById("rank-two").value == "" ||
            document.getElementById("rank-three").value == ""
            ) 
            {
          
                document.getElementById("Next-button-part2").disabled = true;
            }      
            else 
            {
       
                document.getElementById("Next-button-part2").disabled = false;
            }  
    }

return (
    <div id="image-ranking">
        <div className="main-container">
            <div className="header">
                <Navbar/>
            </div>
            <div className="container">
                <div className="content" style={{textAlign: "center"}}>
                <div>
                <h1>Del 2</h1>
                <h4>Rangordna bilder</h4>
                <br>
                </br>
                <br>
                </br>
                </div>
                <div className="row">
                    <div style={{float: "left", width: "50%"}}>
                        <div id="A" className="ModelDiv">
                        <h2 style={{display: "inline"}}>A</h2>     
                        <img style={{marginLeft: "10px"}}></img>
                        <img style={{marginLeft: "10px"}}></img>
                        <img style={{marginLeft: "10px"}}></img>        
                        </div>
                        <br>
                        </br>
                        <div id="B" className="ModelDiv">
                        <h2 style={{display: "inline"}}>B</h2>    
                        <img style={{marginLeft: "10px"}}></img>
                        <img style={{marginLeft: "10px"}}></img>
                        <img style={{marginLeft: "10px"}}></img>                          
                        </div>
                        <br>
                        </br>
                        <div id="C" className="ModelDiv">
                        <h2 style={{display: "inline"}}>C</h2>
                        <img style={{marginLeft: "10px"}}></img>
                        <img style={{marginLeft: "10px"}}></img>
                        <img style={{marginLeft: "10px"}}></img>                  
                        </div>
                        <br>
                        </br>
                        <br>
                        </br>  
                        <div>
                            <i>Håll muspekaren över en bild för att förstora den</i>
                        </div>
                    </div>
                    <div style={{float: "left", width: "50%"}}>
                        <p style={{textAlign: "left"}}>Rangordna de tre olika metoderna till vänster efter hur väl markeringarna representerar vad du anser är viktigt för att identifiera djuret på bilden.</p>
                        <div style={{textAlign: "left"}}>
                            <div style={{marginBottom: "30px", textAlign: "center"}}>
                                <h4 style={{display: "inline", marginRight: "20px"}}>1.</h4>
                                <select id="rank-one" className="selectImage" style={{width: "150px"}} onChange={ () => { 
                                    if(document.getElementById("rank-two").value == document.getElementById("rank-one").value) {
                                        document.getElementById("rank-two").selectedIndex = 0;
                                    }
                                    if(document.getElementById("rank-three").value == document.getElementById("rank-one").value) {
                                        document.getElementById("rank-three").selectedIndex = 0;
                                    }
                                    changeButtonState();                            
                                }}> 
                                    <option value="" hidden>Välj en förklaring</option>
                                    <option value="Placeholder_A" style={{textAlign: "left"}}>A</option>
                                    <option value="Placeholder_B" style={{textAlign: "left"}}>B</option>
                                    <option value="Placeholder_C" style={{textAlign: "left"}}>C</option>    
                                </select>
                            </div>
                            <div style={{marginBottom: "30px", textAlign: "center"}}>
                            <h4 style={{display: "inline", marginRight: "20px"}}>2.</h4>
                                <select id="rank-two" className="selectImage" style={{width: "150px"}} onChange={ () => { //Change to %?
                                    if(document.getElementById("rank-two").value == document.getElementById("rank-one").value) {
                                        document.getElementById("rank-one").selectedIndex = 0;
                                    }
                                    if(document.getElementById("rank-two").value == document.getElementById("rank-three").value) {
                                        document.getElementById("rank-three").selectedIndex = 0;
                                    }
                                    changeButtonState();
                            }}>
                                    <option value="" hidden>Välj en förklaring</option>
                                    <option value="Placeholder_A" style={{textAlign: "left"}}>A</option>
                                    <option value="Placeholder_B" style={{textAlign: "left"}}>B</option>
                                    <option value="Placeholder_C" style={{textAlign: "left"}}>C</option>     
                                </select>
                            </div>
                            <div style={{marginBottom: "30px", textAlign: "center"}}>
                            <h4 style={{display: "inline", marginRight: "20px"}}>3.</h4>
                            <select id="rank-three" className="selectImage" style={{width: "150px"}} onChange={ () => { //Change to %?
                                    if(document.getElementById("rank-three").value == document.getElementById("rank-one").value) {
                                        document.getElementById("rank-one").selectedIndex = 0;
                                    }
                                    if(document.getElementById("rank-three").value == document.getElementById("rank-two").value) {
                                        document.getElementById("rank-two").selectedIndex = 0;
                                    }
                                    changeButtonState();
                            }}>
                                    <option value="" hidden>Välj en förklaring</option>
                                    <option value="Placeholder_A" style={{textAlign: "left"}}>A</option>
                                    <option value="Placeholder_B" style={{textAlign: "left"}}>B</option>
                                    <option value="Placeholder_C" style={{textAlign: "left"}}>C</option>    
                                </select>  
                            </div>
                        </div>
                    <div style={{textAlign: "center"}}>
                        <br>
                        </br>
                        <br>
                        </br>
                        <Button id="Previous-button-part2" style={{ marginBottom: "20px", marginRight: "20px", width: "90px"}} variant="outline-secondary" onClick={Previous}>Tillbaka</Button>
                        <Button id="Next-button-part2" style={{ marginBottom: "20px", marginLeft: "20px", width: "90px"}} variant="outline-secondary"onClick={Next}>Nästa</Button>       
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



export default ImageRanking;