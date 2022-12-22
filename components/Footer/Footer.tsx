import React from 'react';
import Background from '../Layouts/Background';
import Container from '../Layouts/Container';

const Footer = () => {
  return (
    <Background secondaryStyles>
      <Container customStyles="py-16 flex items-center justify-center h–[400px]">
        <p>Vytvořil: Daniel Bílek</p>
      </Container>
    </Background>
  );
};

export default Footer;
