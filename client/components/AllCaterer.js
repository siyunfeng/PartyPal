import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchAllCaterers } from '../redux/caterer';

function AllCaterer() {
  const [allCaterers, fetchAllCaterers] = useState({ caterers: [] });

  useEffect(() => {
    fetchAllCaterers();
  }, [allCaterers, fetchAllCaterers]);

  return <>This is all caterers</>;
}
const mapState = (state) => ({
  caterers: state.allCatererReducer,
});
export default connect(mapState, null)(AllCaterer);
