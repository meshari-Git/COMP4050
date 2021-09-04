import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios'
import { useState, useEffect } from "react"
import jobService from "../services/job"
import "../assets/css/homepage.css";
import { Link } from "react-router-dom"


function Favour() {

    const [favours, setFavours] = useState([])

    useEffect(() => {
        jobService.getFavours()
            .then(response => {
                setFavours(response.data)
            })
    }, []);

    return (
        <div>
            <table className="table">
            <tbody>
                {favours.map(favour =>
                    <div className="favourCtr">
                        <Link to={{
                            pathname: "/job",
                            state: {
                                job: favour
                            }
                        }}>
                            <tr>
                                <td>Name: {favour.title}</td>
                            </tr>
                            <tr>
                                <td>Cost: {favour.cost}</td>
                            </tr>
                            <tr>
                                <td>Status: {favour.status}</td>
                            </tr>
                        </Link>
                    </div>
                )}
            </tbody>
            </table>
        </div>

    )
}

export default Favour

