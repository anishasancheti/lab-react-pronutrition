import React, { Component } from "react";
import "./FoodBox.css";

export default class FoodBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fruits: [
                { name: "Apple", calories: 95, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT74-p3oWpuQhrHdHB20x-eIRy9ksOpkWlMsw&usqp=CAU" },
                { name: "Banana", calories: 105, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi94BSgqwm6Zzv7mx3DJWxYRWNUPC0gf3pOA&usqp=CAU" },
                { name: "Orange", calories: 45, img: "https://www.telegraph.co.uk/multimedia/archive/01834/orange_1834038b.jpg" },
                { name: "Grapes", calories: 85, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3F4wQ9Ezf5Y8VGhTDGVRRw8cYZJyRuANBpw&usqp=CAU" },
                { name: "Dates", calories: 105, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZMW7OiCvEfO7mYou3iV4q3yZPgSGTnacnKw&usqp=CAU" },
            ],
            searchTxt: "", 
            calories_count: 0, 
            myFruits: []
        }
    }

    searchFruit = (event) => {
        this.setState({
            searchTxt: event.target.value
        })
    }

    capatalize = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    addFruit = (event) => {
        let count = document.getElementById(event.target.value).value;
        let cal = this.state.fruits.filter((fruit) => {
            return fruit.name === event.target.value;
        })
        let fruitObj = {
            id: event.target.value,
            text: `${count} ${event.target.value} = ${(cal[0].calories) * count}`,
            btn_id: `${event.target.value}R`,
            calo: cal[0].calories * count
        }
        this.setState({
            myFruits: this.state.myFruits.concat(fruitObj),
            calories_count: this.state.calories_count + (cal[0].calories * count)
        })
        console.log(this.state.myFruits);
    }

    removeFruit = (event) => {
        document.getElementById(event.target.value).remove();
        let calorie = this.state.myFruits.filter((fruit) => {
            return `${fruit.id}R` === event.target.value
        })
        this.setState({
            calories_count: this.state.calories_count - calorie[0].calo
        })
    }

    render() {
        return (
            <div className="main-container">
                <div className="search-container">
                    <h1 id="search">Search</h1>
                    <input type="text" placeholder="Find a food" onChange={this.searchFruit} id="search" />
                </div>
                <div className="food-container">
                    <div className="left">
                        {this.state.fruits.filter((fruit) => {
                            return fruit.name.includes(this.state.searchTxt);
                        })
                            .map((fruit) => {
                                return <div key={fruit.name} className="fruit">
                                    <img src={fruit.img} alt="" />
                                    <div className="detail">
                                        <h1>{this.capatalize(fruit.name)}</h1>
                                        <h4>{fruit.calories}</h4>
                                    </div>
                                    <div className="count">
                                        <input type="number" defaultValue="1" id={fruit.name} min="0" />
                                        <button onClick={this.addFruit} value={fruit.name}>+</button>
                                    </div>
                                </div>
                            })}
                    </div>
                    <div className="right">
                        <h1>Today's Food {this.state.calories_count} Calories</h1>
                        {
                            this.state.myFruits.filter((fruit) => {
                                return fruit.text !== "";
                            })
                                .map((fruit) => {
                                    return <div key={fruit.id} className="item" id={fruit.btn_id}>
                                        <span>{fruit.text}</span>
                                        <button onClick={this.removeFruit} value={fruit.btn_id}>X</button>
                                    </div>
                                })
                        }
                    </div>
                </div>
            </div>
        )
    }
}