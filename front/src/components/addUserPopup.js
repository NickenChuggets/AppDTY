import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class AddUserPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedRank: '', selectedFName: '', selectedLName: '' };

    this.onChangeRadio = this.onChangeRadio.bind(this);
    this.onChangeFName = this.onChangeFName.bind(this);
    this.onChangeLName = this.onChangeLName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeRadio(event) {
    this.setState({ selectedRank: event.target.value });
  }

  onChangeFName(event) {
    this.setState({ selectedFName: event.target.value });
  }

  onChangeLName(event) {
    this.setState({ selectedLName: event.target.value });
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
        fName: this.state.selectedFName,
        lName: this.state.selectedLName
      }),
    }).then(() => this.props.onSubmit());
    this.setState({ selectedFName: '' });
    this.setState({ selectedLName: '' });
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
              <Label>Prénom</Label>
              <Input
                value={this.state.selectedFName}
                onChange={this.onChangeFName}
                placeholder="John"
              />
            </FormGroup>
            <FormGroup>
              <Label>Nom</Label>
              <Input
                value={this.state.selectedLName}
                onChange={this.onChangeLName}
                placeholder="Doe"
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
