import { motion, AnimatePresence } from "framer-motion";
import FeedbackItem from "./FeedbackItem";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackList() {

  const {feedback} = useContext(FeedbackContext);
  const {deleteFeedback} = useContext(FeedbackContext);

  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>;
  }

  return (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={index} item={item} handleDelete={deleteFeedback} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  // return(
  //     <div className="feedback-list">
  //         {feedback.map((item, index) => (
  //             <FeedbackItem key={index} item={item} handleDelete={handleDelete}/>
  //         ))}
  //     </div>
  // )
}

export default FeedbackList;
