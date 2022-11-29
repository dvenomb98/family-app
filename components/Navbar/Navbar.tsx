import React from 'react';
import Background from '../Layouts/Background';
import Container from '../Layouts/Container';
import NewMember from '../User.tsx/NewMember';
import AccountPopper from './AccountPopper';

const Navbar = () => {
  return (
    <>
      <Background secondaryStyles>
        <Container customStyles="py-3 flex justify-between items-center">
          <>
            <h1>LOGO</h1>
            <AccountPopper />
          </>
        </Container>
      </Background>
      <NewMember />
    </>
  );
};

export default Navbar;
