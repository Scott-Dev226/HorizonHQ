import AppleImage from "../aapl-back.jpg";
import GoogleImage from "../goog-back.jpg";
import isDarkMode from "./Home";

const FrontPageNewsStory = (props) => {
  let isDarkMode = props.darkModeProp;

  return (
    <div
      id="news-headlines"
      className={isDarkMode ? "Dark-Mode" : "Light-Mode"}
    >

    <div id = "newsHeadlineCenterDiv">
      <h1
        id="quickNewsHeadline"
        className={isDarkMode ? "Dark-Mode" : "Light-Mode"}
      >
        {" "}
        {props.Headline}{" "}
      </h1>
      </div>
      <img
        id="news-img"
        className={isDarkMode ? "Dark-Mode" : "Light-Mode"}
        src={props.Image}
        alt={props.Name}
      ></img>

      <div id="newsDescriptionCenterDiv">
      <p
        id="quickNewsDescription"
        className={isDarkMode ? "Dark-Mode" : "Light-Mode"}
      >
        {" "}
        {props.Description}{" "}
      </p>
      <br></br>
      <p
        id="quickNewsDescription"
        className={isDarkMode ? "Dark-Mode" : "Light-Mode"}
      >
        {" "}
        {props.Description2}{" "}
      </p>
      </div>
    </div>
  );
};

export default FrontPageNewsStory;
