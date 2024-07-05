import { Form, redirect } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import { customFetch, formatPrice } from '../utils';
import { clearCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().user.user;
    const { cartItems, orderTotal, numItemsInCart } = store.getState().cart;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      const res = await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      queryClient.removeQueries(['orders']);
      store.dispatch(clearCart());
      toast.success('Order Placed Successfully');
      return redirect('/orders');
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'There was an error placing your order. Please try again later';
      toast.error(errorMessage);
      if (err?.response?.status === 401 || 403) return redirect('/login');
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method='POST' className='flex flex-col gap-y-4'>
      <h4 className='font-medium text-xl'>Shipping Information</h4>
      <FormInput label='first name' name='name' />
      <FormInput label='address' name='address' type='text' />
      <div className='mt-4'>
        <SubmitBtn text='Place Your Order' />
      </div>
    </Form>
  );
};
export default CheckoutForm;
