import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck, FaMapMarkerAlt } from 'react-icons/fa';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const Checkout = ({ orders, step, nextStep, prevStep, onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    focus: '',
  });

  const total = orders.reduce((sum, item) => {
    return sum + parseInt(item.price.replace(' p', '').trim());
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardInputFocus = (e) => {
    setFormData(prev => ({ ...prev, focus: e.target.name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки данных
    alert('Заказ успешно оформлен!');
    onComplete();
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h2>Оформление заказа</h2>
        <p>Всего 3 шага — заполнение информации о заказе</p>
        <div className="checkout-progress">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Информация о покупателе</p>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>Банковская карта</p>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <p>Адрес доставки</p>
          </div>
        </div>
      </div>

      <div className="checkout-body">
        <form onSubmit={handleSubmit}>
          {/* Шаг 1: Информация о покупателе */}
          {step === 1 && (
            <div className="checkout-step">
              <h3>Контактная информация</h3>
              <div className="form-group">
                <label>ФИО</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="checkout-actions">
                <button type="button" onClick={nextStep} className="next-btn">
                  Далее <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Шаг 2: Банковская карта */}
          {step === 2 && (
            <div className="checkout-step">
              <h3>Оплата банковской картой</h3>
              <div className="card-preview">
                <Card
                  number={formData.cardNumber}
                  name={formData.cardName}
                  expiry={formData.cardExpiry}
                  cvc={formData.cardCvc}
                  focused={formData.focus}
                />
              </div>
              <div className="form-group">
                <label>Номер карты</label>
                <input
                  type="tel"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  onFocus={handleCardInputFocus}
                  maxLength="16"
                  required
                />
              </div>
              <div className="form-group">
                <label>Имя владельца</label>
                <input
                  type="text"
                  name="cardName"
                  placeholder="IVAN IVANOV"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  onFocus={handleCardInputFocus}
                  required
                />
              </div>
              <div className="card-details">
                <div className="form-group">
                  <label>Срок действия</label>
                  <input
                    type="tel"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    onFocus={handleCardInputFocus}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input
                    type="tel"
                    name="cardCvc"
                    placeholder="123"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    onFocus={handleCardInputFocus}
                    maxLength="3"
                    required
                  />
                </div>
              </div>
              <div className="checkout-actions">
                <button type="button" onClick={prevStep} className="prev-btn">
                  <FaArrowLeft /> Назад
                </button>
                <button type="button" onClick={nextStep} className="next-btn">
                  Далее <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Шаг 3: Адрес доставки */}
          {step === 3 && (
            <div className="checkout-step">
              <h3>Адрес доставки</h3>
              <div className="form-group">
                <label>Адрес</label>
                <div className="address-input">
                  <input
                    type="text"
                    name="address"
                    placeholder="Введите адрес или выберите на карте"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="button" className="map-btn">
                    <FaMapMarkerAlt /> Выбрать на карте
                  </button>
                </div>
              </div>
              <div className="map-container">
                {/* Здесь можно встроить карту (Google Maps или Yandex Maps) */}
                <div className="map-placeholder">
                  <p>Карта будет здесь</p>
                </div>
              </div>
              <div className="order-summary">
                <h4>Ваш заказ:</h4>
                <ul>
                  {orders.map(item => (
                    <li key={item.id}>
                      {item.title} - {item.price}
                    </li>
                  ))}
                </ul>
                <div className="total">
                  <strong>Итого: {total} р</strong>
                </div>
              </div>
              <div className="checkout-actions">
                <button type="button" onClick={prevStep} className="prev-btn">
                  <FaArrowLeft /> Назад
                </button>
                <button type="submit" className="submit-btn">
                  Подтвердить заказ <FaCheck />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Checkout;