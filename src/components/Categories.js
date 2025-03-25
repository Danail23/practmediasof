import React, { Component } from 'react';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                {
                    key: 'all',
                    name: 'Bce'
                },
                {
                    key: 'Pizza',
                    name: 'Питца'
                },
                {
                    key: 'Hotdog',
                    name: 'Хот-дог'
                },
                {
                    key: 'Burrito',
                    name: 'Буррито'
                },
                {
                    key: 'Salat',
                    name: 'Салат'
                },
            ]
        };
    }

    render() {
        return (
            <div className='categories'>
                <div className=''>
                    <a onClick={() => this.props.sortGoods('asc')}>По возрастанию цены</a>
                </div>
                <div>
                    <a onClick={() => this.props.sortGoods('desc')}>По убыванию цены</a>
                </div>
                {this.state.categories.map(el => (
                    <div key={el.key} onClick={() => this.props.chooseCategory(el.key)}>{el.name}</div>
                ))}
            </div>
        );
    }
}

export default Categories;