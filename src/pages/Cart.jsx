import { useSelector } from 'react-redux';
import { CartItemsList, SectionTitle, CartTotals } from '../components';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { numItemsInCart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  if (numItemsInCart === 0) {
    return <SectionTitle text='Your cart is empty' />;
  }

  return (
    <>
      <SectionTitle text='Shopping Cart' />
      <div className='mt-8 grid gap-8 lg:grid-cols-12'>
        <section className='lg:col-span-8'>
          <CartItemsList />
        </section>
        <aside className='lg:col-span-4 lg:pl-4'>
          <CartTotals />
          {user ? (
            <Link to='/checkout' className='mt-8 btn btn-primary btn-block '>
              Proceed To Checkout
            </Link>
          ) : (
            <Link to='/login' className='mt-8 btn btn-primary btn-block'>
              PLEASE LOGIN
            </Link>
          )}
        </aside>
      </div>
    </>
  );
};
export default Cart;
