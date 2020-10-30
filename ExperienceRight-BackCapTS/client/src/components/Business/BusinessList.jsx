import React, { useContext, useEffect, useState, useRef } from "react";
import Business from "./Business";
import { BusinessContext } from "../../providers/BusinessProvider";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function BusinessList() {
  // const { posts, getAllPosts } = useContext(PostContext);
  // const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
  const { businesses, getAllBusinesses, searchBusinesses, getBusinessById, categories, getAllCategories, getAllBusinessesByCategory } = useContext(BusinessContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const [categoryId, setCategoryId] = useState();
  //const [selectedCategoryId, setBusinesszByCat] = useState();
  const [filteredBusinesses, setBusinesses] = useState([]);
  const [searchedTerm, setTerm] = useState("");
  const [categorySelected, setCategorySelected] = useState("");





    //START BULK GRAB
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
                  <button onClick={() => { setBusinesses(businesses); setCategorySelected("")}}><img src="https://img.icons8.com/officel/20/000000/clear-search.png" /></button>
                  </em> <em><select className="float-right" onClick={filterAllBusinesses} >
                      <option > Choose a Business Sector</option>
                      {categories.map(category =>
                        <option checked={categorySelected === category.id} value={category.id}>
                          {category.name}
                        </option>
                      )}
                    </select>
                    </em>

                  </th>
                  <th></th>
                </tr>
              </thead>
              <div className="BusinessCardsForList">
                {/* {businesses.map(b =>
                <Business key={b.id} business={b} />
              )} */}
                {/* {businesses.filter(b => {
                return businesses.categories.some(category => {
                  return category.id === selectedCategoryId;
                });
              })} */}

                <div className="entries">
                  {filteredBusinesses.map(business => {
                    return <Business key={business.id} business={business} categories={categories} />;
                  })}
                </div>



              </div>
            </table>
          </div>
        </div>
      </section>
      {/* {
        categories.map(category => {
          return <>
            <input type="radio" value={category.id} name="categoryId" checked={categorySelected === category.id}
              onClick={filterAllBusinesses}
            /> {category.name}
          </>
        })
      } */}

      {/* <div >
        <button onClick={() => {
          setBusinesses(businesses)
          setCategorySelected("")
        }}>Clear Filter</button>
      </div> */}

      {/* <div>

        <input type="text" placeholder="Search" onKeyUp={
          (event) => {
            const searchTerm = event.target.value
            setTerm(searchTerm)
          }
        } />

      </div> */}

      {/* <h1>Entries</h1> */}

      {/* <div className="entries">
        {filteredBusinesses.map(business => {
          return <Business key={business.id} business={business} categories={categories} />;
        })}
      </div> */}

    </>

  )
}

