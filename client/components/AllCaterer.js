import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function AllCaterer() {
  const [data, setData] = useState({ caterers: [] });

  useEffect(() => {
    //call GraphQL API
    // const fetchCaterData = async ()=>{
    //   const queryResult = await axios.get(
    //   )
    //   const result = queryResult.data
    //   setData()
    // }
    // fetchCaterData()
  });

  return <>This is all caterers</>;
}

export default AllCaterer;
