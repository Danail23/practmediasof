import React, { useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import Order from './Order';
import CheckoutModal from './CheckoutModal';

const showOrders = (props) => {
  let summa = 0;
  props.orders.forEach(el => summa += parseInt(el.price.replace(' p', '')));
  
  return (
    <div>
      {props.orders.map(el => (
        <Order 
          key={el.id} 
          item={el} 
          onDelete={props.onDelete} 
        />
      ))}
      <p className='summa'>Сумма: {new Intl.NumberFormat('ru-RU').format(summa)}Р</p>
      <button 
        className='order-button' 
        onClick={props.openCheckout}
        disabled={props.orders.length === 0}
      >
        Оформить заказ
      </button>
    </div>
  );
};

const showNothing = () => {
  return (
    <div className='empty'>
      <h2>Товаров нет</h2>
    </div>
  );
};

export default function Header(props) {
  const [basketOpen, setBasketOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const openCheckout = () => {
    setBasketOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <header>
      <div className='head_1'>
        <span className='logo_text'>House</span>
        <ul className='nav'>
          <FaShoppingBasket 
            onClick={() => setBasketOpen(!basketOpen)} 
            className={`basket ${basketOpen && 'active'}`}
          />
          {basketOpen && (
            <div className='bask_card'>
              {props.orders.length > 0 ? 
                showOrders({...props, openCheckout}) : 
                showNothing()}
            </div>
          )}
          <li>Про нас</li>
          <li>Контакты</li>
          <li>Кабинет</li>
        </ul>
      </div>
      <div className='logo_photo'></div>
      
      {checkoutOpen && (
        <CheckoutModal 
          orders={props.orders}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </header>
  );
}