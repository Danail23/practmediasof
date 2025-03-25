import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Goods from "./components/Goods";
import Categories from "./components/Categories";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentGoods: [],
      currentSort: null,
      goods: [
        {
          id: 1,
          title: 'Пицца',
          img: 'pizz.jpg',
          desc: 'Вкусная пицца с сыром',
          category: 'Pizza',
          price: '968 p'
        },
        {
          id: 2,
          title: 'Хот-дог',
          img: 'hotdog.jpg',
          desc: 'Классический хот-дог',
          category: 'Hotdog',
          price: '168 p'
        },
        {
          id: 3,
          title: 'Буррито',
          img: 'burrito.jpg',
          desc: 'Острое мексиканское буррито',
          category: 'Burrito',
          price: '528 p'
        },
        {
          id: 4,
          title: 'Салат',
          img: 'salat.jpg',
          desc: 'Свежий овощной салат',
          category: 'Salat',
          price: '268 p'
        }
      ]
    };
    this.state.currentGoods = [...this.state.goods];
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.sortGoods = this.sortGoods.bind(this);
  }

  addToOrder(good) {
    if (!good || !good.id) {
      console.error("Invalid product data:", good);
      return;
    }
    
    let isInArray = false;
    this.state.orders.forEach(el => {
      if (el.id === good.id) isInArray = true;
    });
    
    if (!isInArray) {
      this.setState({ orders: [...this.state.orders, good] });
    }
  }

  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter(el => el.id !== id) });
  }

  chooseCategory(category) {
    if (category === 'all') {
      this.setState({ currentGoods: this.state.goods });
      return;
    }
    this.setState({ 
      currentGoods: this.state.goods.filter(el => el.category === category)
    });
  }

  sortGoods(direction) {
    const goodsToSort = this.state.currentGoods.length > 0
      ? [...this.state.currentGoods]
      : [...this.state.goods];

    const sortedGoods = goodsToSort.sort((a, b) => {
      const priceA = parseInt(a.price.replace(' p', '').trim());
      const priceB = parseInt(b.price.replace(' p', '').trim());
      return direction === 'asc' ? priceA - priceB : priceB - priceA;
    });

    this.setState({ 
      currentGoods: sortedGoods,
      currentSort: direction 
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Header 
          orders={this.state.orders} 
          onDelete={this.deleteOrder} 
        />
        <Categories 
          chooseCategory={this.chooseCategory} 
          sortGoods={this.sortGoods} 
        />
        <Goods 
          goods={this.state.currentGoods} 
          onAdd={this.addToOrder} 
        />
        <Footer />
      </div>
    );
  }
}

export default App;