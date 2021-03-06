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
                <h1>V??lkommen till v??r enk??t om Explainable AI</h1>
                <br>
                </br>
              </div>
              <div style={{width: "75%"}}>
                <p>Du beh??ver inte ha n??gra f??rkunskaper inom AI (Artificiell Intelligens) f??r att utf??ra enk??ten. Enk??ten syftar till att utforska vilka likheter och skillnader som finns mellan m??nsklig klassificering av visuella objekt och Explainable AI-metoder, som syftar till att ge m??nniskor insyn i vad som p??verkar beslut fattade av automatiserade system.</p>
                <p>M??let med unders??kningen ??r att j??mf??ra m??nniskor och Explainable AI-metoder, samt hur m??nniskor uppfattar dessa metoder. P?? detta s??tt hoppas vi f?? information som kan f??rb??ttra f??rst??elsen om Explainable AI-metoder och vad som g??r dem anv??ndbara.</p>
                <br>
                </br>
                <h6>De enda personuppgifter som sparas ??r de du anger nedan. I ??vrigt sparas enbart dina enk??tsvar. Alla uppgifter ??r anonyma och lagras i 1 ??r. Enk??ten tar ca <u>10 minuter</u> att genomf??ra. 
                <br>
                </br>
                <br>
                </br>
                Stort tack f??r din tid!
                </h6>
                <br>
                </br> 
                <label style={{fontSize: "16px"}}>??lder</label>
                <br>
                </br>
                <select id="age" style={{width: "150px"}} onChange={fieldsFilled}> 
                  <option value="" hidden>Ange din ??lder</option>
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
                  <label style={{fontSize: "16px"}}>K??nsidentitet</label>
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
                  <label>P??b??rjad men ej avslutad</label>
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
                  Jag har tagit del av informationen ovan och samtycker till att delta. Jag ??r	medveten om att mitt deltagande ??r helt frivilligt och att	jag kan avbryta mitt deltagande i studien utan att ange n??got sk??l.
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