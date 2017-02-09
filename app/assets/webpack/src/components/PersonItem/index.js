'use strict';

import React from 'react';
import style from './style.scss';

export default class PersonItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, person } = this.props;
    const { imagePaths } = window._SHARED_DATA;

    return (
      <div className={`card ${style.wrapper} ${className}`}>
        <img className={`card-img-top ${style.avatar}`} src={person.photo_sm_url || imagePaths['person-default-avatar.png']} alt={person.full_name} />
        <div className="card-block p-2">
          <h4 className={`card-title text-center m-0 ${style.name}`}>{person.full_name}</h4>
        </div>
      </div>
    );
  }
}
