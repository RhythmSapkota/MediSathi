
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg"
import {Link} from "react-router-dom"
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
<nav>
<Logo/>
</nav>

<div className="container page">
  <div className="info">
    <p>Introducing MediSathi, your comprehensive online platform for effortlessly locating top-tier doctors and hospitals. Navigating the vast healthcare landscape has never been easier simply enter your location, specialty preferences, and insurance details to access a carefully curated list of medical professionals and facilities tailored to your needs. Whether you require a specialists expertise or a nearby hospital in an emergency, MediSathi streamlines your search. MediSathi is here to guide you every step of the way.</p>   
    <h1>Find <span>Doctors </span> Nearby</h1>
    <Link to="/register" className="btn register-link"> Register </Link>
    <Link to="/login" className="btn"> Login / Guest Entry </Link>

  </div>
  <img src={main} alt='landimage' className="img main-img"/>

</div>
    </Wrapper>
  );
};



export default Landing;
