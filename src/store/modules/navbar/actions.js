export function setActiveNavBar(navBar) {
  return {
    type: '@navbar/SET_ACTIVE_NAVBAR',
    payload: { navBar },
  };
}

export function unSetActiveNavBar() {
  return {
    type: '@navbar/UNSET_ACTIVE_NAVBAR',
  };
}
