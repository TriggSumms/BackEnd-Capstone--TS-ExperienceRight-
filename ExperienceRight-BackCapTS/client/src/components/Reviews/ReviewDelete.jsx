// import React, { useState, useEffect, useContext } from "react";
// import { ReviewContext } from "../../providers/ReviewProvider";
// import { useHistory, useParams, Link } from "react-router-dom";
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

// export default function DeleteReviewPage() {

//     const { review, setReview, deleteReview, getById } = useContext(ReviewContext);
//     const { id } = useParams();
//     const history = useHistory();

//     useEffect(() => {
//         getById(parseInt(id))

//     }, [])

//     const deleteThaReview = () => {
//         deletePost(parseInt(id))
//             .then(() => history.push("/reviews"));
//     }

//     if (!review) {
//         return null;
//     }

//     return (
//         <>
//             <main className="postContainer">
//                 <section className="post">
//                     <h4> Delete this Review: "{review.title}"?</h4>
//                     <hr />
//                     <div className="row">
//                         <div className="actionBtns">
//                             <div className="form-group">
//                                 <input type="submit" onClick={deleteThaReview} value="Confirm" className="btn-red" />&nbsp;&nbsp;|&nbsp;&nbsp;
//                                 <Link to={`/reviews/details/${id}`}>
//                                     Cancel
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//         </>
//     );
// }