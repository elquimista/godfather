'use strict';

import React from 'react';
import PeopleList from 'components/PeopleList';
import DeadsList from 'components/DeadsList';
import FamilyTree from 'components/FamilyTree';
import style from './style.scss';

export default class FamilyTreeDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: props.people,
      deads: props.deads
    };
  }

  handleProfileDroppedOnToFamilyTree = person => {
    const { people } = this.state;
    const indexToDelete = people.findIndex(p => p.id === person.id);
    people.splice(indexToDelete, 1);
    this.setState({ people });
  }

  handleProfileDismissed = async personId => {
    const res = await $.ajax({
      url: window._SHARED_DATA.routes.personPath(personId, { format: 'json' }),
      method: 'get'
    });
    if (res.success) {
      this.setState(ps => ({ people: ps.people.concat(res.person) }));
    }
  }

  handlePersonDead = person => {
    const { people, deads } = this.state;
    const indexToDelete = people.findIndex(p => p.id === person.id);
    people.splice(indexToDelete, 1);
    deads.push(person);
    this.setState({ people, deads });
  }

  handlePersonRevived = person => {
    const { people, deads } = this.state;
    const indexToDelete = deads.findIndex(p => p.id === person.id);
    deads.splice(indexToDelete, 1);
    people.push(person);
    this.setState({ people, deads });
  }

  handleKiaInDuty = async personId => {
    const res = await $.ajax({
      url: window._SHARED_DATA.routes.personPath(personId, { format: 'json' }),
      method: 'get'
    });
    if (res.success) {
      this.setState(ps => ({ deads: ps.deads.concat(res.person) }));
    }
  }

  render() {
    const { familyTree } = this.props;
    const { people, deads } = this.state;

    return (
      <div className="row justify-content-between">
        <div className={`px--15 ${style.peopleListWrapper}`}>
          <PeopleList people={people} onPersonDead={this.handlePersonDead} />
        </div>
        <div>
          <FamilyTree
            familyTree={familyTree}
            onProfileDropped={this.handleProfileDroppedOnToFamilyTree}
            onProfileDismissed={this.handleProfileDismissed}
            onKIA={this.handleKiaInDuty}
          />
        </div>
        <div className={`px--15 ${style.peopleListWrapper}`}>
          <DeadsList people={deads} onPersonRevived={this.handlePersonRevived} />
        </div>
      </div>
    );
  }
}
