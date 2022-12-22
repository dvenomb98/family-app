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
import { Members } from '../components/Types/types';

const Member: NextPage = () => {
  const { userData } = UserAuth();
  const { showNewUserModal, hideAllModals } = useModalContext();
  const [loaded, setLoaded] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => setLoaded(true), []);

  useEffect(() => {
    if (!userData.members) return;
    else if (!userData.members?.length) showNewUserModal();
    else setTimeout(() => hideAllModals(), 500);
  }, [userData]);

  const chooseMember = async (member: Members) => {
    try {
      localStorage.setItem('loggedMember', JSON.stringify(member));
      return true;
    } catch (e) {
      return false;
    }
  };

  return userData.members ? (
    <Background customStyles="min-h-screen">
      <>
        <Transition
          show={loaded}
          enter="transition-all duration-1000"
          enterFrom="opacity-0 translate-y-96"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all duration-500"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-[2]"
        >
          <Container customStyles="py-16 flex flex-col items-center justify-center min-h-screen gap-16">
            <>
              {userData.members?.length ? (
                <>
                  <h1 className="text-h1  text-center lg:text-headline">Kdo se právě přihlásil?</h1>

                  <div className="grid grid-cols-2 grid-rows-auto gap-10 lg:flex lg:flex-row items-center justify-center">
                    {userData.members?.map((member) => (
                      <div
                        onClick={async () => {
                          const res = await chooseMember(member);
                          if (res) {
                            setLoaded(false);
                            setTimeout(() => {
                              push('/dashboard');
                            }, 500);
                          }
                        }}
                        key={member.id}
                        className="flex flex-col items-center gap-3 group cursor-pointer"
                      >
                        <div className="overflow-hidden h-[150px] w-[150px] relative">
                          <Image
                            src={member.img || default_picture}
                            fill
                            sizes="max-w-60 max-h-60"
                            alt="Member profile image"
                            className="rounded-full w-full h-full object-cover  border-primary-blue border-2 group-hover:border-primary-gray dark:group-hover:border-primary-white"
                          />
                        </div>
                        <p className="text-h3">{member.name}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </>
          </Container>
        </Transition>
        <NewMember unclosable />
      </>
    </Background>
  ) : (
    <FullPageLoader />
  );
};

export default Member;
