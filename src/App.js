import React, {Component} from 'react';
import './styles/styles.css';
import CustomTable from './components/CustomTable';
import Sidebar from './components/Sidebar';
import {selectPerson} from './redux/actions';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchText: ""
    }
  }

  setSearchText = event => {
    let searchText = event.target.value;
    const searchPar = new URLSearchParams(window.location.search);
    if (searchText != "") 
      searchPar.set("search", searchText);
    else 
      searchPar.delete("search");

    let parameters = searchPar.toString();
    let historyState = {
        id: searchPar.get("id") == null ? "" : searchPar.get("id"),
        search: searchText
    }
    if (parameters == "") window.history.pushState(historyState, "", "home");
    else window.history.pushState(historyState, "", 'filter?'+parameters);

    this.setState({
      searchText: searchText
    })
  }

  render() {
    let {selectedPerson} = this.props;
    let currentState = window.history.state;
    let tableContainerClass = "Table-container"

    if (currentState.id != "" && selectedPerson == null) {
        let person = this.props.people[parseInt(currentState.id)-1];
        this.props.selectPerson(person);
    }
    if (currentState.search != "" && currentState.search != this.state.searchText) this.setState({searchText: currentState.search})

    if (currentState.id != "") tableContainerClass = "Table-container-slideleft"

    return (
      <div>
        <div id="tableContainer" className={tableContainerClass}>
          <input type="text" value={this.state.searchText} placeholder="Search.." className="Search" onChange={ event => this.setSearchText(event) } />
          <CustomTable searchFilter={this.state.searchText} />
        </div>
        <Sidebar/>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
