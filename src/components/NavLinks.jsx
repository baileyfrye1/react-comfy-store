import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const navLinks = [
  {
    id: 1,
    url: '/',
    text: 'Home',
  },
  {
    id: 2,
    url: 'about',
    text: 'About',
  },
  {
    id: 3,
    url: 'products',
    text: 'Products',
  },
  {
    id: 4,
    url: 'cart',
    text: 'Cart',
  },
  {
    id: 5,
    url: 'checkout',
    text: 'Checkout',
  },
  {
    id: 6,
    url: 'orders',
    text: 'Orders',
  },
];

const NavLinks = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {navLinks.map((link) => {
        const { id, url, text } = link;
        if ((url === 'checkout' || url === 'orders') && !user) return null;
        return (
          <li key={id}>
            <NavLink to={url} className='capitalize'>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
