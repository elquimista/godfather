'use strict';

import React from 'react';
import style from './style.scss';

export default class PersonItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleDragStart = e => {
    e.dataTransfer.setData('person', JSON.stringify(this.props.person));
  }

  render() {
    const { className, person } = this.props;
    const { imagePaths } = window._SHARED_DATA;

    return (
      <div className={`card ${style.wrapper} ${className}`} draggable={true} onDragStart={this.handleDragStart}>
        <img className={`card-img-top ${style.avatar}`} src={person.photo_sm_url || imagePaths['person-default-avatar.png']} alt={person.full_name} ref={e => this.imgAvatar = e} />
        <div className="card-block p-2">
          <h4 className={`card-title text-center m-0 ${style.name}`}>{person.full_name}</h4>
        </div>
      </div>
    );
  }
}
