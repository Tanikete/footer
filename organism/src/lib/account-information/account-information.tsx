import Cookies from 'js-cookie'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  updateProfileSchema,
  UpdateProfileType,
} from './account-information-schema'; 
import { Button, ButtonProps, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@milka/shared-ui'; 
import { useState, useEffect } from 'react'; 
import { updateProfileInfo, GetProfileInfoPromo } from '../../../../apps/milka/src/app/api/account'; 

interface KontoInformationenProps {
  onSubmit?: (values: UpdateProfileType) => void; 
  subtitle?: string;
}

export interface accountProps {
  infomation?: string;
  kontoinformation? : ButtonProps;
}

export function KontoInformationen({
  kontoinformation,
  onSubmit,
  infomation
}: accountProps & KontoInformationenProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UpdateProfileType>({
    mode: 'onBlur',
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      title: 'Herr',
      firstname: '',
      lastname: '',
      street1: '',
      streetnumber: '',
      street2: '',
      zipcode: '',
      city: '',
      country: 'Deutschland',
      email: '',
    },
  });

  const {
    control,
    handleSubmit,
    reset, 
    formState: { errors },
  } = form;

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('token'); 
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      
      const profileData = await GetProfileInfoPromo(token);
      
      reset({
        title: profileData.title || 'Herr',
        firstname: profileData.firstname || '',
        lastname: profileData.lastname || '',
        street1: profileData.street1 || '',
        streetnumber: profileData.streetnumber || '',
        street2: profileData.street2 || '', // Ensure the street2 field is correct
        zipcode: profileData.zipcode || '',
        city: profileData.city || '',
        country: 'Deutschland', 
        email: profileData.email || '',
      });
    } catch (error: any) {
      setError(error.message || 'Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData(); // Fetch profile data on component mount
  }, [reset]); 

  const onFormSubmit = async (data: UpdateProfileType) => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('Authentication token is missing. Please log in again.');
      }
  
      // Call your API function with token included in formData
      const result = await updateProfileInfo(data, token);
      console.log('Profile update successful:', result);
  
      // Reset the form with updated data from the server
      reset({
        title: result.title || 'Herr',
        firstname: result.firstname || '',
        lastname: result.lastname || '',
        street1: result.street1 || '',
        streetnumber: result.streetnumber || '',
        street2: result.street2 || '',
        zipcode: result.zipcode || '',
        city: result.city || '',
        country: 'Deutschland',
        email: result.email || '',
      });
  
      // Fetch the updated profile data
      await fetchProfileData(); // Call the function to fetch updated data
  
      if (onSubmit) {
        onSubmit(result); // Pass updated result if needed
      }
  
    } catch (error: any) {
      console.error('Submission error:', error);
      setError(error.message || 'Failed to submit data');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="-mt-8 max-w-[437px] md:px-5">
      <div className="flex justify-center md:mb-6">
        <h1 className="hidden md:block slanted text-[40px]">
          {infomation}
        </h1>
      </div>
      <section>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="space-y-10 md:space-y-4"
          >
            {/* Title dropdown */}
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      {...field}
                      className={`${
                        errors.title ? 'border-[#d93333] text-[#d93333]' : ''
                      } w-2/4 py-2 px-3 border-b rounded focus:outline-none bg-transparent text-white placeholder-white border-white`}
                    >
                      <option value="Herr">Herr</option>
                      <option value="Frau">Frau</option>
                      <option value="Fräulein">Fräulein</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* First name field */}
            <FormField
              control={control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Vorname"
                      {...field}
                      className={`${
                        errors.firstname
                          ? 'border-[#d93333] text-[#d93333]'
                          : ''
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last name field */}
            <FormField
              control={control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Nachname"
                      {...field}
                      className={`${
                        errors.lastname ? 'border-[#d93333] text-[#d93333]' : ''
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Input
                      type="email"
                      placeholder="E-mail"
                      {...field}
                      className={`${
                        errors.email ? 'border-[#d93333] text-[#d93333]' : ''
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Street and house number fields */}
            <div className="flex">
              <FormField
                control={control}
                name="street1"
                render={({ field }) => (
                  <FormItem className="w-2/3 mr-4">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Straße"
                        {...field}
                        className={`${
                          errors.street1
                            ? 'border-[#d93333] text-[#d93333]'
                            : ''
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="streetnumber"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormControl>
                      <Input
                        placeholder="nummer"
                        {...field}
                        className={`${
                          errors.streetnumber
                            ? 'border-[#d93333] text-[#d93333]'
                            : ''
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* street2 field */}
            <FormField
              control={control}
              name="street2" // Corrected the name here
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text" // Corrected to 'text'
                      placeholder="Adresszusatz"
                      {...field}
                      className={`${
                        errors.street2 ? 'border-[#d93333] text-[#d93333]' : ''
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Zip code and city fields */}
            <div className="flex">
              <FormField
                control={control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem className="w-1/3 mr-4">
                    <FormControl>
                      <Input
                        placeholder="PLZ"
                        {...field}
                        className={`${
                          errors.zipcode
                            ? 'border-[#d93333] text-[#d93333]'
                            : ''
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-2/3 mr-4">
                    <FormControl>
                      <Input
                        placeholder="Stadt"
                        {...field}
                        className={`${
                          errors.city ? 'border-[#d93333] text-[#d93333]' : ''
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
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
                    <Input
                      placeholder="Land"
                      {...field}
                      value="Deutschland"
                      disabled
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit button */}
            <div className="flex justify-center">
              <Button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : kontoinformation?.children}
              </Button>
            </div>

            {/* Error message */}
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </Form>
      </section>
    </div>
  );
}

export default KontoInformationen;