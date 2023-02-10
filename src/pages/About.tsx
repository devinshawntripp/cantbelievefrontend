import React from "react";
// import { Container } from "react-bootstrap";
import CSS from "csstype";
import myimage from "../images/product_research.png";
import Head from "next/head";

interface IAboutPageProps {}

const About: React.FC<IAboutPageProps> = (props: {}) => {
  return (
    <div className="about_container_style">
      <Head>
        <title>About Us - Why Are You Buying This</title>
        <meta
          name="description"
          content="Learn about the purpose and mission behind whyareyoubuyingthis.com, a comedy website that provides valuable product information and reviews while earning extra cash through affiliate links. Read our About Us page now."
        />
        <meta
          name="keywords"
          content="About Us, Why Are You Buying This, Comedy Website, Product Information, Product Reviews, Affiliate Links, Extra Cash"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
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
          hear from you. Thanks for visiting!
        </p>
      </section>
    </div>
  );
};

export default About;
