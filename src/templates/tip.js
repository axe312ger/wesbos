import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Img from '../components/Img';
import Layout from '../components/Layout';
import ContentNav from '../components/ContentNav';
import H from '../components/mdxComponents/Headings';
import TipMeta from '../components/TipMeta';
import { Grid } from '../components/styles/Grid';
import { TipsMetaTags } from '../components/MetaTags';

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      frontmatter {
        title
        slug
        tweetURL
        date(formatString: "MMMM DD, YYYY")
        images {
          ...ImageFields
        }
        videos
      }
      body
    }
  }
`;

export default function TipTemplate({ data: { mdx: tip }, pageContext }) {
  return (
    <>
      <div>
        <TipsMetaTags post={tip} />
        <Grid columns="auto 1fr">
          <H>Hot Tip</H>
          <TipMeta tip={tip} />
        </Grid>
        <MDXRenderer>{tip.body}</MDXRenderer>
        {tip.frontmatter.videos &&
          tip.frontmatter.videos.map(url => (
            <video key={url} src={url} autoPlay mute loop />
          ))}
        {tip.frontmatter.images &&
          tip.frontmatter.images.map(image => (
            <Img key={image.id} image={image} alt={tip.body} />
          ))}
      </div>
      <ContentNav
        pathPrefix={pageContext.pathPrefix}
        prev={pageContext.prev}
        next={pageContext.next}
      />
    </>
  );
}
