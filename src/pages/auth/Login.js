import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { auth, provider} from '../../configs/firebaseConfig';
import { useEffect } from "react";
import '../../css/App.css';
import Footer from '../../components/Footer';

const Login = () => {
  let navigate = useNavigate();
  let gender = "";
  let age = "";
  let education = "";
  let userData = ["","",""];

  useEffect(() => { 
    document.getElementById('Login-button').disabled = true;
    if(localStorage.getItem('ageGenderAndEducationData') == null) {
      userData = ["","",""];
      localStorage.setItem('ageGenderAndEducationData', JSON.stringify(userData));
  }
  else {
      userData = JSON.parse(localStorage.getItem('ageGenderAndEducationData'));
  }
  },[])

  async function signInWithGoogle() {
    auth
      .signInWithPopup(provider)
      .then((res) => {
      ;
          navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });

    }

  function fieldsFilled() {
    var divGender = document.getElementById("radioDiv-gender");
    var radioButtonsGender = divGender.getElementsByTagName("input");

    var divEducation = document.getElementById("radioDiv-education");
    var radioButtonsEducation = divEducation.getElementsByTagName("input");

    var consent = document.getElementById("consent")
    age = document.getElementById('age').value;

    for(var i = 0; i < radioButtonsGender.length; i++) {
      if (radioButtonsGender[i].checked) {
        gender = radioButtonsGender[i].value;   
      }
    }

    for(var i = 0; i < radioButtonsEducation.length; i++) {
      if (radioButtonsEducation[i].checked) {
        education = radioButtonsEducation[i].value;    
      }
    }

    if(gender != "" && age != "" && education != "" && consent.checked) {
      document.getElementById("Login-button").disabled = false;
    }
    else {
      document.getElementById("Login-button").disabled = true;   
    }
  }

  function saveData() {
    userData[0] = age;
    userData[1] = gender;
    userData[2] = education
    localStorage.setItem('ageGenderAndEducationData', JSON.stringify(userData)); 
  }

  return (
    <div id="Login" style={{paddingTop: "54px"}}>
      <div className="main-container">
          <div className="container">
            <div className="content" style={{width: "75%"}}>
              <div>
                <h1>Välkommen till vår enkät om Explainable AI</h1>
                <br>
                </br>
              </div>
              <div style={{width: "75%"}}>
                <p>Du behöver inte ha några förkunskaper inom AI (Artificiell Intelligens) för att utföra enkäten. Enkäten syftar till att utforska vilka likheter och skillnader som finns mellan mänsklig klassificering av visuella objekt och Explainable AI-metoder, som syftar till att ge människor insyn i vad som påverkar beslut fattade av automatiserade system.</p>
                <p>Målet med undersökningen är att jämföra människor och Explainable AI-metoder, samt hur människor uppfattar dessa metoder. På detta sätt hoppas vi få information som kan förbättra förståelsen om Explainable AI-metoder och vad som gör dem användbara.</p>
                <br>
                </br>
                <h6>De enda personuppgifter som sparas är de du anger nedan. I övrigt sparas enbart dina enkätsvar. Alla uppgifter är anonyma och lagras i 1 år. Enkäten tar ca <u>10 minuter</u> att genomföra. 
                <br>
                </br>
                <br>
                </br>
                Stort tack för din tid!
                </h6>
                <br>
                </br> 
                <label style={{fontSize: "16px"}}>Ålder</label>
                <br>
                </br>
                <select id="age" style={{width: "150px"}} onChange={fieldsFilled}> 
                  <option value="" hidden>Ange din ålder</option>
                  <option value="<20" style={{textAlign: "left"}}>Under 20</option>
                  <option value="20-29" style={{textAlign: "left"}}>20-29</option>
                  <option value="30-39" style={{textAlign: "left"}}>30-39</option>   
                  <option value="40-49" style={{textAlign: "left"}}>40-49</option>
                  <option value="50-59" style={{textAlign: "left"}}>50-59</option>
                  <option value="60+" style={{textAlign: "left"}}>60+</option>
                  <option value="no-answer" style={{textAlign: "left"}}>Vill ej ange</option>     
                </select>             
                <br>
                </br>  
                <br>
                </br>
                <div id="radioDiv-gender">
                  <label style={{fontSize: "16px"}}>Könsidentitet</label>
                  <br>
                  </br>
                  <input type="radio" id="male" value="male" name="genderCheck" onClick={fieldsFilled}></input>
                  <label>Man</label>
                  <input type="radio" id="female" value="female" name="genderCheck" onClick={fieldsFilled}></input>
                  <label>Kvinna</label>
                  <input type="radio" id="other" value="other" name="genderCheck" onClick={fieldsFilled}></input>
                  <label>Annat</label>
                  <input type="radio" id="no-answer" value="no answer" name="genderCheck" onClick={fieldsFilled}></input>
                  <label>Vill ej ange</label>
                  <br>
                  </br>  
                  <br>
                  </br>
                </div>
                <div id="radioDiv-education">
                  <label style={{fontSize: "16px"}}>Datavetenskaplig universitetsutbildning</label>
                  <br>
                  </br>
                  <input type="radio" id="none" value="none" name="educationCheck" onClick={fieldsFilled}></input>
                  <label>Ingen</label>
                  <input type="radio" id="ongoing" value="unfinished" name="educationCheck" onClick={fieldsFilled}></input>
                  <label>Påbörjad men ej avslutad</label>
                  <input type="radio" id="finished" value="finished" name="educationCheck" onClick={fieldsFilled}></input>
                  <label>Avslutad</label>
                  <br>
                  </br>  
                  <br>
                  </br>
                </div>

                <input type="checkbox" id="consent" onClick={fieldsFilled}>            
                </input>
                <label style={{display: "inline", marginLeft: "5px"}}>
                  <i>
                  Jag har tagit del av informationen ovan och samtycker till att delta. Jag är	medveten om att mitt deltagande är helt frivilligt och att	jag kan avbryta mitt deltagande i studien utan att ange något skäl.
                  </i>
                  </label>
                <br>
                </br>
              </div>
              <Button id="Login-button" style={{ marginTop: "20px"}} variant="outline-secondary" onClick={ () => {
                saveData();
                signInWithGoogle();
              }}
              >
                Logga in med Google
              </Button>      
            </div> 
            <Footer/>
          </div>               
      </div>
    </div>
  )
}

export default Login;