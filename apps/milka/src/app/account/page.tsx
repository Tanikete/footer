'use client';

import { RegisterLogin } from '@milka/organism';
import regitserData from '../../../data/registerLogin.json';
import { RegistrationLoginType } from 'organism/src/lib/register-login/register-login-schema';
import { postData } from '../api/registerLogin/route';
import { useState } from 'react';

export default function Index() {
  const [emailError, setEmailError] = useState(false);
  const handleLoginForm = async (values: RegistrationLoginType) => {
    try {
      const result = await postData(values);
      console.log("result", result);
      result && result.message === "Account was not activated" && setEmailError(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative lg:h-screen md:h-[1100px] bg-[var(--milka-dark)]">
      <img
        className="w-full h-full object-cover absolute inset-0 hidden lg:block"
        src="/images/register-login/account-bg.png"
        alt="Background"
      />

      <div className="lg:flex items-center justify-center min-h-screen md:absolute inset-0">
          <RegisterLogin
            {...regitserData}
            onSubmit={handleLoginForm}
            emailError={emailError}
          />
     
      </div>
    </div>
  );
};