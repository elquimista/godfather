'use strict';

import React from 'react';
import PeopleList from 'components/PeopleList';
import FamilyTree from 'components/FamilyTree';

export default class FamilyTreeDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { people } = this.props;

    return (
      <div className="row">
        <div className="col-2">
          <PeopleList people={people} />
        </div>
        <div className="col-22">
          <FamilyTree />
        </div>
      </div>
    );
  }
}
