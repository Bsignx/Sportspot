import styled from 'styled-components';
import media from 'styled-media-query';
import { shade } from 'polished';

import Homebackground from '../../assets/background.svg';

export const Container = styled.div`
  height: 100vh;
  background: url(${Homebackground}) no-repeat 450px bottom;
  background-size: 900px;
`;

export const Content = styled.div`
  ${media.lessThan('medium')`
    align-items: center;
    text-align: center;
  `}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;

  header {
    align-self: flex-start;
    margin: 48px 0 48px 110px;

    ${media.lessThan('medium')`
      margin: 48px auto 24px;
    `}
  }

  main {
    ${media.lessThan('medium')`
      align-items: center;
    `}

    flex: 1;
    max-width: 480px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: 54px;
      color: var(--title-color);

      ${media.lessThan('medium')`
        font-size: 42px;
      `}
    }

    p {
      font-size: 24px;
      margin-top: 24px;
      line-height: 38px;

      ${media.lessThan('medium')`
        font-size: 24px;
      `}
    }

    a {
      width: 100%;
      max-width: 360px;
      height: 72px;
      background: var(--primary-color);
      border-radius: 8px;
      text-decoration: none;

      display: flex;
      align-items: center;
      overflow: hidden;

      margin-top: 40px;

      span {
        display: block;
        margin-left: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
      }

      svg {
        color: #fff;
        width: 20px;
        height: 20px;
      }

      strong {
        flex: 1;
        text-align: center;
        color: #fff;
      }

      &:hover {
        background: ${shade(0.2, '#50D06F')};
      }
    }
  }
`;
