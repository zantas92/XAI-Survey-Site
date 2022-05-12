import React from 'react';
import '../../../css/App.css';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useEffect } from "react";
import $ from 'jquery';
import colorspectrum from '../../../images/raw/large/Spectrum.png';
import Create3DArray from '../../../utils/Create3DArray';
import GetImageData from '../../../utils/GetImageData';


const ImageMarking = () => {
    let index = 1;
    let navigate = useNavigate();
    var userData = undefined;
    var testActive = false;

    useEffect(() => {
        document.getElementById("animal").innerHTML =  GetImageData(index-1)[1];
        if(localStorage.getItem('pixelData') == null) {
            userData = Create3DArray(5,7,7);
            localStorage.setItem('pixelData', JSON.stringify(userData));
        }
        else {
            userData = JSON.parse(localStorage.getItem('pixelData'));
        }
        createPixelMask();
        SetImageValues()        
      },[])
    
    function SetImageValues() {
        var table = document.getElementById('pixel_Table')
        var row;
        for (var i = 0, row; row = table.rows[i]; i++) {
            for (var j = 0, col; col = row.cells[j]; j++) {
                if(userData[index-1][i][j] != null) {
                    $(col).css("opacity", userData[index-1][i][j]);
                }
                else {
                    $(col).css("opacity", "0.0");
                }
            }
        }
        document.getElementById("pixel_Table").style.backgroundImage = 'url(' + GetImageData(index-1)[0] + ')';
    }

    function createPixelMask(){

        var table = document.getElementById("pixel_Table");
        var row;
        var cell;
        for(var i=0;i<7;i++){
            row = table.insertRow(i);
              for(var j=0;j<7;j++){
                cell = row.insertCell(j);
                cell.addEventListener('click', IncreaseOpacity);
                cell.addEventListener('contextmenu', DecreaseOpacity)
            }
        }
    }
    
    function DecreaseOpacity(event) {
        if(!testActive) {
            event.preventDefault()
            var opacity_level = parseFloat($(event.target).css("opacity"));
            if (opacity_level > "0.25") {
                opacity_level = opacity_level - 0.50;
                $(event.target).css("opacity", opacity_level);
            }
			else if (opacity_level > "0.0") {
                opacity_level = opacity_level - 0.25;
                $(event.target).css("opacity", opacity_level);
            }
        }
	}
		
	function IncreaseOpacity(event) {
        if(!testActive) {
            var opacity_level = parseFloat($(event.target).css("opacity"));
            if (opacity_level < "0.25") {
                opacity_level = opacity_level + 0.25;	
            }
            else if (opacity_level < "0.75") {
				opacity_level = opacity_level + 0.50;
			}
			else {
                opacity_level = 0.0;
            }
            $(event.target).css("opacity", opacity_level);	
        }
	}

    function NextImage() {
        saveData();
        if(index == 5) {
            Next();
        }
        else {     
        index = index + 1;
        var imageCount = index;
        document.getElementById("headline").innerHTML = "Bild " + imageCount + " av 5";
        document.getElementById("animal").innerHTML =  GetImageData(index-1)[1];
        SetImageValues();
        testActive = true;
        changeOpacity()
        }
    }

    function PreviousImage() {
        saveData();
        if(index == 1) {
            navigate('/home')
        }
        else {         
            index = index - 1;
            var imageCount = index;
            document.getElementById("headline").innerHTML = "Bild " + imageCount + " av 5";
            document.getElementById("animal").innerHTML =  GetImageData(index-1)[1];
            SetImageValues();
            testActive = true;
            changeOpacity()
        }
    }

    function saveData() {
        var table = document.getElementById('pixel_Table')
    		for (var i = 0, row; row = table.rows[i]; i++) {
        		for (var j = 0, col; col = row.cells[j]; j++) {
                    if(parseFloat($(col).css("opacity")) == "1.0")  {
                        userData[index-1][i][j] = "0.0";  
                    }
                    else {
                        userData[index-1][i][j] = $(col).css("opacity");
                    }
                }
            } 
            localStorage.setItem('pixelData', JSON.stringify(userData));         
    }

    function Next() {
        navigate('/survey/image-ranking')        
    }

    function changeOpacity() {
        var table = document.getElementById('pixel_Table')
        var row;
        for (var i = 0, row; row = table.rows[i]; i++) {
            for (var j = 0, col; col = row.cells[j]; j++) {
                if(testActive) {
                    if(parseFloat($(col).css("opacity")) == "1.0") {                   
                        $(col).css("opacity", "0.0");
                    }
					$(col).css("background-color", "#4ee534");
                }
                else {
                    if(parseFloat($(col).css("opacity")) == "0.0") {
                        $(col).css("background-color", "black");
                        $(col).css("opacity", "1.0");
					} 
					else {
						$(col).css("background-color", "#ffffff00");					
					}
                }
            }
        }
        var button =  document.getElementById('change-opacity-button');
        testActive = !testActive;
        if(testActive) {
            button.innerText = "Vanlig vy";
        }
        else {
            button.innerText = "Mörklägg vy";
        }
    }

return (
    <div id="image-marking">
        <div className="main-container">
            <div className="header">
                <Navbar/>
            </div>
            <div className="container">
                <div className="content" style={{textAlign: "center"}}>
                <div>
                <h1>Del 1</h1>
                <h4>Bildmarkering</h4>
                <br>
                </br>
                <br>
                </br>
                </div>
                <h5 id="headline">Bild 1 av 5</h5>
                <h5 id="animal"></h5>
                    <div className="div-image-marking">
                        <Button id="change-opacity-button" variant="outline-secondary" size="sm" onClick={changeOpacity} style={{marginBottom: "5px"}}>Mörklägg vy</Button>               
                        <table id="pixel_Table" style={{float: "none"}}></table>                           
                    </div>                 
                    <div>
                        <Button id="Previous-button-part1" style={{ marginBottom: "20px", marginRight: "20px", marginLeft: "20px", width: "90px"}} variant="outline-secondary" onClick={PreviousImage}>Tillbaka</Button>
                        <Button id="Next-button-part1" style={{ marginBottom: "20px", marginRight: "20px", marginLeft: "20px", width: "90px"}} variant="outline-secondary"onClick={NextImage}>Nästa</Button>       
                    </div>
                    <figure>
                    <img src={colorspectrum} alt="Spektrum" />
                        <figcaption><abbr title=" - Högsta graden innebär att den rutan ensam är tillräckligt för att identifiera djuret.&#013;
                        - Medelgraden innebär att djuret är identifierbart med hjälp av den rutan, men enbart i kombination med en eller flera av de andra rutorna med samma grad.&#013;
                        - Lägsta graden, en ruta utan markering, indikerar att rutan är oviktig för identifiering."><h5>Gradskala</h5></abbr></figcaption>
                    </figure>
                </div> 
                <Footer/>
            </div>
        </div>
    </div>
    )   
}



export default ImageMarking;