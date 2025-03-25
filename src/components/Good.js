import React, { Component } from 'react'

export class Good extends Component {
  render() {
    return (
      <div className='good'>
        <img src={'./img/'+ this.props.Good.img} />
        <h1>{this.props.Good.title}</h1>
        <p>{this.props.Good.desc}</p>
        <b>{this.props.Good.price}</b>
        <div className='addcorz' onClick={() => this.props.onAdd(this.props.Good)}>+</div>
       </div>
    )
  }
}

export default Good