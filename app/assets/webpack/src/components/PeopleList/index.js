'use strict';

import React from 'react';
import uuid from 'uuid';
import PersonItem from 'components/PersonItem';

export default class PeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: props.people
    };
  }

  componentDidMount() {
    const $form = $(this.newProfileForm);
    const $modal = $('#add_profile_modal');

    $form.ajaxForm({ success: this.handleNewPersonAddedEvent });
    $modal.on('hidden.bs.modal', e => {
      $form[0].reset();
      $form.find('[type="submit"]').prop('disabled', false).text('Add');
    });
  }

  handleNewPersonAddedEvent = res => {
    const $modal = $('#add_profile_modal');

    if (res.success) {
      if ($modal.data('bs.modal')._isShown) {
        $modal.modal('hide');
      }
      this.setState(ps => ({ people: ps.people.concat(res.person) }));
    }
  }

  handlePersonDeletedEvent = person => {
    const { people } = this.state;
    const indexToDelete = people.findIndex(p => p.id === person.id);
    people.splice(indexToDelete, 1);
    this.setState({ people });
  }

  handlePersonDeadEvent = person => {
    const { onPersonDead } = this.props;
    onPersonDead && onPersonDead(person);
  }

  componentWillReceiveProps(nextProps) {
    const { people } = nextProps;
    if (people !== this.props.people) {
      this.setState({ people });
    }
  }

  render() {
    const { people } = this.state;
    const { routes } = window._SHARED_DATA;

    return (
      <div>
        <div>
          {people.map(person => (
            <PersonItem
              key={uuid()}
              person={person}
              className="mt-2"
              onDelete={this.handlePersonDeletedEvent}
              onDead={this.handlePersonDeadEvent}
            />
          ))}
        </div>
        <button type="button" className="btn btn-sm btn-primary w-100 mt-3" role="button" data-toggle="modal" data-target="#add_profile_modal">Add Profile</button>

        <div className="modal fade" id="add_profile_modal" tabIndex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form action={routes.peoplePath({ format: 'json' })} encType="multipart/form-data" method="post" ref={e => this.newProfileForm = e}>
                <div className="modal-header">
                  <h5 className="modal-title">Add New Profile</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="person_full_name">Full Name</label>
                    <input type="text" className="form-control" name="person[full_name]" id="person_full_name" required={true} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="person_photo_url">Profile Photo</label>
                    <input type="file" className="form-control-file" name="person[photo_url]" id="person_photo_url" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" role="button">Close</button>
                  <button type="submit" className="btn btn-primary" role="button" data-disable-with="Adding...">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
