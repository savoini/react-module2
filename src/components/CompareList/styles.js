import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;

  header {
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      align-items: flex-end;

      i {
        margin-left: 10px;
      }
    }

    img {
      width: 64px;
    }

    strong {
      font-size: 18px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #555;
    }
  }

  ul {
    list-style: none;

    li {
      font-weigth: bold;
      padding: 12px 20px;

      small {
        font-weigth: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n -1) {
        background: #f5f5f5;
      }
    }
  }
`;
