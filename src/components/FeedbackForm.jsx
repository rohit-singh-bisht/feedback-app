import { useState, useEffect } from "react"
import Card from "./shared/Card"
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(5);
    const [btnDisabled, setbtnDisabled] = useState(true)
    const [message, setmessage] = useState('')

    const {addFeedback, editFeedback, updateFeedback} = useContext(FeedbackContext);

    useEffect(() => {
        if(editFeedback.edit === true){
            console.log("hello");
            setbtnDisabled(false);
            setText(editFeedback.item.text);
            setRating(editFeedback.item.rating);
        }
    }, [editFeedback])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(text.trim().length > 10){

            setmessage("")
            const newFeedback = {
                text: text,
                rating: rating
            }

            if(editFeedback.edit == true){
                updateFeedback(editFeedback.item.id, newFeedback)
            }else{
                addFeedback(newFeedback)
            }
            setbtnDisabled(true)
            setText('')
        }
    }

    // On text change handling the button and setting the text value in the state
    const handleTextChange = (e) => {
        if( text === '' ){
            setbtnDisabled(true);
            setmessage(null);
        }else if( text !== '' && text.trim().length <= 10){
            setmessage("Text must be at least 10 characters")
        }else{
            setbtnDisabled(false)
            setmessage(null)
        }
        setText(e.target.value);
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us ?</h2>
                <RatingSelect select={(rating) => setRating(rating)}/>
                <div className="input-group">
                    <textarea className="form-area" onChange={handleTextChange} value={text} placeholder="Write a review" />
                    <Button type="submit" isDisabled={btnDisabled}>Send</Button>
                </div>

                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm
