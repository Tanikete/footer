import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import {
  ChangePasswordSchema,
  ChangePasswordType,
} from './change-password-schema'; 
import { Button, ButtonProps } from '@milka/shared-ui'; 
import { PasswordField } from '@milka/organism'; 
import { changePassword } from '../../../../apps/milka/src/app/api/account'; 
import { useState } from 'react';
import Cookies from 'js-cookie';

interface ChangePasswordProps {
  onSubmit?: (values: ChangePasswordType) => void;
}

export interface accountProps {
  password_title?: string;
  password_subtitle?: string;
  passwordcta: ButtonProps;
}

export function ChangePasswordForm({
  onSubmit,
  password_subtitle,
  password_title,
  passwordcta,
}: accountProps & ChangePasswordProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const form = useForm<ChangePasswordType>({
    mode: 'onBlur',
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      OldPassword: '', 
      Password: '',
      ConfirmPassword: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;



const handleFormSubmit = async (data: ChangePasswordType) => {
  setIsLoading(true);
  setError(null);
  try {
    const token = Cookies.get('token'); 
    if (token) {
      const response = await changePassword(data, token); 
      console.log('Password changed successfully:', response);
      
      
      reset();

     
      if (onSubmit) {
        onSubmit(data);
      }
    } else {
      throw new Error('Token is not available');
    }
  } catch (error) {
    console.error('Error changing password:', error);
    setError(error instanceof Error ? error.message : 'An error occurred'); 
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="-mt-8 max-w-[437px] md:px-5">
      <section>
        <div className="flex justify-left md:mb-6">
          <h1 className="hidden md:block slanted text-[40px]">
            {password_title}
          </h1>
        </div>
        <div className="flex justify-center md:mb-6">
          <h2 className="text-[18px]">{password_subtitle}</h2>
        </div>
        {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Current Password Field */}
            <h1 className="py-5">Aktuelles Passwort</h1>
            <PasswordField
              control={control}
              name="OldPassword"
              errors={errors}
              label=''
            />

            {/* New Password Field */}
            <h1 className="py-5">Neues Passwort</h1>
            <PasswordField
              control={control}
              name="Password"
              errors={errors}
              label='Neues Passwort'
            />

            {/* Add space between the two PasswordField components */}
            <div className="my-4"></div>

            <PasswordField
              control={control}
              name="ConfirmPassword"
              errors={errors}
              label="Passwort wiederholen"
            />

            <div className="flex justify-center py-20">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'AKTUALISIEREN...' : passwordcta?.children}
              </Button>
            </div>
          </form>
        </FormProvider>
      </section>
    </div>
  );
}

export default ChangePasswordForm;