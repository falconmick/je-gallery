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
    const post = data.mdx
    const {code: {body}, frontmatter: {title, date}, excerpt} = post;
    const siteTitle = get(data, 'site.siteMetadata.title');
    const { pageContext: {nextPage, previousPage} } = this.props;
    // const { previous, next } = this.props.pageContext

    return (
      <MDXProvider
        components={{}}>
        <Layout location={this.props.location}>
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            meta={[{ name: 'description', content: excerpt }]}
            title={`${title} | ${siteTitle}`}
          />
          <h1>{title}</h1>
          <p
          >
            {date}
          </p>
          <div>{children}</div>
          <MDXRenderer
            {...props}
          >{body}</MDXRenderer>
          <hr
          />
          <Bio />

          <ul
          >
            <li>
              {
                previousPage &&
                <Link to={previousPage.fields.slug} rel="prev">
                  ← {previousPage.frontmatter.title}
                </Link>
              }
            </li>
            <li>
              {
                nextPage &&
                <Link to={nextPage.fields.slug} rel="next">
                  {nextPage.frontmatter.title} →
                </Link>
              }
            </li>
          </ul>
        </Layout>
      </MDXProvider>
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
    mdx(id: { eq: $id }) {
        id
        excerpt
        code {
            body
        }
        
        frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
        }
        
    }
  }
`
