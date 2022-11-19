import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div style={{ display: 'flex', padding: '0.5' }}>
        <Link to="/" style={{ textDecoration: 'none' }}><h1 style={{ marginTop: '1rem', marginLeft: '1rem' }}>Movie App</h1></Link>
        <Link to="/favourite" style={{ textDecoration: 'none' }}><h3 style={{ marginLeft: '2rem', marginTop: '1rem' }}>Favourites</h3></Link>
      </div>
    )
  }
}

export default Navbar;
