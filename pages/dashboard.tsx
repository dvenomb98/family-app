import { NextPage } from 'next';
import React from 'react';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import Navbar from '../components/Navbar/Navbar';
import TaskList from '../components/Tasks/TaskList';

const Dashboard: NextPage = () => {
  return (
    <>
      <Navbar />
      <Background>
        <Container customStyles="min-h-screen py-16 flex flex-col  gap-10 ">
          <>
            <h1 className="text-h1 font-semibold">Aktuální úkoly</h1>

            <TaskList />
          </>
        </Container>
      </Background>
    </>
  );
};

export default Dashboard;
