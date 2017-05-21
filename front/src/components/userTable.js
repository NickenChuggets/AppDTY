import React from 'react';
import { Table, Button } from 'reactstrap';

import UserTableItem from './userTableItem';

export default props => {
  const userTableItems = props.userList.map(user => (
    <UserTableItem
      key={user.id}
      openRankPopup={props.openRankPopup}
      openDeletePopup={props.openDeletePopup}
      user={user}
    />
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Rôle</th>
          <th>
            <Button color="success" onClick={props.openAddPopup}>
              Ajouter
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {userTableItems}
      </tbody>
    </Table>
  );
};
