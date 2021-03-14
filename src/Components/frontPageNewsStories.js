import FrontPageNews from "./frontPageNews";
import FrontPageNewsStory from "./frontPageNewsStory";
import AppleLogo from "../apple-LOGO.jpg";
import GoogleLogo from "../google-LOGO.jpg";
import AmazonLogo from "../amazon-LOGO.jpg";
import FBLogo from "../facebook-LOGO.png";
import TeslaLogo from "../tesla-LOGO.jpg";
import NetflixLogo from "../netflix-LOGO.png";
import AirBNBLogo from "../airbnb-LOGO.jpg";
import MSFTLogo from "../msft-LOGO.png";
import GMELogo from "../gamestop-LOGO.jpg";
import TWTRLogo from "../twitter-LOGO.jpg";

const FrontPageNewsStories = (props) => {
  const storyArray = [
    {
      Name: "1",
      Headline: "Apple Inc",
      Description: "",
      Description2: "AAPL",
      Image: AppleLogo,
    },
    {
      Name: "2",
      Headline: "Google Inc",
      Description: "",
      Description2: "GOOG",
      Image: GoogleLogo,
    },
    {
      Name: "3",
      Headline: "Amazon Inc",
      Description: "",
      Description2: "AMZN",
      Image: AmazonLogo,
    },
    {
      Name: "4",
      Headline: "GameStop Inc",
      Description: "",
      Description2: "GME",
      Image: GMELogo,
    },

    {
      Name: "5",
      Headline: "Facebook Inc",
      Description: "",
      Description2: "FB",
      Image: FBLogo,
    },
    {
      Name: "6",
      Headline: "Tesla Inc",
      Description: "",
      Description2: "TSLA",
      Image: TeslaLogo,
    },
    {
      Name: "7",
      Headline: "Netflix Inc",
      Description: "",
      Description2: "NFLX",
      Image: NetflixLogo,
    },

    {
      Name: "8",
      Headline: "Microsoft Inc",
      Description: "",
      Description2: "MSFT",
      Image: MSFTLogo,
    },

    {
      Name: "9",
      Headline: "Twitter Inc",
      Description: "",
      Description2: "TWTR",
      Image: TWTRLogo,
    },
  ];
  let isDarkMode = props.darkModeProp;

  return (
    <>
      <section id="logo-grid">
        {storyArray.map((story) => (
          <FrontPageNewsStory
            darkModeProp={props.darkModeProp}
            Image={story.Image}
            Description2={story.Description2}
          />
        ))}
      </section>
    </>
  );
};

export default FrontPageNewsStories;
