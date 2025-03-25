import React, { Component } from 'react';
import { FaTrash } from "react-icons/fa";

export class Order extends Component {
  render() {
    if (!this.props.item) {
      return (
        <div className='item error'>
          <div className='line'></div>
          <div>
            <h1>Товар не найден</h1>
            <b>Нет данных</b>
          </div>
        </div>
      );
    }

    const { item, onDelete } = this.props;

    return (
      <div className='item'>
        <div className='line'></div>
        {item.img && (
          <img 
            src={`./img/${item.img}`} 
            alt={item.title || 'Изображение товара'}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <div>
          <h1>{item.title || 'Без названия'}</h1>
          <b>{item.price || 'Цена не указана'}</b>
          <FaTrash 
            className='delete_prod' 
            onClick={() => onDelete(item.id)} 
            title="Удалить товар"
          />
        </div>
      </div>
    );
  }
}

export default Order;