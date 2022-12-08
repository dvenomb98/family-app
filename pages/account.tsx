import classNames from 'classnames';
import { NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import FullPageLoader from '../components/Atoms/FullPageLoader';
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

const boxStyles = 'p-10 bg-secondary-white dark:bg-secondary-black rounded-md flex flex-col gap-5';

const Account: NextPage = () => {
  const { userData } = UserAuth();
  const { isMobile } = useMobileWidth();
  const [openUserModal, setUserModal] = useState(false);
  const [modalData, setModalData] = useState<any>({ tasks: [], memberName: '' });

  const imageSize = isMobile ? 90 : 180;

  return (
    <>
      <Navbar />
      <Background>
        <Container customStyles="min-h-screen py-16">
          <div className="xl:w-2/3  flex flex-col gap-10 ">
            <h1 className="text-h1 font-semibold">Můj účet</h1>

            <div className="flex gap-5 items-center">
              {userData?.img ? (
                <Image
                  src={userData?.img}
                  width={imageSize}
                  height={imageSize}
                  alt="User account image"
                  className="rounded-full transform duration-500 border-primary-blue border-2"
                />
              ) : (
                <Image
                  src={default_image}
                  width={imageSize}
                  height={imageSize}
                  alt="User account image"
                  className="rounded-full transform duration-500 border-primary-blue border-2"
                />
              )}

              <GradientText
                text={userData?.name}
                customStyles={'text-h1 lg:text-banner font-semibold'}
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

            <h1 className="text-h1 font-semibold">Uživatelé</h1>
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
          </div>
        </Container>
      </Background>
      <CompletedTasksModal
        open={openUserModal}
        setOpen={setUserModal}
        tasks={modalData.tasks}
        memberName={modalData.memberName}
      />
    </>
  );
};

export default Account;
