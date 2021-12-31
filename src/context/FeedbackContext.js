import { createContext, useState } from "react";
import FeedbackData from "../data/FeedbackData";

const FeedbackContext = createContext();

function FeedbackProvider({children}) {

    const [feedback, setFeedback] = useState(FeedbackData);

    const [editFeedback, setEditFeedback] = useState({
        item : {},
        edit: false
    })

    const addFeedback = (newFeedback) => {
        newFeedback.id = feedback.length + 1;
        setFeedback([newFeedback, ...feedback]);
    };

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id)); // filter the item where item id is not equal to id
    }
  };

  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updItem } : item))
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
