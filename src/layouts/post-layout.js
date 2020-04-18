import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import * as ThemeUIComponents from "@theme-ui/components";

import { Heading } from "@theme-ui/components";

const IMAGE_KEY = "image";

const components = {
  ...ThemeUIComponents,
  Img,
};

const PostLayout = ({
  data: {
    mdx: {
      body,
      frontmatter: { title, embeddedImages },
    },
  },
}) => {
  const embeddedImagesByKey =
    embeddedImages &&
    embeddedImages.reduce((images, image, index) => {
      images[`${IMAGE_KEY}${index + 1}`] = images[
        `${IMAGE_KEY}${index + 1}`
      ] || {
        ...image.childImageSharp,
      };
      return images;
    }, {});

  return (
    <MDXProvider components={components}>
      <Heading as="h1" variant="styles.h1">
        {title}
      </Heading>
      <MDXRenderer embeddedImages={embeddedImagesByKey}>{body}</MDXRenderer>
    </MDXProvider>
  );
};

export const post = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        embeddedImages {
          childImageSharp {
            original {
              width
              height
              src
            }
            fluid(quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default PostLayout;
