import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';
import {
  setActiveNavBar,
  unSetActiveNavBar,
} from '~/store/modules/navbar/actions';

import logo from '~/assets/logo-horizontal.svg';

import { items } from './menu';

import { Container, Logo, Bar, NavBar, Content, Profile } from './styles';

function Header() {
  const dispatch = useDispatch();
  const activeNavBar = useSelector(state => state.navbar.navBar);
  const { profile } = useSelector(state => state.user);

  function handleSignOut() {
    dispatch(signOut());
    dispatch(unSetActiveNavBar());
  }

  function handleMenu(item) {
    dispatch(setActiveNavBar(item));
  }

  return (
    <Container>
      <Content>
        <Logo>
          <img src={logo} alt="AgroMalula" />
        </Logo>

        <Bar>
          {Object.keys(items).map(key => {
            const item = items[key];

            return (
              <NavBar
                key={item.name}
                active={activeNavBar === item.name ? 'true' : 'false'}
                to={item.route}
                onClick={() => handleMenu(item.name)}
              >
                {item.name}
              </NavBar>
            );
          })}
        </Bar>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default connect()(Header);
