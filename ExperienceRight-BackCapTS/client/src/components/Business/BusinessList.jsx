import React, { useContext, useEffect, useState } from "react";
import Business from "./Business";
import { BusinessContext } from "../../providers/BusinessProvider";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function BusinessList() {
  // const { posts, getAllPosts } = useContext(PostContext);
  // const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
  const { businesses,  getAllBusinesses, categories, getAllCategories, getAllBusinessesByCategory } = useContext(BusinessContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const [categoryId, setCategoryId] = useState();
  const [businesszByCat, setBusinesszByCat] = useState();

  
  

  useEffect(() => {
    getAllBusinesses();
  }, []);



  // useEffect(() => {
  //   // getUserId(id)
  //   getAllBusinessesByCategory()
  //   .then((businesszByCat) => {
  //       setBusinesszByCat(businesszByCat)
  //       // getAllBusinesses();
  //   })
  // }, []);





    //START Category GRAB
    // const parsedCat = parseInt(categoryId);
    // categoryId = parsedCat;

    useEffect(() => {
        getAllCategories();
    }, [])

    const handleChange = (e) => {
        setCategoryId(e.target.value);
    }
    //END =Category GRAB




  //if (sessionUser.userTypeId === 1) {
    return (
      <section>
        <div class="postCard">
          <div className="postHeader">
            <div className="postHeaderDetails">
              <div>
                {/* <h1>Listing out all the businesses in DB</h1> */}
              </div>
              <div>
                <p>
                  {/* <a class="btn-red" href="/businesses/userview">User View</a> */}
                </p>
              </div>

            </div>

          </div>
          <div class="toggle">
            <div>
              {/* <a href="/reviews/unapproved" className="unapprovedPosts">View All Unapproved</a> */}
            </div>
          </div>
          <div className="post-container">
            <table className="postTable">
              <thead className="postTableHeader">
               
                <tr>
                  <th className="postTitle-header"> Business List

                </th>
                  <th className="postUserName-header">
                   
                </th>
                  <th className="postCategory-header">
                    
                </th>
                  <th className="postDate-header">
                                      <select className="float-right" onChange={handleChange}>
                            {categories.map(category =>
                                    <option value={category.id}>
                                        {category.name}
                                    </option>
                            )}
                        </select>          
                </th>
                  <th></th>
                </tr>
              </thead>
              <div className="BusinessCardsForList">
         {businesses.map(b =>
                <Business key={b.id} business={b} />
              )}
              </div>
            </table>     
          </div>
        </div>
      </section>
   

   
              )
  }

