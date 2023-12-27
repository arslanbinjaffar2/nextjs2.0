import { AlertDialog, Button, Center } from "native-base";
import React from 'react';

const AlertPopup = ({ isOpen, onClose, cancelRef, title, text, btnLeftText, btnRightText}:any) => {

    return <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>{title}</AlertDialog.Header>
            <AlertDialog.Body>
              {text}
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                  {btnLeftText}
                </Button>
                <Button colorScheme="danger" onPress={onClose}>
                  {btnRightText}
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>;
  };

export default AlertPopup;