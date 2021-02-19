import FrontPageNewsStories from "./frontPageNewsStories";
import isNewsVisible from "./Home";

const FrontPageNews = (props) => {
  let isDarkMode = props.darkModeProp;

  return (
    <div
      id="storyHolderDiv"
      className={isDarkMode ? "Dark-Mode" : "Light-Mode"}
    >
      <FrontPageNewsStories darkModeProp={props.darkModeProp} />
    </div>
  );
};

export default FrontPageNews;
