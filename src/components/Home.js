import React from 'react';
import Item from './Item.js'
import Header from './Header.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { itemsLoaded, loadItems } from '../actions/items.js';
import { loadNutrients } from '../actions/nutrients.js';
import { changeDate } from '../actions/date.js';
import {addUserItem, eraseUserItem } from '../actions/userList.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchInputValue: '',
      showMore: true,
      wantedDay: 'current'
    };
    
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onClickShowMore = this.onClickShowMore.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
  }
  
  onChangeSearch(event) {
    this.setState({
      searchInputValue: event.target.value
    });  
  }


  onChangeDate(date) {
    console.log(date);
    this.props.onChangeDate(date);
  }
  
  onSearch() {
    this.props.loadItems(this.state.searchInputValue);
  }
  
  componentDidMount() {
    this.props.loadNutrients();
  }
  
  onAdd(currentItem, energyKcal, energyKJ, quantity) {
    this.props.addUserItem(currentItem, quantity, energyKcal, energyKJ);
  }
  
  onClose(clickedIndex) {
    this.props.eraseUserItem(clickedIndex);
  }
  
  onClickShowMore() {
    const bla = !this.state.showMore;
    this.setState({
      showMore: bla
    });
  }
  
  render () {
    const {searchInputValue,  showMore, wantedDay} = this.state;
    const {items, nutrients, loading, userItems,userEnergyKJ, userEnergyKcal, currentDay} = this.props;
    const previousDay = new Date(Date.parse(currentDay) - 24*60*60*1000);
    const nextDay = new Date(Date.parse(currentDay) + 24*60*60*1000);
    const itemsToShow = (showMore) ? userItems.length : 3;
    
    return(
      <div>
        <Header path={this.props.match.path} />
        <div className="date-picker">
          <button onClick={() => this.onChangeDate(previousDay)}>&#x21E0;</button>
          <DatePicker className="date" classNamePrefix="date-prefix" onChange={this.onChangeDate} selected={new Date(currentDay)}  />
          <button onClick={() => this.onChangeDate(nextDay)}>&#x21E2;</button>
        </div>
        <div className="search-part">
          <button onClick={this.onSearch}>Search</button>
          <input value={searchInputValue} onChange={this.onChangeSearch} />
        </div>
        {
          (loading === true) ? 
            <div className="loading">
              <div className="loading-text">Loading...</div>
              <div className="loader"></div>
            </div> : null
        }
        
        {
          (items.length > 0) ? 
          <div className="outside">
          <div className="container-for-items"> 
          <div className="container-for-user-list">
          {
            (userItems.length !== 0) ? 
            <div>
            <div className="user-energy">You consumed {userEnergyKcal} Kcal/{userEnergyKJ} kJ today!</div>
            <div className="user-list">
            {
              userItems.slice(0,itemsToShow).map((currentItem, index) => {
                return (
                  <div className="items-list">
                  <div className="item">	
                  <div className="delete-item">
                  <FontAwesomeIcon icon={faTimesCircle} onClick={() => {this.onClose(index, currentItem.energyKcal, currentItem.energyKJ)}} />
                  </div> 
                  <div>{currentItem.item.food_name}: {currentItem.quantity}x100 g/ml {currentItem.energyKcal} Kcal/{currentItem.energyKJ} KJ </div>
                  </div>
                  </div>
                  )
                })
              }
              <div className="show-part">
              {
                (userItems.length > 3 && showMore === false) ?
                <div>
                  <button id="toggle" onClick={this.onClickShowMore}>
                    <div>Show more <FontAwesomeIcon icon={faAngleDown} /> </div>
                  </button>
                </div>: null
              }
              {
                (userItems.length > 3 && showMore === true) ?
                  <div>
                    <button id="toggle" onClick={this.onClickShowMore}>
                      <div>Show less <FontAwesomeIcon icon={faAngleUp} /> </div>
                    </button>
                  </div>: null
              }
            
              </div>
              </div>
              </div> : null
            } 
            </div>
            {
              items.map((currentItem, index) => (
                <Item key={`${items.tag_id}${index}`} currentItem={currentItem} nutrients={nutrients} onAdd={this.onAdd}/>
                ))
              }
              </div>
              </div> : null   
            }
            
            </div>
            )
          }
        }
      
      const mapStateToProps = state => {

        const day = state.userList.days.find(day => day.date === state.userList.currentDay) || {};
        return {
          items: state.items.items,
          loading: state.items.loading,
          nutrients: state.nutrients,
          // userItems: state.userList.userItems,
          userEnergyKcal: day.userEnergyKcal,
          userEnergyKJ: day.userEnergyKJ,
          currentDay: state.userList.currentDay,
          userItems: day.userItems
        };
      }
        
      const mapDispatchToProps = (dispatch) => ({
        onSearch: (items) => dispatch(itemsLoaded(items)),
        loadNutrients: () => dispatch(loadNutrients()),
        loadItems: (text) => dispatch(loadItems(text)),
        addUserItem: (item, quantity, energyKcal, energyKJ) => dispatch(addUserItem(item, quantity, energyKcal, energyKJ)),
        eraseUserItem: (index) => dispatch(eraseUserItem(index)),
        onChangeDate: (date) => dispatch(changeDate(date))
       });
      
      export default connect(mapStateToProps, mapDispatchToProps)(Home);