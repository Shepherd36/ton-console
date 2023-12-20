import { FunctionComponent } from 'react';
import {
    Button,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text
} from '@chakra-ui/react';
import { CopyPad, createTransferLink, H4, Pad } from 'src/shared';
import { QRCodeSVG } from 'qrcode.react';
import { balanceStore } from '../model';
import { observer } from 'mobx-react-lite';

const RefillModalContent: FunctionComponent<{
    onClose: () => void;
}> = props => {
    const depositAddress = balanceStore.depositAddress$.value;
    return (
        <ModalContent>
            <ModalHeader>
                <H4 mb="1">Balance Refill</H4>
                <Text textStyle="body2" color="text.secondary">
                    Scan QR code for refill or send Toncoin by address bellow. Send only Toncoin on
                    this address. Sending other coins may result in permanent loss.
                </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pt="0" pb="4">
                {depositAddress && (
                    <>
                        <Pad mb="4" display="flex" alignItems="center" justifyContent="center">
                            <QRCodeSVG
                                bgColor="transparent"
                                size={180}
                                value={createTransferLink({ address: depositAddress })}
                            />
                        </Pad>
                        <CopyPad iconPosition="static" text={depositAddress} />
                    </>
                )}
            </ModalBody>

            <ModalFooter gap="3" pt="0">
                <Button flex={1} onClick={props.onClose} variant="secondary">
                    Done
                </Button>
            </ModalFooter>
        </ModalContent>
    );
};

export default observer(RefillModalContent);
