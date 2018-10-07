import React from 'react'
import { Link } from 'gatsby'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const isRoot = location.pathname === rootPath;
    const Header = isRoot ? 'h1' : 'h3';

    return (
      <div
      >
        <Header >
          <Link
            to={'/'}
          >
            Gatsby Starter Blog
          </Link>
        </Header>
        {children}
      </div>
    )
  }
}

export default Template
