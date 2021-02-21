import FrontPageNews from "./frontPageNews";
import FrontPageNewsStory from "./frontPageNewsStory";
import BidenImage from "../biden-cash.jpg";
import ElonImage from "../elon-tesla.jpg";
import TechImage from "../js-code.jpeg";

const FrontPageNewsStories = (props) => {
  const storyArray = [
    {
      Name: "2",
      Headline:
        "Spencer Rascoff: Investors should expect a ‘structural reset’ in tech sector",
      Description:
        "Biden's massive plan includes several immediate relief items that are popular with a wide swath of Americans, including sending another $1,400 in direct stimulus payments.",
      Description2:
        "The earliest the money could start flowing? Maybe mid- to late February, said Kevin Kosar, resident scholar at the right-leaning American Enterprise Institute and co-editor of the book 'Congress Overwhelmed.'",
      Image: BidenImage,
    },
    {
      Name: "1",
      Headline:
        "Elon Musk briefly surpasses Jeff Bezos as the world's wealthiest person",
      Description:
        "The first two weeks of Jan 2021 have been very eventful for Elon Musk  - capping off a year of incredible stock growth for Tesla and ultimately adding an additional 165.5 billion dollars to his personal fortune",
      Description2:
        "However, shares for Tesla fell approximately 8% on 1/11/2021, consequently dropping the newly annointed Musk down to 2nd place",
      Image: ElonImage,
      Link:
        "https://www.forbes.com/sites/sergeiklebnikov/2021/01/11/elon-musk-falls-to-second-richest-person-in-the-world-after-his-fortune-drops-nearly-14-billion-in-one-day/",
    },
  ];
  let isDarkMode = props.darkModeProp;

  return (
    <section>
      {storyArray.map((story) => (
        <FrontPageNewsStory
          darkModeProp={props.darkModeProp}
          Headline={story.Headline}
          Description={story.Description}
          Description2={story.Description2}
          Image={story.Image}
          Description={story.Description}
          Description2={story.Description2}
        />
      ))}
    </section>
  );
};

export default FrontPageNewsStories;
