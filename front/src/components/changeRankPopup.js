import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class ChangeRankPopup extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedRank: '' };

    this.onChangeRadio = this.onChangeRadio.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeRadio(event) {
    this.setState({ selectedRank: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/users/${this.props.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rank: this.state.selectedRank,
      }),
    }).then(() => this.props.onSubmit());
    this.props.toggle();
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <Form onSubmit={this.onSubmit}>
          <ModalHeader toggle={this.props.toggle}>
            Choisissez un rôle
          </ModalHeader>
          <ModalBody>
            <FormGroup tag="fieldset">
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio"
                    value="administrator"
                    onChange={this.onChangeRadio}
                  />
                  {' '}
                  Administrateur
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio"
                    value="manager"
                    onChange={this.onChangeRadio}
                  />
                  {' '}
                  Gestionnaire
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio"
                    value="user"
                    onChange={this.onChangeRadio}
                  />
                  {' '}
                  Utilisateur
                </Label>
              </FormGroup>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>Valider</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default ChangeRankPopup;
