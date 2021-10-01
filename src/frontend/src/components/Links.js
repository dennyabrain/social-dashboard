import styled from "styled-components";
import { Link } from "@reach/router";

const PlainLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  :visited {
    color: inherit;
  }
  &:hover {
    text-decoration: underline;
  }
  &.active {
    color: red;
  }
`;

export { PlainLink };
