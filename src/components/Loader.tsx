import styled from "styled-components";
import { Loader as LoaderSvg } from "@/assets";

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-bottom: 2.5rem;
  }
`;

const StyledLoader = styled(LoaderSvg)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export const Loader = () => {
  return <Container>{<StyledLoader />}</Container>;
};
