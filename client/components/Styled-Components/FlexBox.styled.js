import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 100%
  }
`
export default FlexBox;
