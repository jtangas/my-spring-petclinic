import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Segment, Button, Table } from 'semantic-ui-react';

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
  const { data, history, type, tableHeaders, system } = props;
  if (data.length === 0) {
    return (
      <Table.Row>
        <Table.Cell width={16}>No Users</Table.Cell>
      </Table.Row>
    );
  }

  return (
    data.map(entity => {
      const entityType = ['owners','vets'].includes(type) ? `/users/${entity.type}` : '/pets';
      const systemData = system[type] !== undefined ? system[type] : null;
      return (
        <Table.Row key={`row_${entity._id}`}>
          {
            tableHeaders.map(column => {
              if (entity.hasOwnProperty(column.name)) {
                return <Table.Cell key={`data_${entity._id}_${column.name}`}>{extractValue(entity[column.name])}</Table.Cell>;
              }

              return <Table.Cell key={`data_${entity._id}_${column.name}`}>{column.default}</Table.Cell>;
            })
          }
          <Table.Cell key={`actions_${entity._id}`}>
            <Button onClick={() => history.push(`${entityType}/edit/${entity._id}`)}>Edit</Button>
            <Button onClick={() => console.log(entity._id)}>Delete</Button>
          </Table.Cell>
        </Table.Row>
      )
    })
  );
};


class ConnectedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noResults: false,
      fetched: false,
      page: 1,
      perPage: 10,
      results: [],
      system: [],
    };
  }

  loadPetTypes() {
    fetch(`/api/system/pet-types`)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          this.setState(state => ({
            ...state,
            system: {
              ...state.system,
              pets: data.data,
            }
          }))
        }
      });
  }

  loadContent(type, page, perPage) {
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
      type = 'users',
    } = nextProps;

    const {
      page,
      perPage,
    } = this.state;

    this.loadContent(type, page, perPage);
  }

  componentWillMount() {
    const {
      type: entityType = 'users',
    } = this.props;

    const {
      page,
      perPage,
    } = this.state;

    this.loadContent(entityType, page, perPage);
    if (entityType === 'pets') {
      this.loadPetTypes();
    }
  }

  render() {
    const {
      history,
      tableHeaders,
      type = 'users',
    } = this.props;

    const {
      results,
      system,
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
                {tableHeaders.map(header => (
                  <Table.HeaderCell key={header.display}>{header.display}</Table.HeaderCell>
                ))}
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
              <GenerateRows system={system} tableHeaders={tableHeaders} history={history} data={results} />
            </Table.Header>
          </Table>
        )}
      </Segment>
    )
  }
}

export default compose(
  withRouter,
)(ConnectedList);
