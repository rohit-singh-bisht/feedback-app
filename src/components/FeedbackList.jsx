import FeedbackItem from "./FeedbackItem"

function FeedbackList({ feedback, handleDelete }) {

    if(!feedback || feedback.length === 0){
        return <p>No Feedback Yet</p>
    }
    
    return(
        <div className="feedback-list">
            {feedback.map((item, index) => (
                <FeedbackItem key={index} item={item} handleDelete={handleDelete}/>
            ))}
        </div>
    )
}

export default FeedbackList