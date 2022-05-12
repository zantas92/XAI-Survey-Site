import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();
    const auth = getAuth();
    


    return (
    <nav className="navbar navbar-light bg-light">
        <form className="container-fluid justify-content-end">
        <Button style={{ marginLeft: "20px"}} variant="outline-secondary" onClick={() => {
            navigate('/home')
        }}
        >
            Hem
        </Button>   
        <Button style={{ marginLeft: "20px"}} variant="outline-secondary" onClick={() => {
        signOut(auth).then(() => {
            navigate('/')
          }).catch((error) => {
            // An error happened.
          });
        }}
        >Logga ut</Button>       
        </form>
    </nav>
    )
}

export default Navbar;