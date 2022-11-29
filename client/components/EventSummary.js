import React from "react";
import PopUpDiv from "./Styled-Components/PopUpDiv.styled";

const EventSummary = () => {
  return (
    <PopUpDiv>
      <h1>Here are your event details</h1>
      <h2>December 16, 2022</h2>
      <h3>2209 GH Graduation</h3>
      <p>Time: 5-6pm</p>
      <p>Venue:</p>
      <p>Caterer:</p>
      <p>Notes</p>
      <p>We hope you have a great event!</p>
    </PopUpDiv>
  )
}

export default EventSummary