import styled from 'styled-components';

export const Container = styled.div`
  grid-area: MH;
  background-color: ${({ theme }) => theme.colors.secondary};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  @media (max-width: 600px) {
    justify-content: flex-end;
  }
`;

export const Profile = styled.div`
  color: ${({ theme }) => theme.colors.white};
`;

export const Welcome = styled.h3``;

export const Username = styled.span``;

export const ToggleStyled = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;
