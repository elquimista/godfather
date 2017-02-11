'use strict';

import React from 'react';
import uuid from 'uuid';
import HaloMenu from './_HaloMenu';
import style from './style.scss';

export default class DeadPersonItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: props.person,
      showHaloMenu: false,
      personFullName: props.person.full_name
    };
  }

  componentDidMount() {
    const $form = $(this.editProfileForm);

    $(this.container)
      .on('mouseover', e => {
        this.setState({ showHaloMenu: true });
      })
      .on('mouseout', e => {
        this.setState({ showHaloMenu: false });
      });

    $(this.editModal).on('hidden.bs.modal', e => {
      this.setState({ personFullName: this.state.person.full_name });
      $form.find('[type="submit"]').prop('disabled', false).text('Update');
    });
    $form.ajaxForm({ success: this.handlePersonUpdatedEvent });
  }

  handleFullNameChange = e => this.setState({ personFullName: e.target.value });

  handleEditClick = e => {
    e.preventDefault();
    $(this.editModal).modal('show');
  }

  handleDeleteClick = async e => {
    e.preventDefault();

    const { person } = this.state;
    const { onDelete } = this.props;

    if (confirm('Are you sure to remove this profile?')) {
      const res = await $.ajax({
        url: window._SHARED_DATA.routes.personPath(person.id, { format: 'json' }),
        method: 'delete',
        dataType: 'json'
      });
      if (res.success) {
        onDelete && onDelete(person);
      }
    }
  }

  handleReviveClick = e => {
    e.preventDefault();

    const { person } = this.state;
    const { onRevive } = this.props;

    $.ajax({
      url: window._SHARED_DATA.routes.personPath(person.id, { format: 'json' }),
      method: 'patch',
      data: { person: { status: 'free' } }
    });
    onRevive && onRevive(person);
  }

  handlePersonUpdatedEvent = res => {
    const $modal = $(this.editModal);

    if (res.success) {
      this.setState({ person: res.person });
      if ($modal.data('bs.modal')._isShown) {
        $modal.modal('hide');
      }
    }
  }

  render() {
    const { className } = this.props;
    const { person, showHaloMenu, personFullName } = this.state;
    const { imagePaths, routes } = window._SHARED_DATA;
    const haloMenuHandlers = [this.handleReviveClick, this.handleDeleteClick, this.handleEditClick];
    const fullNameId = `person_full_name_${uuid()}`;
    const photoUrlId = `person_photo_url_${uuid()}`;

    return (
      <div className={`card pos-relative ${style.wrapper} ${className}`} ref={e => this.container = e}>
        <img className={`card-img-top ${style.avatar}`} src={person.photo_sm_url || imagePaths['person-default-avatar.png']} alt={person.full_name} ref={e => this.imgAvatar = e} />
        <div className="card-block p-2">
          <h4 className={`card-title text-center m-0 ${style.name}`}>{person.full_name}</h4>
        </div>
        <HaloMenu className={`${showHaloMenu ? '' : 'd-none'} pos-absolute ${style.haloMenu}`} menuHandlers={haloMenuHandlers} />

        <div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="" aria-hidden="true" ref={e => this.editModal = e}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form action={routes.personPath(person.id, { format: 'json' })} encType="multipart/form-data" method="post" ref={e => this.editProfileForm = e}>
                <input type="hidden" name="_method" value="patch" />
                <div className="modal-header">
                  <h5 className="modal-title">Edit Profile</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor={fullNameId}>Full Name</label>
                    <input type="text" className="form-control" name="person[full_name]" id={fullNameId} required={true} value={personFullName} onChange={this.handleFullNameChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor={photoUrlId}>Profile Photo</label>
                    <input type="file" className="form-control-file" name="person[photo_url]" id={photoUrlId} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" role="button">Close</button>
                  <button type="submit" className="btn btn-primary" role="button" data-disable-with="Updating...">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
