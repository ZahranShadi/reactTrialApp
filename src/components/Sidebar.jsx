import React, { Component }  from 'react';
import {connect} from 'react-redux';
import '../styles/styles.css';
import closeIcon from '../images/closeIcon.png'
import {selectPerson} from '../redux/actions';

class Sidebar extends Component {
    
    sidebarClose = () => {
        const searchPar = new URLSearchParams(window.location.search);
        searchPar.delete("id");

        let parameters = searchPar.toString();
        let historyState = {
            id: searchPar.get("id") == null ? "" : searchPar.get("id"),
            search: searchPar.get("search") == null ? "" : searchPar.get("search")
        }

        if (parameters == "") window.history.pushState(historyState, "", "home");
        else window.history.pushState(historyState, "", 'filter?'+parameters);

        document.getElementById("sidebar").className = "Sidebar-close";
        document.getElementById("sidebar-container").className = "Sidebar-container-close";
        document.getElementById("tableContainer").className = "Table-container-slideright"
        setTimeout(() => this.props.selectPerson(null), 500);
    }

    renderSidebar = () => {
        let { id, firstName, lastName, organisation, dateOfBirth, placeOfBirth, img } = this.props.selectedPerson
        return (
            <div id="sidebar" className="Sidebar">
                <img onClick={this.sidebarClose} src={closeIcon} className="CloseIcon"/>
                <div id="sidebar-container" className="Sidebar-container">
                    <img className="PersonImage" src={img}/>
                    <p className="Sidebar-container-name">{firstName + " " + lastName}</p>
                    <p className="Sidebar-container-child">ID: {id}</p>
                    <p className="Sidebar-container-child">Organisation: {organisation}</p>
                    <p className="Sidebar-container-child">Date of birth: {dateOfBirth}</p>
                    <p className="Sidebar-container-child">Place of birth: {placeOfBirth}</p>
                </div>
            </div> 
        );
    }

    render() {
        const sidebar = this.props.selectedPerson !== null ? this.renderSidebar() : ""

        return (
            <div>
                {sidebar}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedPerson: state.selectedPerson
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectPerson: (person) => dispatch(selectPerson(person))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);