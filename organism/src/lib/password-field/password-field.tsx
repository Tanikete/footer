"use client";

import styles from './password-field.module.scss';
import React, { useState } from 'react';
import { FormControl, FormItem, FormMessage } from '@milka/shared-ui';
import { Input } from '@milka/shared-ui';
import { Controller, Control, FieldErrors } from 'react-hook-form';

interface PasswordInputProps {
  control: Control<any>;
  name: string;
  label: string;
  errors: FieldErrors<any>;
}

const eyeOpen = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <g id="Property 1=eye-open">
      <g id="Icon">
        <path fillRule="evenodd" clipRule="evenodd" d="M22 12.0002C20.2531 15.5764 15.8775 19 11.9998 19C8.12201 19 3.74646 15.5764 2 11.9998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path fillRule="evenodd" clipRule="evenodd" d="M22 12.0002C20.2531 8.42398 15.8782 5 12.0005 5C8.1227 5 3.74646 8.42314 2 11.9998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  </svg>
);

const eyeClose = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <g id="Property 1=eye-closed">
      <path id="Icon" d="M21.0006 12.0004C19.2536 15.5764 15.8779 17.9997 12 17.9997M12 17.9997C8.12204 17.9997 4.7463 15.5764 2.99977 12M12 17.9997L12 20.9997M19.4218 14.4216L21.4999 16.4997M16.2304 16.9685L17.5 19.4997M4.57812 14.4216L2.5 16.4997M7.76953 16.9685L6.5 19.4997" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
)

export function PasswordField({
  control,
  name,
  label,
  errors
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <FormItem>
      <FormControl>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <div className="relative">
              <Input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder={label}
                id={name}
                {...field}
                className={`${errors[name] ? 'border-[#d93333] text-[#d93333]' : ''}`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {isPasswordVisible ? eyeClose : eyeOpen}
              </button>
            </div>
          )}
        />
      </FormControl>
      <FormMessage>{errors[name]?.message ? errors[name]?.message.toString() : null}</FormMessage>
    </FormItem>
  );
}

export default PasswordField;
