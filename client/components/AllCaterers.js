import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllCaterers } from '../redux/caterer';

function AllCaterers(props) {
  const [catererName, setCatererName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    return props.fetchAllCaterers();
  }, [catererName, address, price, rating]);

  const allCaterers = props.caterers;

  return (
    <>
      <p>This is all caterers</p>
      {allCaterers.map((caterer) => {
        return (
          <div key={caterer.id}>
            {caterer.name}
            {caterer.id}
          </div>
        );
      })}
    </>
  );
}
const mapState = (state) => ({
  caterers: state.caterers,
});

const mapDispatch = (dispatch) => {
  return {
    fetchAllCaterers: () => {
      dispatch(fetchAllCaterers());
    },
  };
};
export default connect(mapState, mapDispatch)(AllCaterers);
