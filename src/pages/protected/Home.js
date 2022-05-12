import React from 'react';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
import '../../css/App.css';
import { useEffect } from 'react';
import colorspectrum from '../../images/raw/large/Spectrum.png';
import exampleImage from '../../images/raw/large/Elephant2.jpg';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Home = () => {
	var testActive = false;
	useEffect(() => {
		createPixelMask();
	}, [])

	let navigate = useNavigate();

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

    	document.getElementById("pixel_Table").style.backgroundImage = 'url(' + exampleImage + ')';
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
		<div id="Home">
			<div className="main-container">
					<div className="header">
						<Navbar/>
					</div>
				<div className="container">
					<div className="content">	           
						<div className="row">
							<div style={{float: "left", width: "50%", textAlign: "left"}}>
								<p>Enkäten består av tre delar. I den första delen får du visa vilka delar du tycker är viktigast för att identifiera djuret på 5 olika bilder. Detta gör du genom att placera markeringar i ett rutnät. I den andra delen får du rangordna tre olika varianter av genererade markeringar. I den sista delen får du besvara två frågor om att använda dessa markeringar i ett scenario.</p>
								<br></br>
								<p>I den första delen kan varje ruta ha en av tre olika grader enligt gradskalan till ner till höger, där grönare färg innebär högre grad. Vi rekommenderar att titta på varje ruta individuellt och försöka avgöra till hur viktig den är för din identifiering av djuret.</p>
								<ul>
									<li>Högsta graden innebär att den rutan ensam är tillräckligt för att identifiera djuret.</li>
									<li>Medelgraden innebär att djuret är identifierbart med hjälp av den rutan, men enbart i kombination med en eller flera av de andra rutorna med samma grad.</li>
									<li>Lägsta graden, en ruta utan markering, indikerar att rutan är oviktig för identifiering.</li>
								</ul>
								<br></br>
								<p>I exempelbilden till höger kan du testa hur den första delen fungerar. Med knappen ”Mörklägg vy” kan du även se hur bilden hade sett ut med enbart de rutor du har markerat. Notera att du <i>inte</i> behöver markera hela djuret, utan bara de rutor som hjälper dig med din identifiering. Det finns inga begränsningar på mängden markeringar och inte heller något som är rätt eller fel. Det vi är intresserade av är vad du tycker är viktigt!</p>
								<br></br>
								<p>
									Vid frågor når du oss på e-post
									<br>
									</br>
									<u>xaiundersokning@gmail.com</u>
								</p>
								<br></br>	
							</div>
							<div style={{float: "left", width: "50%", textAlign: "center"}}>
								<h4>Exempel</h4>
								<Button id="change-opacity-button"variant="outline-secondary" onClick={changeOpacity} size="sm" style={{marginBottom: "5px"}}>Mörklägg vy</Button>   
								<table id="pixel_Table"></table>
								<p>
									<small>
										<i style={{fontSize: "12px"}}>
										Vänsterklick ökar nivån för en ruta med ett steg,<br></br> 
										högerklick minskar ett steg.
										På högsta nivån kan du vänsterklicka <br></br>igen för att rutan ska bli avmarkerad.
										</i>
									</small>
								</p>
								<figure>
								<img src={colorspectrum} alt="Spektrum" style={{border: "1px solid black"}}/>
									<figcaption>
										<h5>
											Gradskala
										</h5>
									</figcaption>
								</figure>
								<p>
								Tryck på “Starta enkäten” när du är redo.
								</p>
								<Button variant="outline-secondary" onClick={() => {
									navigate('/survey/image-marking');
								}}
								>Starta enkäten</Button> 	
							</div>
						</div>
					</div>
					<Footer/>	
				</div>			
			</div>
		</div>
    )
}

export default Home;