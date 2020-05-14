import React from 'react';

class PersonRow extends React.Component {
    render() {
        const { id, firstName, lastName, age } = this.props.person;
        return (
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
            </tr>
        );
    }
}

export default PersonRow;