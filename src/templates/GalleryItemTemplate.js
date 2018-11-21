import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from "@mdx-js/tag";

import Bio from '../components/Bio'
import Layout from '../components/layout'

class BlogPostTemplate extends React.Component {
  render() {
    const { children, data, ...props } = this.props;
    const galleryItem = data.prismicGalleryItem
    const siteTitle = get(data, 'site.siteMetadata.title');
    const { pageContext: {nextPage, previousPage} } = this.props;
    // const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: 'todo' }]}
          title={`${siteTitle}`}
        />
        <div>{children}</div>
        <div>{JSON.stringify(galleryItem)}</div>

        <ul
        >
          <li>
            {
              previousPage &&
              <Link to={previousPage.uid} rel="prev">
                ← {previousPage.uid}
              </Link>
            }
          </li>
          <li>
            {
              nextPage &&
              <Link to={nextPage.uid} rel="next">
                {nextPage.uid} →
              </Link>
            }
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    prismicGalleryItem(id: { eq: $id }) {
        id
        data {
            title {
                html
                text
            }
            sub_title {
                html
                text
            }
            image {
                alt
                copyright
                dimensions {
                    height
                    width
                }
                localFile {
                    publicURL
                }
                url
            }
            description {
                html
                text
            }
            created_on
        }
    }
  }
`
