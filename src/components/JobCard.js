
const JobCard = ({jobID, hideJob}) => {
    return (
        <div className = 'job-card'>
            <div className = 'ownerID'>{jobID.ownerID}</div>
            <div className = 'description'>{jobID.description}</div>
            <div className = 'title'>{jobID.title}</div>
            <div className = 'status'>{jobID.status}</div>
            <div className = 'cost'>{jobID.cost}</div>
            <div className = 'operatorID'>{jobID.operatorID ?
                jobID.operator : 'Nobody assigned to this job'}</div>
            <div className = 'city'>{jobID.city}</div>
            <div className = 'street-address'>{jobID.streetAddress}</div>
            <button onClick = {hideJob}>Close</button>
        </div>
    )
}

export default JobCard