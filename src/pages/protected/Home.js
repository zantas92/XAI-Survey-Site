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
            button.innerText = "M??rkl??gg vy";
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
								<p>Enk??ten best??r av tre delar. I den f??rsta delen f??r du visa vilka delar du tycker ??r viktigast f??r att identifiera djuret p?? 5 olika bilder. Detta g??r du genom att placera markeringar i ett rutn??t. I den andra delen f??r du rangordna tre olika varianter av genererade markeringar. I den sista delen f??r du besvara tv?? fr??gor om att anv??nda dessa markeringar i ett scenario.</p>
								<br></br>
								<p>I den f??rsta delen kan varje ruta ha en av tre olika grader enligt gradskalan till ner till h??ger, d??r gr??nare f??rg inneb??r h??gre grad. Vi rekommenderar att titta p?? varje ruta individuellt och f??rs??ka avg??ra till hur viktig den ??r f??r din identifiering av djuret.</p>
								<ul>
									<li>H??gsta graden inneb??r att den rutan ensam ??r tillr??ckligt f??r att identifiera djuret.</li>
									<li>Medelgraden inneb??r att djuret ??r identifierbart med hj??lp av den rutan, men enbart i kombination med en eller flera av de andra rutorna med samma grad.</li>
									<li>L??gsta graden, en ruta utan markering, indikerar att rutan ??r oviktig f??r identifiering.</li>
								</ul>
								<br></br>
								<p>I exempelbilden till h??ger kan du testa hur den f??rsta delen fungerar. Med knappen ???M??rkl??gg vy??? kan du ??ven se hur bilden hade sett ut med enbart de rutor du har markerat. Notera att du <i>inte</i> beh??ver markera hela djuret, utan bara de rutor som hj??lper dig med din identifiering. Det finns inga begr??nsningar p?? m??ngden markeringar och inte heller n??got som ??r r??tt eller fel. Det vi ??r intresserade av ??r vad du tycker ??r viktigt!</p>
								<br></br>
								<p>
									Vid fr??gor n??r du oss p?? e-post
									<br>
									</br>
									<u>xaiundersokning@gmail.com</u>
								</p>
								<br></br>	
							</div>
							<div style={{float: "left", width: "50%", textAlign: "center"}}>
								<h4>Exempel</h4>
								<Button id="change-opacity-button"variant="outline-secondary" onClick={changeOpacity} size="sm" style={{marginBottom: "5px"}}>M??rkl??gg vy</Button>   
								<table id="pixel_Table"></table>
								<p>
									<small>
										<i style={{fontSize: "12px"}}>
										V??nsterklick ??kar niv??n f??r en ruta med ett steg,<br></br> 
										h??gerklick minskar ett steg.
										P?? h??gsta niv??n kan du v??nsterklicka <br></br>igen f??r att rutan ska bli avmarkerad.
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
								Tryck p?? ???Starta enk??ten??? n??r du ??r redo.
								</p>
								<Button variant="outline-secondary" onClick={() => {
									navigate('/survey/image-marking');
								}}
								>Starta enk??ten</Button> 	
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