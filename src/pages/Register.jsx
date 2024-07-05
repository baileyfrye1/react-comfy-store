import { FormInput, SubmitBtn } from '../components';
import { Form, Link, redirect } from 'react-router-dom';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  console.log(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post('/auth/local/register', data);
    toast.success('Account Created Successfully');
    return redirect('/login');
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      'please double check your credentials';
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='POST'
        className='card w-96 bg-base-100 p-8 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Register</h4>
        <FormInput
          label='username'
          type='text'
          name='username'
          defaultValue='Bailey Frye'
        />
        <FormInput
          label='email'
          type='email'
          name='email'
          defaultValue='baileyafrye@comcast.net.net'
        />
        <FormInput
          label='password'
          type='password'
          name='password'
          defaultValue='secret'
        />
        <div className='mt-4'>
          <SubmitBtn text='Register' />
        </div>
        <p className='text-center'>
          Already a member?
          <Link to='/login' className='ml-2 link link-hover link-primary'>
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
