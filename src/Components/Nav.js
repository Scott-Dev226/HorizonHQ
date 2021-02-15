import "../App.css";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import reactSpinner from "../react_spinner.png";
import siteLogo from "../cnote-logo.jpg";

<style>
  @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
</style>;

function Nav(props) {
  let isDarkMode = props.darkModeProp;

  const props2 = useSpring({
    config: { duration: 100000 },
    from: { transform: "rotate(-2200deg)" },
    to: { transform: "rotate(0deg)" },
  });

  return (
    <div className={isDarkMode ? "Dark-Mode" : "Light-Mode"} id="nav-div">
      <ul>
        <NavLink id="linkster" to="/HorizonHQ">
          <li className={isDarkMode ? "Dark-Mode" : "Light-Mode"}>HOME</li>
        </NavLink>
        <NavLink
          id="linkster"
          to={{ pathname: "https://www.twelvedata.com" }}
          target="_blank"
        >
          {" "}
          <li className={isDarkMode ? "Dark-Mode" : "Light-Mode"}>API INFO</li>
        </NavLink>
        <NavLink id="linkster" to="/About">
          <li className={isDarkMode ? "Dark-Mode" : "Light-Mode"}>ABOUT ME</li>
        </NavLink>
        <animated.div
          style={{ transform: props2.transform, opacity: props2.opacity }}
        ></animated.div>
      </ul>
    </div>
  );
}

export default Nav;
