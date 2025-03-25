import React, { Component } from 'react'
import Good from './Good'

export class Goods extends Component {
  render() {
    return (
      <main>
        {this.props.goods.map(el=>
            <Good  key={el.id}Good={el} onAdd={this.props.onAdd} />
        )}
      </main>
    )
  }
}

export default Goods