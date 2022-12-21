import { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import { UserAuth } from '../context/AuthContext';
import default_picture from '../components/Images/default_picture.png';
import FullPageLoader from '../components/Atoms/FullPageLoader';
import NewMember from '../components/User/NewMember';
import { useModalContext } from '../context/ModalContext';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

const Member: NextPage = () => {
  const { userData } = UserAuth();
  const { showNewUserModal, hideAllModals } = useModalContext();
  const [loaded, setLoaded] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => setLoaded(true), []);

  useEffect(() => {
    if (!userData.members) return;

    if (!userData.members?.length) showNewUserModal();
    else hideAllModals();
  }, [userData]);

  const chooseMember = async (id: string) => {
    try {
      localStorage.setItem('loggedMember', JSON.stringify(id));

      return true;
    } catch (e) {
      return false;
    }
  };

  return userData.members ? (
    <Background customStyles="min-h-screen">
      <Transition
        show={loaded}
        enter="transition-all duration-1000"
        enterFrom="opacity-0 translate-y-96"
        enterTo="opacity-100 translate-y-0"
      >
        <Container customStyles="py-16 flex flex-col items-center justify-center min-h-screen gap-16">
          <>
            {userData.members?.length ? (
              <>
                <h1 className="text-h1  text-center lg:text-headline">Kdo se právě přihlásil?</h1>

                <div className="flex flex-col gap-10 lg:flex-row items-center justify-center">
                  {userData.members?.map(({ name, id, img }) => (
                    <div
                      onClick={async () => {
                        const res = await chooseMember(id);
                        res && push('/dashboard');
                      }}
                      key={id}
                      className="flex flex-col items-center gap-3 group cursor-pointer"
                    >
                      <div className="overflow-hidden h-[150px] w-[150px] relative">
                        <Image
                          src={img || default_picture}
                          fill
                          sizes="max-w-60 max-h-60"
                          alt="Member profile image"
                          className="rounded-full w-full h-full object-cover transform duration-500 border-primary-blue border-2 group-hover:border-primary-gray dark:group-hover:border-primary-white"
                        />
                      </div>
                      <p className="text-h3">{name}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <NewMember unclosable />
              </>
            )}
          </>
        </Container>
      </Transition>
    </Background>
  ) : (
    <FullPageLoader />
  );
};

export default Member;
