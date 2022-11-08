import { Navigation } from '../navigation/Navigation';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    children: ReactNode;
}

export const Page = ({ children }: Props) => (
    <PageContainer>
        <Navigation />
        {children}
    </PageContainer>
);

const PageContainer = styled.div`
    position: relative;
    width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
`;
