const _ = require('lodash')
const Promise = require('bluebird')
const path = require("path");
const { createFilePath } = require('gatsby-source-filesystem')
const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  tableOfContents
                  parent {
                    ... on File {
                      absolutePath
                      name
                      sourceInstanceName
                    }
                  }
                  code {
                    scope
                  }
                  fields{
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors); // eslint-disable-line no-console
          reject(result.errors);
        }

        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          const pagePath = '/post' + node.fields.slug;
          const component = componentWithMDXScope(
            path.resolve("./src/templates/BlogPostTemplate.js"),
            node.code.scope,
            __dirname
          );
          const context = {
            absPath: node.parent.absolutePath,
            tableOfContents: node.tableOfContents,
            id: node.id
          };

          createPage({
            path: pagePath,
            component,
            context,
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
