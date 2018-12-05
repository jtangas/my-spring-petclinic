import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Button, Table } from 'semantic-ui-react';

import { loadUsersAction, fetchUsersAction } from 'features/user/actions/users';
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
  if (data.length === 0) {
    return (
      <Table.Row>
        <Table.Cell width={16}>No Users</Table.Cell>
      </Table.Row>
    );
  }

  return (

    data.map(user => (
      <Table.Row key={`row_${user._id}`}>
        {
          TableHeaders.map(column => {
            if (user.hasOwnProperty(column.name)) {
              return <Table.Cell key={`data_${user._id}_${column.name}`}>{extractValue(user[column.name])}</Table.Cell>;
            }

            return <Table.Cell key={`data_${user._id}_${column.name}`}>{column.default}</Table.Cell>;
          })
        }
        <Table.Cell key={`actions_${user._id}`}>
          <Button onClick={() => history.push(`/users/${user.type}/edit/${user._id}`)}>Edit</Button>
          <Button onClick={() => console.log(user._id)}>Delete</Button>
        </Table.Cell>
      </Table.Row>
    ))
  );
};


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noResults: false,
      fetched: false,
      page: 1,
      perPage: 10,
      results: [],
    };
  }

  loadUsers(type, page, perPage) {
    fetch(`/api/${type}?page=${page}&perPage=${perPage}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState(state => ({
            ...state,
            results: data.data,
          }));
        } else {
          this.setState(state => ({
            ...state,
            noResults: true,
          }));
        }
      })
      .catch(err => {
        this.setState(state => ({
          ...state,
          noResults: true,
        }));
      });
  }

  componentWillReceiveProps(nextProps) {
    const {
      type,
    } = nextProps;

    const {
      page,
      perPage,
    } = this.state;

    this.loadUsers(type, page, perPage);
  }

  componentWillMount() {
    const {
      type = 'users',
    } = this.props;

    const {
      page,
      perPage,
    } = this.state;

    fetch(`/api/${type}?page=${page}&perPage=${perPage}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState(state => ({
            ...state,
            results: data.data,
          }));
        } else {
          this.setState(state => ({
            ...state,
            noResults: true,
          }));
        }
      })
      .catch(err => {
        this.setState(state => ({
          ...state,
          noResults: true,
        }));
      });
  }

  render() {
    const {
      history,
      type = 'users',
    } = this.props;

    const {
      results,
    } = this.state;

    const typeDisplay = `${type.slice(0,1).toUpperCase()}${type.slice(1)}`;

    return (
      <Segment basic style={{ padding: '10px' }}>
        {results.length === 0 && (<div>
          <p>No {typeDisplay} Found</p>
        </div>)}
        {results.length > 0 && (
          <Table striped>
            <Table.Header>
              <Table.Row>
                {TableHeaders.map(header => (
                  <Table.HeaderCell key={header.display}>{header.display}</Table.HeaderCell>
                ))}
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
              <GenerateRows history={history} data={results} />
            </Table.Header>
          </Table>
        )}
      </Segment>
    )
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(List);
