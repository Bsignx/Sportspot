import styled from 'styled-components';
import { shade } from 'polished';

export const ContainerSuccess = styled.div`
  .hide {
    visibility: hidden;
  }

  .divShow {
    background: black;
    opacity: 95%;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 11111;
    top: 0;
    display: flex;
    justify-content: center;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .divShow .content {
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > svg {
      color: var(--primary-color);
      margin-bottom: 20px;
    }
  }

  a {
    color: var(--title-color);
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-top: 20px;

    svg {
      margin-right: 10px;
      color: var(--primary-color);
    }

    span {
      display: flex;
      align-items: center;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  header {
    margin-top: 48px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: var(--title-color);
      font-weight: bold;
      text-decoration: none;

      display: flex;
      align-items: center;

      svg {
        margin-right: 16px;
        color: var(--primary-color);
      }
    }
  }

  form {
    margin: 80px auto;
    padding: 64px;
    max-width: 730px;
    background: #171717;
    border-radius: 8px;

    display: flex;
    flex-direction: column;

    h1 {
      font-size: 36px;
    }

    fieldset {
      margin-top: 64px;
      min-inline-size: auto;
      border: 0;
    }

    legend {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;

      h2 {
        font-size: 24px;
      }

      span {
        font-size: 14px;
        font-weight: normal;
        color: var(--text-color);
      }
    }

    .field-group {
      flex: 1;
      display: flex;

      input + input {
        margin-left: 24px;
      }

      .field + .field {
        margin-left: 24px;
      }
    }

    .field {
      flex: 1;

      display: flex;
      flex-direction: column;
      margin-bottom: 24px;

      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        flex: 1;
        background: #f0f0f5;
        border-radius: 8px;
        border: 0;
        padding: 16px 24px;
        font-size: 16px;
        color: #6c6c80;
      }

      textarea::placeholder,
      input::placeholder {
        color: #a0a0b2;
      }

      label {
        font-size: 14px;
        margin-bottom: 8px;
      }

      textarea,
      input[type='text'],
      input[type='email'],
      input[type='number'] {
        flex: 1;
        background: #f0f0f5;
        border-radius: 8px;
        border: 0;
        padding: 16px 24px;
        font-size: 16px;
        color: #6c6c80;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }

    .field-check {
      flex-direction: row;
      align-items: center;

      input[type='checkbox'] {
        background: #f0f0f5;
      }

      label {
        margin: 0 0 0 8px;
      }
    }

    .leaflet-container {
      width: 100%;
      height: 350px;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    button {
      width: 260px;
      height: 56px;
      background: var(--primary-color);
      border-radius: 8px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      border: 0;
      align-self: flex-end;
      margin-top: 40px;
      transition: background-color 0.2s;
      cursor: pointer;

      &:hover {
        background: ${shade(0.2, '#50D06F')};
      }
    }

    .items-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      list-style: none;

      li {
        background: #3d3d3d;
        border: 2px solid #3d3d3d;
        height: 180px;
        border-radius: 8px;
        padding: 32px 24px 16px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        text-align: center;

        cursor: pointer;

        span {
          flex: 1;
          margin-top: 12px;

          display: flex;
          align-items: center;
          color: var(--title-color);
        }

        &.selected {
          background: #3d3d3d;
          border: 3px solid var(--primary-color);
        }
      }
    }
  }
`;
