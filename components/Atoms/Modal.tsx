import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, { Fragment, useRef } from 'react';
import { useModalContext } from '../../context/ModalContext';

interface ModalProps {
  title?: string;
  description?: string;
  children: JSX.Element;
  open: boolean;
  onModalEnter?: () => void;
  cancelButton?: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  children,
  open,
  onModalEnter,
  cancelButton,
  onClose,
}) => {
  const { hideAllModals } = useModalContext();
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment} beforeEnter={onModalEnter && onModalEnter}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={onClose ? onClose : hideAllModals}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center items-end sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  'relative overflow-hidden rounded-md text-left w-full sm:max-w-lg bg-primary-white dark:bg-secondary-black p-6 flex flex-col gap-5',
                )}
              >
                {!!title && <Dialog.Title className="font-semibold text-h2">{title}</Dialog.Title>}
                {!!description && (
                  <Dialog.Description className="font-light">{description}</Dialog.Description>
                )}
                {children}
                {cancelButton && (
                  <XMarkIcon
                    className="absolute w-5 h-5 top-6 right-5 cursor-pointer"
                    onClick={hideAllModals}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
