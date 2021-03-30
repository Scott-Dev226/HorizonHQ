import "../App.css";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import reactSpinner from "../react_spinner.png";
import siteLogo from "../My Horizon.jpg";
import { Canvas, useFrame } from "react-three-fiber";
import { Stars, Sky } from "@react-three/drei";
import { OrbitControls, StandardEffects, draco } from "@react-three/drei";
import { useRef, useState } from "react";

<style>
  @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
</style>;

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  let isDarkMode = props.darkModeProp;
  let arrowUpPosition = props.arrowProp;
  let rotationSpeed = 0.005;
  const [starCoolDown, setStarCoolDown] = useState(false);
  if (!isDarkMode) {
    rotationSpeed = 0.005;
  }

  // Rotate mesh every frame, this is outside of React without overhead

  useFrame(() => {
    mesh.current.rotation.y += rotationSpeed;
  });

  setTimeout(() => {
    setStarCoolDown(true);
  }, 3000);

  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry attach="geometry" args={[2.25, 4, 4]} />
      <meshBasicMaterial
        wireframe={true}
        reflectivity={0.5}
        metalness={1}
        attach="material"
        color={starCoolDown ? "rgb(0, 58, 248)" : "red"}
      />
    </mesh>
  );
}

function Nav(props) {
  let isDarkMode = props.darkModeProp;

  const props2 = useSpring({
    config: { duration: 100000 },
    from: { transform: "rotate(-2200deg)" },
    to: { transform: "rotate(0deg)" },
  });

  return (
    <div>
      <div className={isDarkMode ? "Dark-Mode" : "Light-Mode"} id="nav-div">
        <ul id="nav-link-style">
          <div id="BlueStar-Logo-Sizer">
            <img id="logo-pic" src={siteLogo}></img>
          </div>
          <p className={isDarkMode ? "site-logo-Dark" : "site-logo-Light"}>
            BlueStar HQ
          </p>
          <NavLink id="linkster" to="/HorizonHQ">
            <li className={isDarkMode ? "Dark-Mode" : "Light-Mode"}>HOME</li>
          </NavLink>
          <NavLink
            id="linkster"
            to={{ pathname: "https://www.twelvedata.com" }}
            target="_blank"
          >
            {" "}
            <li className={isDarkMode ? "Dark-Mode" : "Light-Mode"}>
              API INFO
            </li>
          </NavLink>

          <animated.div
            style={{ transform: props2.transform, opacity: props2.opacity }}
          ></animated.div>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
