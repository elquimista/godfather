'use strict';

import React from 'react';
import uuid from 'uuid';
import DeceasedItem from 'components/DeceasedItem';
import style from './style.scss';

export default class DeceasedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: props.people
    };
  }

  handlePersonDeletedEvent = person => {
    const { people } = this.state;
    const indexToDelete = people.findIndex(p => p.id === person.id);
    people.splice(indexToDelete, 1);
    this.setState({ people });
  }

  handlePersonRevivedEvent = person => {
    const { onPersonRevived } = this.props;
    onPersonRevived && onPersonRevived(person);
  }

  componentWillReceiveProps(nextProps) {
    const { people } = nextProps;
    if (people !== this.props.people) {
      this.setState({ people });
    }
  }

  render() {
    const { people } = this.state;

    return (
      <div>
        <div className={`${style.peopleWrapper}`}>
          {people.map(person => (
            <DeceasedItem
              key={uuid()}
              person={person}
              className="mt-2"
              onDelete={this.handlePersonDeletedEvent}
              onRevive={this.handlePersonRevivedEvent}
            />
          ))}
        </div>
      </div>
    );
  }
}
