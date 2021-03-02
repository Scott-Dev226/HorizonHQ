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
      Headline: "Facebook Inc",
      Description: "",
      Description2: "FB",
      Image: FBLogo,
    },
    {
      Name: "5",
      Headline: "Tesla Inc",
      Description: "",
      Description2: "TSLA",
      Image: TeslaLogo,
    },
    {
      Name: "6",
      Headline: "Netflix Inc",
      Description: "",
      Description2: "NFLX",
      Image: NetflixLogo,
    },

    {
      Name: "7",
      Headline: "Microsoft Inc",
      Description: "",
      Description2: "MSFT",
      Image: MSFTLogo,
    },
  ];
  let isDarkMode = props.darkModeProp;

  return (
    <>
      <section id="logo-grid">
        {storyArray.map((story) => (
          <FrontPageNewsStory
            darkModeProp={props.darkModeProp}
            Headline={story.Headline}
            Image={story.Image}
            Description2={story.Description2}
          />
        ))}
      </section>
    </>
  );
};

export default FrontPageNewsStories;
