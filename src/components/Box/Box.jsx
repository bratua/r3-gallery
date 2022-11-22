import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import {
  color,
  space,
  typography,
  layout,
  flexbox,
  border,
  shadow,
  grid,
} from 'styled-system';

const tableStyle = createGlobalStyle`
   table{
        border-collapse: collapse;
    }`;

const Box = styled('div')(
  space,
  color,
  typography,
  layout,
  flexbox,
  border,
  shadow,
  grid,
  tableStyle
);

export default Box;
