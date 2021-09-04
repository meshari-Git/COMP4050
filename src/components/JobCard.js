import {Link} from "react-router-dom"

const JobCard = ({job, hideJob}) => {
    const passJob = job
    return (
        <div className = 'job-card'>
            {console.log({job})}
            <div className = 'ownerID'>{job.ownerID}</div>
            <div className = 'description'>{job.description}</div>
            <div className = 'title'>{job.title}</div>
            <div className = 'status'>{job.status}</div>
            <div className = 'cost'>{job.cost}</div>
            <div className = 'operatorID'>{job.operatorID ?
                job.operator : 'Nobody assigned to this job'}</div>
            <div className = 'city'>{job.city}</div>
            <div className = 'street-address'>{job.streetAddress}</div>
            <button onClick = {hideJob}>Close</button>
            <Link className ="modal-button-show-job" to={{
                pathname: "/job",
                state: {
                    job: passJob
                }
            }}>
                <i>Show More</i>
            </Link>
        </div>
    )
}

export default JobCard