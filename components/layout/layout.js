import { Fragment } from 'react';

import MainNavigation from './main-navigation';

function Layout(props) {

    const { userData } = props

  return (
    <Fragment>
      <MainNavigation  userData = { userData } />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
