import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Button, Table } from 'semantic-ui-react';

import { loadUsersAction } from 'features/user/actions/users';
import TableHeaders from 'features/user/components/Form/definitions/TableHeaders';

const mapDispatchToProps = {
  loadUsers: loadUsersAction,
};

const mapStateToProps = state => ({
  users: state.user.list,
  fetched: state.user.fetched,
});

const extractValue = value => {
  let valueIsBool = (typeof value === typeof true);
  switch (true) {
    case (valueIsBool && value):
      return "Approved";
    case (valueIsBool && !value):
    case (!valueIsBool && value === undefined):
      return "Denied";
    default:
      return value;
  }
};

const GenerateRows = props => {
  const { data, history } = props;
  return (
    data.map(user => (
      <Table.Row key={`row_${user.name}`}>
        {
          TableHeaders.map(column => {
            if (user.hasOwnProperty(column.name)) {
              return <Table.Cell key={`data_${user._id}_${column.name}`}>{extractValue(user[column.name])}</Table.Cell>;
            }

            return <Table.Cell key={`data_${user._id}_${column.name}`}>{column.default}</Table.Cell>;
          })
        }
        <Table.Cell key={`actions_${user._id}`}>
          <Button onClick={() => history.push(`/${user.type}/${user._id}/edit`)}>Edit</Button>
          <Button onClick={() => console.log(user._id)}>Delete</Button>
        </Table.Cell>
      </Table.Row>
    ))
  );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(props => {
  const { users = [], fetched, loadUsers, history, type = 'users' } = props;

  let usersToDisplay = [];
  usersToDisplay = loadUsers(type, users, 10, 1);

  return (
    <Segment basic style={{ padding: '10px' }}>
      {usersToDisplay.length === 0 && (<div>
        <p>No Users Found</p>
        <Button onClick={() => loadUsers(type, users, 10, 1)}>
          Load Users
        </Button>
      </div>)}
      {usersToDisplay.length > 0 && (
        <Table striped>
          <Table.Header>
            <Table.Row>
              {TableHeaders.map(header => (
                <Table.HeaderCell>{header.display}</Table.HeaderCell>
              ))}
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
            <GenerateRows history={history} data={usersToDisplay} />
          </Table.Header>
        </Table>
      )}
    </Segment>
  )
}));
