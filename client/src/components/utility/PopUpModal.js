import React from 'react';
import { Modal, Button } from 'antd';
import {popup_title,popup_buttons} from '../../constants'
const PopUpModal = (props) => (
    
    <Modal
        title={popup_title}
        visible={props.popup}
        footer={[
            <Button key="back" onClick={props.closeModal}>
              {popup_buttons[0]}
            </Button>,
            <Button key="submit" type="primary" onClick={props.closeModal}>
              {popup_buttons[1]}
            </Button>,
          ]}
    >
        <p>{props.terms}</p>
    </Modal>
);

export default PopUpModal;
