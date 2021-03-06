import React from 'react';
import '../../../css/App.css';
import { useEffect } from "react";
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useNavigate } from 'react-router-dom';
import GetUserId from '../../../utils/GetUserId';
import Button from 'react-bootstrap/Button';

const Feedback = () => {
    const userId = GetUserId();
    var userData = undefined;
    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('feedbackData') == null) {
            userData = ["",""];
            localStorage.setItem('feedbackData', JSON.stringify(userData));
        }
        else {
            userData = JSON.parse(localStorage.getItem('feedbackData'));
            
        }
        setTextAreaData();       
      },[])



    function Submit() {       
        saveData();  
        const data = {
            userId: userId,
            pixelData: JSON.parse(localStorage.getItem('pixelData')),
            rankData: JSON.parse(localStorage.getItem('rankData')),
            questionaireData: JSON.parse(localStorage.getItem('questionaireData')),
            feedbackData: JSON.parse(localStorage.getItem('feedbackData')),
            ageGenderAndEducationData: JSON.parse(localStorage.getItem('ageGenderAndEducationData')),
        }       

        fetch("https://stormy-plains-42247.herokuapp.com/submit", {
            mode: "cors",
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            return response.json();
        });
        navigate('/survey/submit') 
    }

    function Previous() {
        saveData();
        navigate('/survey/image-questionaire') 
    }

    function saveData() {
        userData[0] = document.getElementById("textArea_one").value;
        userData[1] = document.getElementById("textArea_two").value;
        localStorage.setItem('feedbackData', JSON.stringify(userData));
    }

    function setTextAreaData() {
        document.getElementById("textArea_one").value = userData[0];
        document.getElementById("textArea_two").value = userData[1];
    }

return (
    <div id="Survey_Feedback">
        <div className="main-container">
            <div className="header">
                <Navbar/>
            </div>
            <div className="container">
                <div className="content" style={{textAlign: "center"}}>
                <div>
                    <h1>Feedback</h1>
                    <br>
                    </br>
                    <p><b>Vi ??r tacksamma om du tar n??gon minut att l??mna dina ??sikter.</b></p>
                    <br>
                    </br>
                    <br>
                    </br>
                    </div>
                    <div className="feedback"> 
                        <div>
                            <label>Har du n??gra tankar kring andra m??jliga s??tt att f??rmedla vad som ??r viktigt f??r att identifiera en djurart?</label>
                            <textarea id="textArea_one"></textarea>  
                        </div>
                        <div>
                            <label>??vriga kommentarer? (T.ex. sv??rtolkade fr??gor, otydliga instruktioner, tekniska problem eller andra ??sikter)</label>
                            <textarea id="textArea_two"></textarea>  
                        </div>                            
                    </div>
                    <div>
                    <p><i>N??r du k??nner dig f??rdig med enk??ten kan du klicka nedan p?? knappen "Skicka in"</i></p>
                    <Button id="Previous-button-part4" style={{ marginBottom: "20px", marginRight: "20px", marginLeft: "20px", width: "90px"}} variant="outline-secondary" onClick={Previous}>Tillbaka</Button>
                    <Button id="Next-button-part4" style={{ marginBottom: "20px", marginRight: "20px", marginLeft: "20px", width: "90px"}} variant="outline-secondary"onClick={Submit}>Skicka in</Button>
                    </div>
                </div> 
                <Footer/>
            </div>
        </div>
    </div>
    )   
}



export default Feedback;