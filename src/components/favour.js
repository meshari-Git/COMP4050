import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios'
import {useState, useEffect} from "react"
import jobService from "../services/job"
import "../assets/css/homepage.css";


function Favour() {

    const [favours, setFavours] = useState([])

    useEffect(() => {
      jobService.getFavours()
      .then(response => {
        setFavours(response.data)
      })
    },[]);

    return (
        <div>
            <tbody>
            {favours.map(favour =>
            <div className="favourCtr">
                <tr>
                    <td>Name: {favour.title}</td>
                </tr>
                <tr>
                    <td>Cost: {favour.cost}</td>
                </tr>
                <tr>
                    <td>Status: {favour.status}</td>
                </tr>
            </div>      
            )}
            </tbody>
        </div>
        
    )
}

export default Favour

