import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import {
  OrderList,
  ComplexPaginationContainer,
  SectionTitle,
} from '../components';

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      'orders',
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().user.user;

    if (!user) {
      toast.warn('You must be logged in to view orders');
      redirect('/login');
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const res = await queryClient.ensureQueryData(ordersQuery(params, user));

      console.log(res);

      return { orders: res.data.data, meta: res.data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'There was an error accessing your orders';

      toast.error(errorMessage);

      if (error?.response?.status === 401 || 403) return redirect('/login');

      return null;
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text='Please make an order' />;
  }

  return (
    <>
      <SectionTitle text='Your Orders' />
      <OrderList />
      <ComplexPaginationContainer />
    </>
  );
};
export default Orders;
