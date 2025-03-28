import { Outlet, useNavigation } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation /> {/** // we set navigation to all pages with help of wrapper */}
      <main>
        {/* // {navigation.state === 'loading' && <p>Loading...</p>}  // show loading if state is loading to get data */} 
        <Outlet /> {/*  // we set children to render here with this outlet */}
      </main>
    </>
  );
}

export default RootLayout;
