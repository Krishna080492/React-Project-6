import { FaStar } from "react-icons/fa";
import './App.css'
import { useEffect, useState } from "react";

function App() {

  let [movie, setMovie] = useState({})
  let [star, setStar] = useState(0);
  let [feedback, setFeedback] = useState({});
  let [feedbackList, setFeedbackList] = useState([])

  useEffect(() => {
    const storedFeedbacks = JSON.parse(sessionStorage.getItem('feedbackList'));
    if (storedFeedbacks) {
      setFeedbackList(storedFeedbacks);
    }
    return (()=>{
      sessionStorage.clear()
    })
  }, []);

  let handleStar = (star) => {
    setStar(star);
    let feed = { ...feedback, ['star']: star }
    // console.log(feed);
    setFeedback(feed)
  }

  let handleChange = (e) => {
    let { name, value } = e.target;
    let feed = { ...feedback, [name]: value };
    if (name === "movie") {
      setMovie({ movie: value });
    }
    setFeedback(feed);
    // console.log(feed);
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    let feedList = [...feedbackList, feedback];
    setFeedbackList(feedList);
    // console.log(feedList);
    sessionStorage.setItem('feedbackList', JSON.stringify(feedbackList));
    setMovie({});
    setStar(0);
    setFeedback({});
  }
  return (
    <>
      <div className="app">
        <h1>Movie Reviews & Comments</h1>
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Movie Name:</label>
            <input type="text" name="movie" onChange={handleChange} value={movie.movie || ""} placeholder="Enter Movie Name..." />
          </div>
          <div className="form-group">
            <label>Reviews: </label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((v) => (
                <FaStar key={v} color={star >= v ? "#ffe229" : "#093679"} onMouseOver={() => handleStar(v)} className="star" />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Comments:</label>
            <textarea name="feedback" onChange={handleChange} value={feedback.feedback || ""}
              placeholder="Enter your comments here..."
            ></textarea>
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" className="submit-button" />
          </div>
        </form>
        <br /><br />
        <table align="center" border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>Reviews</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map((val, ind) => (
              <tr key={ind}>
                <td>
                  {[1, 2, 3, 4, 5].map((v, i) => (
                    <FaStar key={i} color={val.star >= v ? "#ffe229" : "#093679"} />
                  ))}
                </td>
                <td>{val.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
