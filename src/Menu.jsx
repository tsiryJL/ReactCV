import React from 'react';
import './styles/menu.css';
import {
  NavLink
} from 'react-router-dom';
import { ReactComponent as Logo } from './package/assets/icons/brands/logo.svg';

class Menu extends React.Component {
  isActive(a) {
    if (this.props.active === a) {
      return 'nav-item active';
    }
    return 'nav-item';
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-warning">
        <a className="navbar-brand" href="/">
          <Logo style={{ width: '100px', height: '50px' }} />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">&nbsp;</span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={this.isActive('home')}>
              <NavLink className="nav-link" to="/">{'Liste CV'}</NavLink>
            </li>
            <li className={this.isActive('import')}>
              <NavLink className="nav-link" to="/new/import">{'Importer mon CV'}</NavLink>
            </li>
            <li className={this.isActive('create')}>
              <NavLink className="nav-link" to="/new/create">{'Creer mon CV'}</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Menu;
