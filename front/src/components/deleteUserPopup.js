import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

class ModalExample extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/users/${this.props.userId}`, {
      method: 'DELETE',
    }).then(() => this.props.onSubmit());
    this.props.toggle();
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          Voulez-vous supprimer l'utilisateur?
        </ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={this.onSubmit}>Confirmer</Button>
          {' '}
          <Button color="secondary" onClick={this.props.toggle}>Annuler</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalExample;
