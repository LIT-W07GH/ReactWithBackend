import React from 'react';
import PersonRow from './PersonRow';
import AddPersonRow from './AddPersonRow';
import axios from 'axios';
import { produce } from 'immer';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        }
    }

    componentDidMount = () => {
        axios.get('/api/people/getall').then(response => {
            const people = response.data;
            this.setState({ people });
        });
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onAddPersonClick = () => {
        axios.post('/api/people/add', this.state.person).then(() => {
            axios.get('/api/people/getall').then(response => {
                const people = response.data;
                this.setState({ people });
            });
        });
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 60 }}>
                <AddPersonRow
                    onTextChange={this.onTextChange}
                    person={this.state.person}
                    onAddClick={this.onAddPersonClick}
                />
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map(p => <PersonRow key={p.id} person={p} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PeopleTable;