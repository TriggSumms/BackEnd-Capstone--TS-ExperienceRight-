// import React, { useContext, useState, useEffect } from "react";
// import { ReviewContext } from "../../providers/ReviewProvider";
// //import { FrequencyContext } from "../../providers/FrequencyProvider";
// import { useHistory, useParams, Link } from "react-router-dom";
// import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

// export default function PostEditForm() {

//     const { getById, updateReview, review } = useContext(ReviewContext);
//     //const { frequencies, getAllFrequencies } = useContext(FrequencyContext);
//     //const [ frequencyId, setFrequencyId ] = useState();
    
//     const [editedReview, setEditedReview] = useState({
//         title: "",
//         content: "",
//         rating: "",
//         //imageLocation: "",
//         dateOfExperience: "",
//         frequencyId: "",
//         businessId: "",
//         userProfileId: review.userProfileId,
//         id: review.id
        
//     });


//     //UseParams pulls in the id information from applications view 
//     const { id } = useParams();
//     const history = useHistory();

//     const handleChange = (e) => {
//         setFrequencyId(e.target.value);
//     }

//     useEffect(() => {
//         getById(parseInt(id));
//     }, [])

//     useEffect(() => {
//         getAllFrequencies();
//     }, [])


//     useEffect(() => {
//         setEditedReview(review)
//     }, [review]);

//     const editReview = (e) => {
//         updateReview({
//             title: editedReview.title,
//             content: editedReview.content,
//             //imageLocation: editedReview.imageLocation,
//             rating: editedReview.rating,
//             dateOfExperience: editedReview.dateOfExperience,
//             id: review.id
//         })

//         const parsedCat = parseInt(frequencyId);
//         editedReview.frequencyId = parsedCat;

//         if (!editedReview.reviewId) {
//             editedReview.frequencyId = review.frequencyId;
//         }

//         updateReview(editedReview.id, editedReview)
//         .then(() => {
//         history.push(`/reviews/details/${id}`);}
//         )}

//     const handleFieldChange = e => {
//         const stateToChange = { ...editedReview };
//         stateToChange[e.target.id] = e.target.value;
//         setEditedReview(stateToChange);
//     };

//     if (!editedReview) {
//         return null
//     }
//     return (
//         <>
//             <div className="container pt-4">
//                 <div className="row justify-content-center">
//                     <Card className="col-sm-12 col-lg-6">
//                         <CardBody>

//                             <Form>
//                                 <FormGroup>

//                                     <Input
//                                         id={editedReview.id}
//                                         onChange={handleFieldChange}
//                                         type="hidden"
//                                         value={review.id}
//                                     />
//                                 </FormGroup>
//                                 <FormGroup>
//                                     <Label for="content">Title</Label>
//                                     <Input
//                                         type="text"
//                                         id="title"
//                                         required
//                                         defaultValue={editedReview.title}
//                                         name="content"
//                                         onChange={handleFieldChange}
//                                     />
//                                 </FormGroup>
//                                 <FormGroup>
//                                     <Label for="content">Content</Label>
//                                     <Input
//                                         type="textarea"
//                                         id="content"
//                                         required
//                                         defaultValue={editedReview.content}
//                                         name="content"
//                                         onChange={handleFieldChange}
//                                     />
//                                 </FormGroup>
//                                 <FormGroup>
//                                     <Label for="category">Frequency</Label>
//                                     <br />
//                                     <select className="userEditDropdown" onChange={handleChange}>
//                                         {frequencies.map(frequency =>
//                                             frequency.id === review.frequencyId ?
//                                                 <option selected value={frequency.id}>
//                                                     {frequency.name}
//                                                 </option> :
//                                                 <option value={frequency.id}>
//                                                     {frequency.name}
//                                                 </option>
//                                         )}
//                                     </select>
//                                 </FormGroup>
//                                 {/* <FormGroup>
//                                     <Label for="imageLocation">Image Location</Label>
//                                     <Input
//                                         type="text"
//                                         id="imageLocation"
//                                         required
//                                         defaultValue={editedPost.imageLocation}
//                                         name="imageLocation"
//                                         onChange={handleFieldChange}
//                                     /> 
//                                 </FormGroup>*/}
                                
//                                 <FormGroup>
//                                     <Label for="dateOfExperience">Date of Experience</Label>
//                                     <Input
//                                         type="datetime-local"
//                                         id="dateOfExperience"
//                                         required
//                                         defaultValue={editedReview.dateOfExperience}
//                                         name="dateOfExperience"
//                                         onChange={handleFieldChange}
//                                     />
//                                 </FormGroup>
//                                 <FormGroup>
//                                     <Label for="rating">Rate the Experience</Label>
//                                     <Input
//                                         //type="datetime-local"
//                                         id="rating"
//                                         required
//                                         defaultValue={editedReview.rating}
//                                         name="rating"
//                                         onChange={handleFieldChange}
//                                     />
//                                 </FormGroup>                           
//                             </Form>
//                             <Button type="button" color="success" onClick={e => { editReview() }}>Save</Button> &nbsp;&nbsp;
//                             <Link to={`/reviews`}><Button type="button" color="warning">Cancel</Button></Link>
//                         </CardBody>
//                     </Card>
//                 </div>
//             </div>
//         </>
//     );
// }