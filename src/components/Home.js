import React from 'react';
import Item from './Item.js'
import { searchRequest, nutrientsRequest } from './requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { itemsLoaded, loadItems } from '../actions/items.js';
import { nutrientsLoaded, loadNutrients } from '../actions/nutrients.js';



class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchInputValue: '',
      nutrients: [], 
      userItems: [],
      userEnergyKcal: 0,
      userEnergyKJ: 0,
      showMore: true,
    };
    
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onClickShowMore = this.onClickShowMore.bind(this);
  }
  
  onChangeSearch(event) {
    this.setState({
      searchInputValue: event.target.value
    });
    
  }
  
  onSearch() {
    this.props.loadItems(this.state.searchInputValue);
  }
  
  componentDidMount() {
    this.props.loadNutrients();
  }
  
  generateUserList(item, quantity, energyKcal, energyKJ) {
    return {
      item: item,
      quantity: quantity,
      energyKcal: energyKcal * quantity,
      energyKJ: energyKJ * quantity 
    };
  }
  
  onAdd(currentItem, energyKcal, energyKJ, quantity) {
    const item = this.generateUserList(currentItem, quantity, energyKcal, energyKJ);
    const array = Object.assign([], this.state.userItems);
    array.push(item);
    var sumKcal = (((Number.parseFloat(item.energyKcal,10)).toFixed(2))*1 + this.state.userEnergyKcal); 
    var sumKJ = (Number.parseFloat(item.energyKJ,10) + this.state.userEnergyKJ) ; 
    this.setState({
      userItems: array,
      userEnergyKcal: sumKcal,
      userEnergyKJ: sumKJ
    });
  }
  
  onClose(clickedIndex, energyKcal, energyKJ) {
    const newUserItems = this.state.userItems.filter((currentItem, index) => index !==clickedIndex );
    const newEnergyKcal = this.state.userEnergyKcal - energyKcal;
    const newEnergyKJ = this.state.userEnergyKJ - energyKJ;
    this.setState({
      userItems: newUserItems,
      userEnergyKcal: newEnergyKcal,
      userEnergyKJ: newEnergyKJ
    });
  }
  
  onClickShowMore() {
    const bla = !this.state.showMore;
    this.setState({
      showMore: bla
    });
  }
  
  render () {
    console.log('aici', this.props.loading);
    const {searchInputValue, userEnergyKJ, userEnergyKcal, userItems, showMore} = this.state;
    const {items, nutrients, loading} = this.props;
    return(
      <div>
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
              userItems.map((currentItem, index) => {
                return (
                  <div className={(showMore)? "items-list": "items-list collapsed"}>
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
              <button id="toggle" onClick={this.onClickShowMore}>{
                (showMore) ?
                <div>Show less <FontAwesomeIcon icon={faAngleUp} /> </div>:
                <div>Show more <FontAwesomeIcon icon={faAngleDown} /> </div>
              }
              </button>
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
      
      const mapStateToProps = state => ({      
        items: state.items.items,
        loading: state.items.loading,
        nutrients: state.nutrients
      }
      );
      const mapDispatchToProps = (dispatch) => ({
        onSearch: (items) => dispatch(itemsLoaded(items)),
        loadNutrients: () => dispatch(loadNutrients()),
        loadItems: (text) => dispatch(loadItems(text))
      });
      
      export default connect(mapStateToProps, mapDispatchToProps)(Home);