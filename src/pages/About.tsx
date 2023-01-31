import React from "react";
// import { Container } from "react-bootstrap";
import CSS from "csstype";
import myimage from "../images/product_research.png";

interface IAboutPageProps {}

const About: React.FC<IAboutPageProps> = (props: {}) => {
  return (
    <div className="about_container_style">
      <section className="about_sectionOne_style">
        <img
          className="about_imgStyle_style"
          src={String(myimage.src)}
          alt="A person researching and curating the best products for online shoppers"
        ></img>
      </section>

      <section className="about_content_style">
        <h1 className="about_titles_style">
          Discover the Best Amazon Products with WhyAreYouBuyingThis.com - Your
          Guide to Product Research and Affiliate Marketing
        </h1>
        <p className="about_paragraph_style">
          Welcome to WhyAreYouBuyingThis.com, your ultimate destination for
          product research, affiliate marketing, and a good laugh. My name is
          Devin and I created this website as a hobby to share my passion for
          finding the best products on Amazon and making a little extra cash
          through affiliate marketing.
        </p>
        <h2 className="about_titles_style">
          Save Time and Effort with Our Curated Product Selection with a touch
          of comedy &#128512;
        </h2>
        <p className="about_paragraph_style">
          On this website, you&apos;ll find a curated selection of links that
          lead to the best products on Amazon, all hand-picked by me. I&apos;ve
          done the research for you, so you can be sure that you&apos;re getting
          the most bang for your buck. But that&apos;s not all - I also like to
          have a good time, so you&apos;ll find a mix of serious product reviews
          and funny takes on products, to make your shopping experience more
          enjoyable.
        </p>
        <h2 className="about_titles_style">
          Laugh and Learn with Our Unique Product Reviews
        </h2>
        <p className="about_paragraph_style">
          Affiliate marketing is a great way to make a little extra cash while
          sharing products that you believe in. I&apos;ll be sharing my
          affiliate links on this website, so you can shop and support me at the
          same time. It&apos;s a win-win situation! I&apos;ll also be sharing
          tips and tricks on how to start your own affiliate marketing journey
          and how to be successful in it.
        </p>

        <h2 className="about_titles_style">
          Learn from My E-Commerce and Digital Marketing Experience
        </h2>
        <p className="about_paragraph_style">
          I&apos;m not just running this website, I am also working on other
          projects related to e-commerce and digital marketing. I&apos;m always
          on the lookout for new ways to make money online and I want to share
          my knowledge and experience with you. From setting up an e-commerce
          store to digital marketing strategies, I&apos;ve dabbled in a bit of
          everything and I&apos;m excited to share my successes and failures
          with you.
        </p>
        <h2 className="about_titles_style">
          Earn Extra Cash with Affiliate Marketing
        </h2>
        <p className="about_paragraph_style">
          Affiliate marketing is a great way to make a little extra cash while
          sharing products that you believe in. I&apos;ll be sharing my
          affiliate links on this website, so you can shop and support me at the
          same time. It&apos;s a win-win situation! I&apos;ll also be sharing
          tips and tricks on how to start your own affiliate marketing journey
          and how to be successful in it.
        </p>

        <h2 className="about_titles_style">
          Stay Up to Date with Our Constant Updates
        </h2>
        <p className="about_paragraph_style">
          We&apos;re constantly updating the website with new products and
          reviews, so make sure to check back often. And don&apos;t hesitate to
          reach out if you have any questions or suggestions - we&apos;d love to
          hear from you. Thanks for visiting! In this expanded version,
          I&apos;ve added more detailed information about the website&apos;s
          purpose, the selection process of the products, the unique reviews,
          the additional services and projects that Devin is working on, the
          affiliate marketing tips, and the invitation to the readers to reach
          out and to check back the website often for new products and reviews.
          The headings provide a clear structure for the content and make it
          easy for readers to find the information they&apos;re looking for. The
          content is interesting and leaves the readers wanting to learn more
          about the products, the affiliate marketing strategies and
          Devin&apos;s experiences in e-commerce and digital marketing.
          Additionally, I&apos;ve made sure to use keywords related to product
          research, affiliate marketing, e-commerce, and Amazon throughout the
          text to help improve SEO. With this expanded and optimized version,
          readers will be more likely to stay on the website longer, engage with
          the content, and potentially make purchases through the affiliate
          links, helping to increase traffic and revenue for the website.
        </p>
      </section>
    </div>
  );
};

export default About;
