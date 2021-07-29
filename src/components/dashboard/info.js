import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';



class info extends Component {

    constructor(props) {
        super(props);
     
        this.state = {
            location : "",
            coins : 0,
            username : "",
            imageURL : ""
        };
    }

    componentDidMount(){

        fetch('http://localhost:3200/users?fetch=true')
            .then( resp => resp.json())
            .then((data)=> {
                data.forEach((value, index) => {
                    if(this.props.uID === value._id){
                        this.setState({
                            coins: value.balance,
                            username: value.name,
                            imageURL: value.picture
                        })
                    }
                })
        })

        fetch('http://localhost:3200/rating?total=true&chosenUserID=' + this.props.uID)
        .then(response => response.json())
        .then(response => {
            this.setState({rating : response.total})
        
        })

    }

    render() {

        const name = this.state.username;
        const balance = this.state.coins;
        const rating = this.state.rating

        return (
            <div>
                <br></br>
                <h5>Hello {name},</h5>
                <p>
                    Welcome to your Dashboard. Here you can see account details including money remaining, your rating, current jobs, active listings and your history.
                </p>
                <h6>Money Remaining:</h6>
                <p>$ {balance}</p>
                <h6>Your Rating: {rating}</h6>
                <br></br>
            </div>
        );
    }
}

export default info;