import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class AddUserPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedRank: '', selectedName: '' };

    this.onChangeRadio = this.onChangeRadio.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeRadio(event) {
    this.setState({ selectedRank: event.target.value });
  }

  onChangeName(event) {
    this.setState({ selectedName: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rank: this.state.selectedRank,
        name: this.state.selectedName,
      }),
    }).then(() => this.props.onSubmit());
    this.setState({ selectedName: '' });
    this.props.toggle();
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <Form onSubmit={this.onSubmit}>
          <ModalHeader toggle={this.props.toggle}>
            Ajoutez un utilisateur
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Name</Label>
              <Input
                value={this.state.selectedName}
                onChange={this.onChangeName}
                placeholder="John Doe"
              />
            </FormGroup>
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
            <Button color="primary" onClick={this.onSubmit}>Confirmer</Button>
            {' '}
            <Button color="secondary" onClick={this.props.toggle}>
              Annuler
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default AddUserPopup;
