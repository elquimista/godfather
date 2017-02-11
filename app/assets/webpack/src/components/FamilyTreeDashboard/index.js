'use strict';

import React from 'react';
import PeopleList from 'components/PeopleList';
import FamilyTree from 'components/FamilyTree';

export default class FamilyTreeDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: props.people
    };
  }

  handleProfileDroppedOnToFamilyTree = person => {
    const { people } = this.state;
    const indexToDelete = people.findIndex(p => p.id === person.id);
    people.splice(indexToDelete, 1);
    this.setState({ people });
  }

  render() {
    const { familyTree } = this.props;
    const { people } = this.state;

    return (
      <div className="row">
        <div className="col-2">
          <PeopleList people={people} />
        </div>
        <div className="col-22">
          <FamilyTree familyTree={familyTree} onProfileDropped={this.handleProfileDroppedOnToFamilyTree} />
        </div>
      </div>
    );
  }
}
