import React, { Component }  from 'react';
import {connect} from 'react-redux';
import '../styles/styles.css';
import {selectPerson} from '../redux/actions';

class CustomTable extends Component {

    renderTableContent = () => {
        let { people, searchFilter } = this.props;

        if (searchFilter != "") {
            people = people.filter( person => Object.entries(person).slice(0,4).map(entry => entry[1]).toString().toLowerCase().includes(searchFilter.toLowerCase()))
        }

        return people.map( person => {
            return (
                <tr className="Table-row" onClick={() => this.personClick(person)} key={person.id}>
                    <td className="Table-id-cell">{person.id}</td>
                    <td className="Table-cell">{person.firstName}</td>
                    <td className="Table-cell">{person.lastName}</td>
                    <td className="Table-cell">{person.organisation}</td>
                </tr>
            );
        })
    }

    personClick = person => {
        const searchPar = new URLSearchParams(window.location.search);
        searchPar.set("id", person.id);

        let parameters = searchPar.toString();
        let historyState = {
            id: person.id.toString(),
            search: searchPar.get("search") ? searchPar.get("search") : ""
        }

        window.history.pushState(historyState, "", 'filter?'+parameters)
        document.getElementById("tableContainer").className = "Table-container-slideleft";
        this.props.selectPerson(person);
    }

    render() {
        return(
            <table id="table" className="Table">
                <thead>
                    <tr className="Table-header">
                        <th className="Table-id-cell">ID</th>
                        <th className="Table-cell">First Name</th>
                        <th className="Table-cell">Last Name</th>
                        <th className="Table-cell">Organisation</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTableContent()}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => {
    return {
        people: state.people,
        selectedPerson: state.selectedPerson
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectPerson: person => dispatch(selectPerson(person))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTable);