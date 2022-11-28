import React from 'react';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import Login from '../components/User/Login';
import { Tab } from '@headlessui/react';
import Register from '../components/User/Register';
import classNames from 'classnames';
import GradientText from '../components/Atoms/GradientText';

const Tabs = ['Přihlášení', 'Registrace'];

export default function Home() {
  return (
    <Background>
      <Container customStyles="flex flex-col gap-5 items-center justify-center min-h-screen lg:w-2/3 py-32">
        <>
          <GradientText
            text="Make family great again."
            customStyles="text-headline lg:text-banner my-5 p-2 font-semibold text-center"
          />
          <Tab.Group>
            <Tab.List className="flex rounded-md w-full bg-secondary-white dark:bg-secondary-black p-2">
              {Tabs.map((value, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    classNames(
                      'w-full p-5 text-h4 font-semibold outline-none rounded-md',
                      selected && 'text-primary-blue outline outline-primary-blue',
                    )
                  }
                >
                  {value}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="w-full">
              <Tab.Panel>
                <Login />
              </Tab.Panel>
              <Tab.Panel>
                <Register />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </>
      </Container>
    </Background>
  );
}
