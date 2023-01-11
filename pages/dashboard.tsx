import { NextPage } from 'next';
import React from 'react';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import Navbar from '../components/Navbar/Navbar';
import TaskList from '../components/Tasks/TaskList';
import { UserAuth } from '../context/AuthContext';

const spanClass = 'text-primary-black dark:text-primary-white ml-0.5';

const Dashboard: NextPage = () => {
  const { loggedMember } = UserAuth();

  return (
    <>
      <Navbar />
      <Background>
        <Container customStyles="min-h-screen py-16 flex flex-col  gap-10 ">
          <>
            <h1 className="text-h1 font-semibold">Aktuální úkoly</h1>
            {loggedMember && (
              <div className="text-primary-gray  lg:flex lg:flex-row lg:justify-between">
                <p>
                  Přihlášený jako: <span className={spanClass}> {loggedMember?.name}</span>{' '}
                </p>
                <p>
                  Počet splněných úkolů:{' '}
                  <span className={spanClass}> {loggedMember?.completed_tasks}</span>
                </p>
              </div>
            )}

            <TaskList />
          </>
        </Container>
      </Background>
    </>
  );
};

export default Dashboard;
