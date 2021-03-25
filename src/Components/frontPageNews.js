import FrontPageNewsStories from "./frontPageNewsStories";
import isNewsVisible from "./Home";
import BigShort from "./bigshort";

const FrontPageNews = (props) => {
  let isDarkMode = props.darkModeProp;
  let toolsEnabled = props.toolsProp;

  return (
    <div
      id="storyHolderDiv"
      className={isDarkMode ? "Dark-Mode" : "Light-Mode"}
    >
      <p id={isDarkMode ? "faq-light" : "faq-dark"}>
        {" "}
        For Quick Live Stock Data, Click a Logo from the Grid below:
      </p>
      <FrontPageNewsStories darkModeProp={props.darkModeProp} />
      {toolsEnabled && <BigShort darkModeProp={isDarkMode} />}
    </div>
  );
};

export default FrontPageNews;
