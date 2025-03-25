import React, { useState } from 'react';
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaArrowRight, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';

const CheckoutModal = ({ onClose, orders }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      ...formData,
      items: orders,
      total: orders.reduce((sum, item) => sum + parseInt(item.price.replace(' p', '')), 0),
      date: new Date().toISOString()
    };
    console.log('Order submitted:', order);
    alert(`Заказ оформлен! Сумма: ${order.total}Р`);
    onClose();
  };

  return (
    <div className="checkout-modal-overlay">
      <div className="checkout-modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="checkout-progress">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-title">Данные</div>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-title">Оплата</div>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-title">Доставка</div>
          </div>
        </div>

        {step === 1 && (
          <form className="checkout-form" onSubmit={nextStep}>
            <h3>Контактная информация</h3>
            
            <div className="form-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <FaPhone className="input-icon" />
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email (необязательно)"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <button type="submit" className="next-btn">
              Далее <FaArrowRight />
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="payment-form" onSubmit={nextStep}>
            <h3>Данные карты</h3>
            
            <div className="card-preview">
              <div className="card-number">
                {formData.cardNumber.replace(/\d(?=\d{4})/g, "•") || '•••• •••• •••• ••••'}
              </div>
              <div className="card-details">
                <div className="card-name">
                  {formData.name || 'ИМЯ НА КАРТЕ'}
                </div>
                <div className="card-expiry">
                  {formData.expiry || '••/••'}
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <FaCreditCard className="input-icon" />
              <input
                type="text"
                name="cardNumber"
                placeholder="Номер карты"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength="16"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="expiry"
                  placeholder="ММ/ГГ"
                  value={formData.expiry}
                  onChange={handleChange}
                  maxLength="5"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength="3"
                  required
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="back-btn" onClick={prevStep}>
                Назад
              </button>
              <button type="submit" className="next-btn">
                Далее <FaArrowRight />
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="delivery-form" onSubmit={handleSubmit}>
            <h3>Адрес доставки</h3>
            
            <div className="form-group">
              <FaMapMarkerAlt className="input-icon" />
              <input
                type="text"
                name="address"
                placeholder="Адрес доставки"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="comment"
                placeholder="Комментарий к заказу"
                value={formData.comment}
                onChange={handleChange}
                rows="3"
              />
            </div>
            
            <div className="order-summary">
              <h4>Ваш заказ:</h4>
              {orders.map(item => (
                <div key={item.id} className="order-item">
                  <span>{item.title}</span>
                  <span>{item.price}</span>
                </div>
              ))}
              <div className="order-total">
                <span>Итого:</span>
                <span>{orders.reduce((sum, item) => sum + parseInt(item.price.replace(' p', '')), 0)}Р</span>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="back-btn" onClick={prevStep}>
                Назад
              </button>
              <button type="submit" className="submit-btn">
                Подтвердить заказ
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;