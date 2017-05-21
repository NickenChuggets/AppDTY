import React from 'react';
import { Button } from 'reactstrap';

export default props => (
  <tr>
    <th scope="row">{props.user.id}</th>
    <td>{props.user.fName}</td>
    <td>{props.user.lName}</td>
    <td>
      {props.user.rank}
      {' '}
      <Button
        color="warning"
        onClick={() => props.openRankPopup(props.user.id)}
        className="float-right"
      >
        Modifier
      </Button>
    </td>
    <td>
      <Button
        color="danger"
        onClick={() => props.openDeletePopup(props.user.id)}
      >
        Supprimer
      </Button>
    </td>
  </tr>
);
