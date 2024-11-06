'use client';
import styles from './page.module.scss';
import registerClubdata from '../../../data/registrationClub.json';
import registerFormdata from '../../../data/registrationForm.json';
import { RegistrationType } from 'organism/src/lib/registration-form/registration-form-schema';
import { RegistrationClub } from '@milka/organism';
import { RegistrationForm } from '@milka/organism';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
  interface RegisterType extends RegistrationType {
    newsletter: number;
    team1: string;
  }

  const [formValues, setFormValues] = useState<RegisterType | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter();

  const handleRegisterForm = (values: RegisterType) => {
    setFormValues(values);
  };

  const handleFormSubmit = async (registerData: RegisterType) => {
    const formData = new FormData();

    try {
      const combinedData = { ...formValues, ...registerData };
      Object.keys(combinedData).forEach((key) => {
        formData.append(
          key,
          combinedData[key as keyof RegisterType]?.toString() || ''
        );
      });

      const registerApiResponse = await axios.post(
        '/api/registerClub',
        formData
      );

      if (registerApiResponse?.data?.message === 'Email is already in use') {
        setModalMessage('Email is already in use');
        setIsModalOpen(true);
      } else if (registerApiResponse.status === 200) {
        router.push('/confirmation-account');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        console.log('Unexpected error:', error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  return (
    <div className={styles['container']}>
      {formValues ? (
        <RegistrationClub {...registerClubdata} formSubmit={handleFormSubmit} />
      ) : (
        <RegistrationForm onSubmit={handleRegisterForm} {...registerFormdata} />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="relative bg-white rounded-lg w-full max-w-md text-center"
            style={{ padding: '30px 20px', color: '#3b2774', fontSize: '20px' }}
          >
            {/* Close (cross) icon positioned above the white background */}
            <button
              onClick={closeModal}
              className="absolute top-0 right-2 text-gray-400 hover:text-gray-600 text-5xl"
              aria-label="Close modal"
            >
              &times;
            </button>
            <p
              dangerouslySetInnerHTML={{
                __html: registerClubdata.emailInUseTxt,
              }}
            ></p>
            {/* <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
