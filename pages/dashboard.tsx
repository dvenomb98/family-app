import { NextPage } from 'next';
import React from 'react';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import Navbar from '../components/Navbar/Navbar';
import Modal from '../components/Atoms/Modal';
import { useModalContext } from '../context/ModalContext';

const Dashboard: NextPage = () => {
  return (
    <>
      <Navbar />
      <Background>
        <Container customStyles="min-h-screen">
          <h1>Hello world</h1>
        </Container>
      </Background>
    </>
  );
};

export default Dashboard;
