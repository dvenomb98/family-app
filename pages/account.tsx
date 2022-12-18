import classNames from 'classnames';
import { NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import Navbar from '../components/Navbar/Navbar';
import { UserAuth } from '../context/AuthContext';
import default_image from '../components/Images/default_image.webp';
import useMobileWidth from '../components/Layouts/Mobile';
import GradientText from '../components/Atoms/GradientText';
import AccountBox from '../components/Account/AccountBox';
import { Members } from '../components/Types/types';
import { Status } from '../components/Types/enums';
import CompletedTasksModal from '../components/Account/CompletedTasksModal';
import { useTheme } from 'next-themes';
import Toggler from '../components/Atoms/Toggler';
import UploadFile from '../components/Atoms/UploadFile';
import { useModalContext } from '../context/ModalContext';
import Button from '../components/Atoms/Button';

const boxStyles = 'p-10 bg-secondary-white dark:bg-secondary-black rounded-md flex flex-col gap-5';

const Account: NextPage = () => {
  const { userData } = UserAuth();
  const { theme, setTheme } = useTheme();
  const { isMobile } = useMobileWidth();
  const [openUserModal, setUserModal] = useState(false);
  const [modalData, setModalData] = useState<any>({ tasks: [], memberName: '' });
  const { showUploadModal } = useModalContext();

  const imageBox = isMobile ? 'h-32 w-32 ' : 'h-64 w-64';

  return (
    <>
      <Navbar />
      <Background>
        <Container customStyles="min-h-screen py-16">
          <div className="xl:w-2/3  flex flex-col gap-10 ">
            <h1 className="text-h1 font-semibold">Můj účet</h1>

            <div className="flex gap-5 items-center">
              <div className={classNames(imageBox, 'overflow-hidden relative')}>
                <Image
                  src={userData?.img || default_image}
                  fill
                  priority
                  sizes="max-w-64 max-h-64"
                  alt="User account image"
                  className="rounded-full object-cover h-full w-full border-primary-blue border-2"
                />
              </div>

              <GradientText
                text={userData?.name}
                customStyles={'text-h1 lg:text-banner font-semibold flex-shrink'}
              />
            </div>

            <div className={boxStyles}>
              <AccountBox label={'Jméno účtu'} value={userData?.name} />
              <AccountBox label={'Emailová adresa'} value={userData?.email} />
              <AccountBox
                label={'Počet splněných úkolů'}
                value={userData?.tasks?.filter((task) => task.status === Status.Completed)?.length}
              />
            </div>

            <h1 className="text-h2 font-semibold">Uživatelé</h1>
            <div className={classNames(boxStyles, 'gap-8')}>
              {userData?.members?.length ? (
                userData.members
                  .sort((a, b) => b.points - a.points)
                  .map((member: Members, index: number) => {
                    const finishedTasks = userData.tasks?.filter(
                      (task) => task.status === Status.Completed && task.assigned_to === member.id,
                    );
                    const finishedTasksLength = finishedTasks.length || 0;

                    return (
                      <div
                        key={member.id}
                        className="flex flex-row justify-between items-end border-b pb-2 border-primary-gray"
                      >
                        <AccountBox
                          label="Uživatel"
                          value={member.name}
                          color={index === 0 ? 'text-yellow-500 dark:text-yellow-400' : ''}
                        />
                        <div className="flex flex-col items-end text-sm lg:text-base">
                          <p className="font-semibold ">{member.points} bodů</p>
                          <p
                            onClick={() => {
                              setModalData({ tasks: finishedTasks, memberName: member.name });
                              setUserModal(true);
                            }}
                            className="text-primary-blue hover:underline underline-offset-4 cursor-pointer"
                          >
                            {finishedTasksLength} splněných úkolů
                          </p>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p className="text-primary-gray">Nenalezen žádný uživatel.</p>
              )}
            </div>

            <h1 className="text-h2 font-semibold">Nastavení účtu</h1>

            <div className={boxStyles}>
              <div className="flex items-center justify-between w-full">
                <p>Temný režim</p>
                <Toggler
                  srOnly="switch theme"
                  checked={theme === 'dark'}
                  setFunc={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                />
              </div>
            </div>
            <Button onClick={showUploadModal} customStyles="w-56">
              <>Změnit profilový obrázek</>
            </Button>
          </div>
        </Container>
      </Background>
      <CompletedTasksModal
        open={openUserModal}
        setOpen={setUserModal}
        tasks={modalData.tasks}
        memberName={modalData.memberName}
      />
      <UploadFile />
    </>
  );
};

export default Account;
