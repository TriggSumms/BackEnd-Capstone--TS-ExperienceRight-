import React, { useContext, useEffect, useState } from "react";
import Review from "./Review";
import { ReviewContext } from "../../providers/ReviewProvider";
import { BusinessContext } from "../../providers/BusinessProvider";
import { Link, useHistory } from "react-router-dom";
import "./SearchBar.scss";


export default function ProfileReviewList() {
  const { categories, getAllCategories } = useContext(BusinessContext);
  const { reviews, getAllReviews, searchReviews } = useContext(ReviewContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const [categoryId, setCategoryId] = useState();
  const [filteredReviews, setReviews] = useState([]);
  const [searchedTerm, setTerm] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [titleSelected, setTitleSelected] = useState("");



  const handleChange = e => {
    const stateToChange = { ...categories };
    stateToChange[e.target.id] = e.target.value;
    setCategoryId(stateToChange);
  };


  useEffect(() => {
    getAllReviews();
  }, []);


  useEffect(() => {
    getAllCategories()

  }, []);

  //BEGIN SET FOR FILTER METHOD
  useEffect(() => {
    setReviews(reviews)
  }, [reviews])

  useEffect(() => {
    searchReviews(searchedTerm)
  }, [searchedTerm])


  const filterAllReviews = (event) => {
    const filteredReviewsByCategory = reviews.filter(review => review.business.categoryId === parseInt(event.target.value))
    setReviews(filteredReviewsByCategory)
    setCategorySelected(parseInt(event.target.value))
  }

  const filterAllReviewsVIATitle = (event) => {
    const filteredReviewsByTitle = reviews.filter(review => review.title === event.target.value)
    setReviews(filteredReviewsByTitle)
    setTitleSelected(event.target.value)
  }
  //END SET FOR FILTER METHOD



  return (

    <>
      <section>
        <div class="postCard">
          <div className="postHeader">
            <div className="postHeaderDetails">
              <div>
              </div>
            </div>
          </div>
          <div className="post-container">
            <table className="postTable">
              <thead className="postTableHeader">
                <tr>
                  <th className="postTitle-header">
                    All Reviews
             </th>
                  <th>
                    <em>
                      <select className="float-right" onClick={filterAllReviews} >
                        <option > Choose a Business Sector</option>
                        {categories.map(category =>
                          <option checked={categorySelected === category.id} value={category.id}>
                            {category.name}
                          </option>
                        )}
                      </select>
                    </em>
                  </th>
                  <th>
                    <div class="container">
                      <input onChange={filterAllReviewsVIATitle} checked={titleSelected === reviews.title} value={reviews.title} type="text" class="searchbar" maxlength="12" placeholder="Search via Title..." onKeyUp={
                        (event) => {
                          const searchTerm = event.target.value
                          setTerm(searchTerm)
                        }
                      } />
                    </div>
                  </th>
                  <th>
                    <button className="btn" onClick={() => { setReviews(reviews); setCategorySelected(""); setTitleSelected("") }}><img src="https://img.icons8.com/color/30/000000/clear-search.png"/></button>
                  </th>
                </tr>
              </thead>
            </table>  
            </div> {/* DIVIDER */}<div>
            {filteredReviews.map(review => {
              return <Review key={review.id} review={review} categories={categories} title={review.title} />;
            })}
          </div>


        </div>

      </section>

    </>
  );
}
