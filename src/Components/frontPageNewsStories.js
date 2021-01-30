import FrontPageNews from "./frontPageNews";
import FrontPageNewsStory from "./frontPageNewsStory";
import BidenImage from "../biden-cash.jpg";
import ElonImage from "../elon-tesla.jpg";
import TechImage from "../js-code.jpeg";

const FrontPageNewsStories = (props) => {
  const storyArray = [
    {
      Name: "2",
      Headline: "Biden-Harris Administration Promises $1400 Stimulus Extension",
      Description:
        "Biden's massive plan includes several immediate relief items that are popular with a wide swath of Americans, including sending another $1,400 in direct stimulus payments.",
      Description2:
        "The earliest the money could start flowing? Maybe mid- to late February, said Kevin Kosar, resident scholar at the right-leaning American Enterprise Institute and co-editor of the book 'Congress Overwhelmed.'",
      Image: BidenImage,

      HeadlineTech: "Tiny quantum computer solves real optimization problem",
      DescriptionTech:
        "Quantum computers have already managed to surpass ordinary computers in solving certain tasks - unfortunately, totally useless ones. The next milestone is to get them to do useful things. Researchers have now shown that they can solve a small part of a real logistics problem with their small, but well-functioning quantum computer. ",
      DescriptionTech2:
        "Interest in building quantum computers has gained considerable momentum in recent years, and feverish work is underway in many parts of the world.",
      ImageTech: TechImage,
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
          Headline={isDarkMode ? story.HeadlineTech : story.Headline}
          Description={isDarkMode ? story.DescriptionTech : story.Description}
          Description2={
            isDarkMode ? story.DescriptionTech2 : story.Description2
          }
          Image={isDarkMode ? story.ImageTech : story.Image}
          Description={isDarkMode ? story.DescriptionTech : story.Description}
          Description2={
            isDarkMode ? story.DescriptionTech2 : story.Description2
          }
        />
      ))}
    </section>
  );
};

export default FrontPageNewsStories;
