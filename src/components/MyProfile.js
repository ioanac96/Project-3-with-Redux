import React from 'react';
import Header from './Header.js';
import './MyProfile.less';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getUserChoice, caluculateUserNeeds, saveUserInfo  } from '../actions/userChoices.js';


const optionsGender = [
    {
        value: 'men',
        label: 'Men'
    },
    {
        value: 'women',
        label: 'Women'
    }
];

const optionsBMR = [
    {
        value: 1.2,
        label: 'Little to no exercise'
    },
    {
        value: 1.375,
        label: 'Light exercise(1-3 days per week)'
    },
    {
        value: 1.55,
        label: 'Moderate exercise(3-5 days per week)'
    },
    {
        value: 1.725,
        label: 'Heavy exercise(6-7 days per week)'
    },
    {
        value: 1.9,
        label: 'Very heavy exercise(twice per day, extra heavy workouts)'
    }
];

const optionsUserWish = [
    {
        value: 'maintain',
        label: 'To maintain weight'
    },
    {
        value: 'gain',
        label: 'To gain weight'
    },
    {
        value: 'lose',
        label: 'To lose weight'
    }
];

class MyProfile extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClickCalculate = this.onClickCalculate.bind(this);
        this.onSave = this.onSave.bind(this);
    
    }

    generateObject(weight, height, age, gender, BMR,  userWish, message, calories) {
        return {
            weight: weight,
            height: height,
            age: age,
            gender: gender,
            BMR: BMR,
            userWish: userWish,
            message: message,
            calories: calories
        }
    }

    onChangeInput(inputName) {
        return (event) => {
            this.props.getUserChoice(inputName, event.target.value);
        }
    }

    onChange(selectName) {
        return (newValue) => {
            this.props.getUserChoice(selectName, newValue);
        }
    }
    

    onClickCalculate() {
        this.props.onClickCalculate();    
    }

    onSave() {
        this.props.onSave();
        this.onClickCalculate();
    }



    render() {
        const {weight, height, age, gender, BMR, userWish, calories, message} = this.props.myProfileItems.userChoices;
        console.log(this.props.myProfileItems.userChoices);
        return (
            <div>
                <Header path={this.props.match.path}/>
                <div className="container-for-details-container">
                    <div className="container-for-user-details">
                        <div className="title-for-user-calculator">Find your energy needs</div>
                        <div className="normal-inputs">
                            <div className="my-profile-input weight">
                                <label>Weight(kg):</label>
                                <input type='number' value={weight} onChange={this.onChangeInput('weight')} />
                            </div>
                            <div className="my-profile-input height">
                                <label>Height(cm):</label>
                                <input type='number' value={height} onChange={this.onChangeInput('height')}/>
                            </div>
                            <div className="my-profile-input">
                                <label>Age(years):</label>
                                <input type='number' value={age} onChange={this.onChangeInput('age')}/>
                            </div>
                        </div>
                        <div className="select">
                            <div className="select-input">
                                <Select classNamePrefix="prefix" value={gender} options={optionsGender} onChange={this.onChange('gender')} placeholder="Select gender" />
                            </div>
                            <div className="select-input bmr">
                            <Select classNamePrefix="prefix" value={BMR} options={optionsBMR} onChange={this.onChange('BMR')} placeholder="How active are you?" />
                            </div>
                            <div className="select-input" >
                            <Select classNamePrefix="prefix" value={userWish} options={optionsUserWish} onChange={this.onChange('userWish')} placeholder="What do you want to do?" />
                            </div>
                        </div>
                        <button className="calculate-button" onClick={this.onSave}>Save</button>
                        <button  className="calculate-button" onClick={this.onClickCalculate}>Calculate</button>
                        {
                            (calories !== 0 || message !=='') ? <div className="message">{message}</div> : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    myProfileItems: state
});

const mapDispatchToProps = (dispatch) => ({
    getUserChoice: (fieldName, value) => dispatch(getUserChoice(fieldName, value)),
    onClickCalculate : () => dispatch(caluculateUserNeeds()),
    onSave: () => dispatch(saveUserInfo())

});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);