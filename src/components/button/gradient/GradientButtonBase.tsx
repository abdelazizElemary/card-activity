import { ReactNode } from 'react';
import { Size } from '../Button';
import { colors } from '../../../constants/colors';
import styled from 'styled-components';

interface Props {
    size: Size;
    disabled: boolean;
    children: ReactNode;
    onClick?: () => void;
}

export const GradientButtonBase = ({
    size,
    disabled,
    children,
    onClick,
}: Props) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`${
            disabled ? '' : 'hover:scale-105 cursor-pointer'
        } transition-transform duration-300`}
    >
        <GradientBackground
            className={`${
                size === 'small'
                    ? 'min-w-[12rem] h-[2.5rem] px-2'
                    : size === 'medium'
                    ? 'min-w-[14rem] h-[3rem] px-6'
                    : 'min-w-[18rem] h-[5.5rem] px-6 !rounded-[80px]'
            } flex justify-center items-center rounded-[32px]`}
        >
            {children}
        </GradientBackground>
    </button>
);

const GradientBackground = styled.div`
    background: linear-gradient(
        90.21deg,
        ${colors.purple['900']},
        ${colors.blue['900']}
    );
    box-shadow: inset 2px 2px 14px rgba(255, 255, 255, 0.46);
    filter: drop-shadow(0px 0px 4px ${colors.purple['600']})
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    color: ${colors.white};
`;
