import React, { useEffect, useState } from 'react';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import Login from '../components/User/Login';
import { Tab, Transition } from '@headlessui/react';
import Register from '../components/User/Register';
import classNames from 'classnames';
import GradientText from '../components/Atoms/GradientText';
import Loader from '../components/Atoms/Loader';
import { NextPage } from 'next';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Tabs = ['Přihlášení', 'Registrace'];

const Home: NextPage = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { user, loggedMember } = UserAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (user && loggedMember) push('/dashboard');
  }, [user]);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 500);
  }, []);

  return (
    <Background customStyles="min-h-screen">
      <>
        {!user && (
          <Transition
            show={loaded}
            enter="transition-all duration-1000"
            enterFrom="opacity-0 translate-y-96"
            enterTo="opacity-100 translate-y-0"
          >
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
          </Transition>
        )}
      </>
    </Background>
  );
};

export default Home;
