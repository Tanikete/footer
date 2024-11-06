import { Button, Input } from '@milka/shared-ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@milka/shared-ui';
import { useForm } from 'react-hook-form';
import {
  registerLoginSchema,
  RegistrationLoginType,
} from './register-login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordField from '../password-field/password-field';
import { useRouter } from 'next/navigation';
import { postData } from '../../../../apps/milka/src/app/api/registerLogin/route'; 
import Cookies from 'js-cookie';

interface Card {
  title: string;
  subtitle: string;
}

interface Cards {
  registerCard: Card[];
  loginCard: Card[];
}

interface AllCards {
  Cards: Cards;
  emailExistsTxt: string;
  emailError: boolean;
  registerTxt: string;
  loginTxt: string;
  forgotPasswordTxt: string;
}

export function RegisterLogin({
  Cards,
  emailExistsTxt,
  emailError,
  registerTxt,
  loginTxt,
  forgotPasswordTxt,
}: AllCards) {
  const form = useForm<RegistrationLoginType>({
    mode: 'onBlur',
    resolver: zodResolver(registerLoginSchema),
    defaultValues: {
      UserName: '',
      Password: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const router = useRouter();

  const routeToRegister = () => {
    router.push('/register');
  };

  const onSubmit = async (data: RegistrationLoginType) => {
    try {
      const response = await postData(data); 
      if (response && response.token) {
        Cookies.set('token', response.token, { expires: 7 });
        router.push('/my-account'); 
      } else {
        alert('Login failed, please check your credentials.'); 
      }
    } catch (error) {
      alert(error.message || 'An error occurred while logging in.'); 
    }
  };

  return (
    <section className="flex items-center justify-center">
      <div className="w-[900px] py-5 gap-6 flex flex-col items-center lg:flex-row">
        <div className="w-[335px] rounded-lg md:w-[438px] shadow-2xl px-6 py-8 lg:pt-8 lg:px-10 lg:pb-10 bg-[var(--milka-light)]">
          {Cards.registerCard.map((card) => (
            <div key={card.title}>
              <div className="flex items-center justify-center">
                <img className="w-[160px]" src={card.title} alt="titleimg1" />
              </div>
              <div className="pt-4">
                <p className="text-[var(--milka-white)] text-lg text-center not-italic leading-normal">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center mt-6 lg:mt-36">
            <Button
              variant="default"
              className="uppercase"
              onClick={routeToRegister}
            >
              {registerTxt}
            </Button>
          </div>
        </div>
        <div className="w-[335px] md:w-[438px] rounded-lg shadow-2xl px-6 py-8 lg:pt-8 lg:px-10 lg:pb-10 bg-[var(--milka-light)]">
          {Cards.loginCard.map((card) => (
            <div key={card.title}>
              <div className="flex items-center justify-center">
                <img className="w-[206px]" src={card.title} alt="titleimg2" />
              </div>
              <div className="pt-4">
                <p className="text-[var(--milka-white)] text-lg text-center not-italic leading-normal">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
          <section className="mt-8">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                <FormField
                  control={control}
                  name="UserName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="E-mail"
                          {...field}
                          className={`${
                            errors.UserName
                              ? 'border-[#d93333] text-[#d93333]'
                              : ''
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <PasswordField
                  control={control}
                  name="Password"
                  errors={errors}
                />
                <div className="flex items-center justify-center ">
                  <span className="text-[var(--milka-white)] text-sm">
                    {forgotPasswordTxt}
                  </span>
                </div>
                {emailError && (
                  <div className="flex justify-center mt-0">
                    <span className="text-[#d93333] text-sm">
                      {emailExistsTxt}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-center pt-2 ">
                  <Button type="submit" variant="default" className="uppercase">
                    {loginTxt}
                  </Button>
                </div>
              </form>
            </Form>
          </section>
        </div>
      </div>
    </section>
  );
}

export default RegisterLogin;