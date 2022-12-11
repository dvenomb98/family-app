import classNames from 'classnames';
import { doc, runTransaction } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useModalContext } from '../../context/ModalContext';
import { db, storage } from '../../firebase';
import Button from './Button';
import { inputClass } from './Input';
import LoadBar from './LoadBar';
import Message from './Message';
import Modal from './Modal';

const UploadFile = () => {
  const { openUploadModal } = useModalContext();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const { user } = UserAuth();

  const initialValues = {
    file: [],
  };

  const uploadFile = async (values: any) => {
    try {
      const { file } = values;
      const userRef = ref(storage, `${user.uid}`);
      const uploadTask = uploadBytesResumable(userRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },

        () => {
          setError(true);
          setMessage('Nastala chyba. Zkuste to prosím později.');
          setUploadProgress(0);
          return false;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              runTransaction(db, async (transaction) => {
                const ref = doc(db, 'users', user.uid);
                const sfDoc = await transaction.get(ref);
                transaction.update(ref, { ...sfDoc.data(), img: downloadURL });
              });
            })
            .then(() => {
              setUploadProgress(0);
              setMessage('Úspěšně změněno!');
            });
        },
      );
    } catch (e) {
      setError(true);
      setMessage('Nastala chyba. Zkuste to prosím později.');
      setUploadProgress(0);
      return false;
    }
  };

  return (
    <Modal
      open={openUploadModal}
      title="Změna profilové fotky"
      onModalEnter={() => {
        setMessage('');
        setError(false);
      }}
    >
      <Formik initialValues={initialValues} onSubmit={async (values) => await uploadFile(values)}>
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col gap-6">
            <input
              onChange={(event) => {
                setFieldValue('file', event.currentTarget.files?.[0]);
              }}
              id="file"
              type="file"
              name="file"
              className={classNames(
                inputClass,
                'dark:file:bg-secondary-black file:bg-secondary-white file:border-none file:p-3 text file:rounded-md ',
              )}
            />
            {!!uploadProgress && (
              <div className="">
                <LoadBar progress={uploadProgress} />
              </div>
            )}
            {!!message && <Message text={message} isError={error} />}

            <Button disabled={isSubmitting} isSubmit>
              <>Odeslat</>
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UploadFile;
