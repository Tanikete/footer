import styles from './registration-form.module.scss';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format, isAfter, isBefore, subYears } from 'date-fns';

import { registrationSchema, RegistrationType } from './registration-form-schema';
import { PasswordField } from '@milka/organism';

import { Button } from '@milka/shared-ui';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from '@milka/shared-ui';
import { Input } from '@milka/shared-ui';
import { Popover, PopoverContent, PopoverTrigger } from '@milka/shared-ui';
import { Calendar } from '@milka/shared-ui';

import { cn } from '@milka/shared-ui';

interface ImageProps{
  url: string,
  alt: string
}

interface RegisterType extends RegistrationType {
  newsletter: number;
  team1: string;
}

interface RegistrationFormProps {
  onSubmit: (values: RegisterType) => void,
  titleImg: ImageProps;
  titleImgMobile: ImageProps;
  subtitle?: string;
}

export function RegistrationForm({ onSubmit, titleImgMobile, titleImg, subtitle }: RegistrationFormProps) {

  const form = useForm<RegisterType>({
    mode: 'onBlur',
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      dob: undefined,
      street_name: '',
      house_number: '',
      address: '',
      zip_code: '',
      city: '',
      country: 'Deutschland',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <div className="bg-[var(--milka-light)] py-10 px-5 lg:px-60 xl:px-96">
      <div className="flex justify-center mb-6">
        <picture>
          <source media="(min-width: 992px)" srcSet={titleImg?.url} />
          <img src={titleImgMobile?.url} alt={titleImg?.alt || titleImgMobile?.alt} />
        </picture>
      </div>
      <div className="flex mb-12 md:justify-center lg:mb-16">
        <p className="text-[var(--milka-white)] text-lg min-w-[335px] lg:w-[605px]">{subtitle}</p>
      </div>
      <section>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
            {/* First name field */}
            <FormField
              control={control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Vorname" {...field} className={`${errors.firstname ? 'border-[#d93333] text-[#d93333]' : ""}`} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Lastname field */}
            <FormField
              control={control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nachname" {...field} className={`${errors.lastname ? 'border-[#d93333] text-[#d93333]' : ""}`} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Birth date field */}
            <FormField
              control={control}
              name="dob"
              render={({ field }) => {
                const today = new Date();
                const latest18Date = subYears(today, 18); // Calculate the latest date a user can be 18
                const defaultMonth = new Date(latest18Date); // Set the month to the month of the latest 18-year-old date

                return (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Input
                            placeholder='Geburtsdatum'
                            {...field}
                            value={field.value ? format(field.value, 'PPP') : ""}
                            className={`text-start ${errors.dob ? 'border-[#d93333] text-[#d93333]' : ""}`}
                            readOnly
                          />
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          defaultMonth={defaultMonth}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            return date > latest18Date;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                );
              }}
            />

            <div className="flex">
              {/* Street name field */}
              <FormField
                control={control}
                name="street_name"
                render={({ field }) => (
                  <FormItem className="w-2/3 mr-4">
                    <FormControl>
                      <Input type="text" placeholder="Straße" {...field} className={`${errors.street_name ? 'border-[#d93333] text-[#d93333]' : ""}`} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Street number field */}
              <FormField
                control={control}
                name="house_number"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormControl>
                      <Input placeholder="Hausnummer" {...field} className={`${errors.house_number ? 'border-[#d93333] text-[#d93333]' : ""}`} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Address field */}
            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Adresszusatz (optional)" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />


            <div className="flex">
              {/* City field */}
              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-2/3 mr-4">
                    <FormControl>
                      <Input placeholder="Stadt" {...field} className={`${errors.city ? 'border-[#d93333] text-[#d93333]' : ""}`} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Zip code field */}
              <FormField
                control={control}
                name="zip_code"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormControl>
                      <Input placeholder="PLZ" {...field} className={`${errors.zip_code ? 'border-[#d93333] text-[#d93333]' : ""}`} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>


            {/* Country field */}
            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Land" {...field} value="Deutschland" disabled />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Email field */}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="E-mail" {...field} className={`${errors.email ? 'border-[#d93333] text-[#d93333]' : ""}`} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* confirmEmail field */}
            <FormField
              control={control}
              name="confirmEmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="E-Mail wiederholen" {...field} className={`${errors.confirmEmail ? 'border-[#d93333] text-[#d93333]' : ""}`} />
                  </FormControl>
                </FormItem>
              )}
            />

            <PasswordField control={control} name="password" errors={errors} />

            <PasswordField control={control} name="confirmPassword" errors={errors} />

            <div className="flex justify-center">
              <Button type="submit">WÄHLE DEINEN KLUB</Button>
            </div>

          </form>
        </Form>
      </section>
    </div>
  );
}

export default RegistrationForm;