import { PlusIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useModalContext } from '../../context/ModalContext';
import Button from '../Atoms/Button';
import Background from '../Layouts/Background';
import Container from '../Layouts/Container';
import useMobileWidth from '../Layouts/Mobile';
import CreateTask from '../Tasks/CreateTask';
import NewMember from '../User/NewMember';
import AccountPopper from './AccountPopper';

const Navbar = () => {
  const { isMobile } = useMobileWidth();
  const { showCreateTaskModal } = useModalContext();

  return (
    <>
      <Background secondaryStyles>
        <Container customStyles="py-3 flex justify-between items-center">
          <>
            <h1>LOGO</h1>

            <div className="flex items-center gap-5">
              <Button
                onClick={showCreateTaskModal}
                customStyles="w-auto rounded-full lg:rounded-md"
              >
                <>
                  <PlusIcon className="w-6 h-6" />
                  {!isMobile && <p>Přidat úkol</p>}
                </>
              </Button>

              <AccountPopper />
            </div>
          </>
        </Container>
      </Background>
      <NewMember />
      <CreateTask />
    </>
  );
};

export default Navbar;
