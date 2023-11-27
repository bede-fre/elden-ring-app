import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Ashes from './app/views/Ashes';
import Incantations from './app/views/Incantations';
import Sorceries from './app/views/Sorceries';
import styled from 'styled-components';
import './index.scss';
import './App.scss';
import { colorsVar } from './app/services/styles/variables';
import { spaces } from './app/services/styles/spaces';

export default function EldenRingApp() {
  const NavBar = styled.nav`
    display: flex;
    position: fixed;
    width: 100%;
    background-color: ${colorsVar.backgroundColor};
  `;

  const NavBarLink = styled.div`
    font-weight: bolder;
    color: ${colorsVar.color};
    font-size: ${spaces.l};
    padding: ${spaces.s} ${spaces.m};
    letter-spacing: 2px;
    text-align: center;
    transition: all 0.6s;
    height: 60px;
    display: flex;
    align-items: center;

    &:hover {
      color: ${colorsVar.colorHover};
      background-color: ${colorsVar.backgroundColorHover};
    }
  `;

  return(
    <Router>
      <div>
        <NavBar>
          <Link style={{textDecoration: 'none'}} to='/'><NavBarLink>Home</NavBarLink></Link>
          <Link style={{textDecoration: 'none'}} to='/ashes'><NavBarLink>Ashes</NavBarLink></Link>
          <Link style={{textDecoration: 'none'}} to='/incantations'><NavBarLink>Incantations</NavBarLink></Link>
          <Link style={{textDecoration: 'none'}} to='/sorceries'><NavBarLink>Sorceries</NavBarLink></Link>
        </NavBar>

        <Routes>
          <Route path='/ashes' element={<Ashes />} />
          <Route path='/incantations' element={<Incantations />} />
          <Route path='/sorceries' element={<Sorceries />} />
        </Routes>
      </div>
    </Router>
  )
}
