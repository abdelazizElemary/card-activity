import { Button } from '../../button/Button';
import { GradientButton } from '../../button/gradient/GradientButton';
import ReactModal from 'react-modal';
import { TokenInput } from './TokenInput';
import cancelIcon from './../../../assets/icons/cancel-icon.svg';

type Props = {
    isOpen: boolean;
    closeModal: () => void;
};

const customStyles = {
    overlay: {
        background: 'rgba(0, 0, 0, 0.8)',
    },
    content: {
        background: 'transparent',
        border: 'none',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

ReactModal.setAppElement('#root');

export const ProvideLiquidityModal = ({ isOpen, closeModal }: Props) => {
    const onApproveClick = () => {
        console.log('approve');
    };
    const onProvideLiquidityClick = () => {
        console.log('provide');
    };
    return (
        <ReactModal
            isOpen={isOpen}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="flex flex-col">
                <div className="flex justify-end items-center mb-6">
                    <span className="text-sm tracking-[.1em] mr-2 text-gray-500">
                        CLOSE
                    </span>
                    <div className="w-8 h-8 flex justify-center items-center rounded-[32px] border border-gray-500 p-1">
                        <img
                            className="cursor-pointer"
                            src={cancelIcon}
                            onClick={closeModal}
                            alt="copy"
                        ></img>
                    </div>
                </div>
                <div className="flex flex-col rounded-[32px] border border-gray-500 p-8 bg-black-800">
                    <div className="font-kanit-medium color-gray-gradient text-shadow text-xl tracking-[.12em] text-center mb-4">
                        PROVIDE LIQUIDITY
                    </div>
                    <div className="flex flex-col w-[20vw]">
                        <TokenInput
                            tokenSymbol="USDT"
                            tokenAmount={1260}
                            tokenPrice={1}
                        />
                        <TokenInput
                            tokenSymbol="LAKE"
                            tokenAmount={2700}
                            tokenPrice={0.47}
                        />
                    </div>
                    <div className="flex flex-col mt-8 items-center">
                        <GradientButton
                            size="medium"
                            disabled={false}
                            text="APPROVE LAKE"
                            onClick={onApproveClick}
                        />
                        <div className="mt-6 mb-2">
                            <Button
                                size="medium"
                                disabled={false}
                                text="PROVIDE LIQUIDITY"
                                onClick={onProvideLiquidityClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};
