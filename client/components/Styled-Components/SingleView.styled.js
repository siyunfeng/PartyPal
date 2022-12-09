import styled from 'styled-components'

const SingleView = styled.div`
  display: flex;
  justify-content: space-around;
  flex-grow: 1;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
export default SingleView