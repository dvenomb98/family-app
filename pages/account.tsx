import { NextPage } from 'next';
import React from 'react';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import Navbar from '../components/Navbar/Navbar';

const Account: NextPage = () => {
  return (
    <>
      <Navbar />
      <Background>
        <Container customStyles="min-h-screen py-16 flex flex-col gap-10 ">
          <>
            <h1 className="text-h1 font-semibold">Můj účet</h1>
          </>
        </Container>
      </Background>
    </>
  );
};

export default Account;
