import { createContext, useState, useEffect } from "react";
import FeedbackData from "../data/FeedbackData";

const FeedbackContext = createContext();

function FeedbackProvider({children}) {

    const [feedback, setFeedback] = useState([]);

    const [editFeedback, setEditFeedback] = useState({
        item : {},
        edit: false
    })

    useEffect(() => {
      fetchData();
    }, [])

    // FETCH DATA FROM THE JSON DATABASE
    const fetchData = async () => {
      const response = await fetch(`/feedback?_sort=id&_order=desc`)
      const data = await response.json()
      setFeedback(data);
    }

    // ADD FEEDBACK TO THE DATABASE
    const addFeedback = async (newFeedback) => {
      const response = await fetch(`/feedback`, {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(newFeedback),
      })
        const data = await response.json();
        setFeedback([data, ...feedback]);
    };

  // DELETE FEEDBACK
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${id}`, {method: 'DELETE'});
      setFeedback(feedback.filter((item) => item.id !== id)); // filter the item where item id is not equal to id
    }
  };

  // UPDATE FEEDBACK
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json();

    setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item))
  }

  const feedbackEdit = (item) => {
      setEditFeedback({
          item : item,
          edit: true
      })
  }

    return (
        <FeedbackContext.Provider value={{
            feedback,
            addFeedback,
            deleteFeedback,
            feedbackEdit,
            editFeedback,
            updateFeedback
        }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export {FeedbackProvider};
export default FeedbackContext;
