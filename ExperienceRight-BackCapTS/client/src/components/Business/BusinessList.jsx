import React, { useContext, useEffect, useState, useRef } from "react";
import Business from "./Business";
import { BusinessContext } from "../../providers/BusinessProvider";
import { ReviewContext } from "../../providers/ReviewProvider";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./BusinessList.scss";





export default function BusinessList() {
  const { business, businesses, getAllBusinesses, searchBusinesses, getBusinessById, categories, getAllCategories, getAllBusinessesByCategory } = useContext(BusinessContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const [categoryId, setCategoryId] = useState();
  const [filteredBusinesses, setBusinesses] = useState([]);
  const [searchedTerm, setTerm] = useState("");
  const [categorySelected, setCategorySelected] = useState("");

  // const { reviews, reviewz, getAllReviewsforBusiness, getAllReviews } = useContext(ReviewContext);
  // const [review, setReview] = useState({});
  // const { businessId} = useParams();





  //START BULKGRAB
  // const parsedCat = parseInt(categoryId);
  // categoryId = parsedCat;
  const handleChange = e => {
    const stateToChange = { ...categories };
    stateToChange[e.target.id] = e.target.value;
    setCategoryId(stateToChange);
  };

  useEffect(() => {
    getAllBusinesses()
    // .then(getAllCategories)
  }, []);

  useEffect(() => {
    getAllCategories()
  }, []);
  //END BULK GRAB


  // useEffect(() => {
  //   getAllReviews()
  // }, [businessId]);

  // console.log(reviews)
  // // useEffect(() => {
  // //   getBusinessById(businessId)
  // // }, []);


  // useEffect(() => {
  //   getAllReviewsforBusiness(businessId);
  // }, []);


  // useEffect(() => {
  //   getAllReviewsforBusiness(business.id);
  // }, []);





  // const reviewTotalRatingAvg = reviews.map(y => y.businessId).Length
  // let sum = 0;
  // for (let num of reviewTotalRatingAvg) {
  //   sum = sum + num
  // }
  // console.log(reviewTotalRatingAvg)





  //BEGIN SET FOR FILTER METHOD
  useEffect(() => {
    setBusinesses(businesses)
  }, [businesses])

  useEffect(() => {
    searchBusinesses(searchedTerm)
  }, [searchedTerm])


  const filterAllBusinesses = (event) => {
    const filteredBusinessesByCategory = businesses.filter(business => business.categoryId === parseInt(event.target.value))
    setBusinesses(filteredBusinessesByCategory)
    setCategorySelected(parseInt(event.target.value))
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
              <div>
                <p>
                </p>
              </div>
            </div>
          </div>
          <div class="toggle">
            <div>
            </div>
          </div>
          <div className="post-container">
            <table className="postTable">
              <thead className="postTableHeader">
                <tr>
                  <th className="postTitle-header">
                    Business List
                </th>
                  <th className="postUserName-header">
                  </th>
                  <th className="postCategory-header">
                  </th>
                  <th className="postDate-header">
                    <em>
                      <select className="float-right" onClick={filterAllBusinesses} >
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
                    <em>
                      <button onClick={() => { setBusinesses(businesses); setCategorySelected("") }}><img src="https://img.icons8.com/officel/20/000000/clear-search.png" /></button>
                    </em>
                  </th>
                </tr>
              </thead>
              <div className= "businessPond">
                  {filteredBusinesses.map(business => {
                    return <Business key={business.id} business={business} categories={categories} />;
                  })}
               </div>
 
            </table>
          </div>
        </div>               
      </section>

    </>

  )
}

