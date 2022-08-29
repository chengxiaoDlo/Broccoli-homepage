import { Modal, Button } from 'antd';

interface IProps {
  show: boolean;
  setShow: (val: boolean) => void;
}

export default function({ show, setShow }: IProps) {
  return (
    <Modal
      centered
      visible={show}
      closable={false}
      title="All done!"
      footer={ <Button role="OkBtn" style={{ width: '100px' }} type="primary" onClick={() => setShow(false)}>OK</Button> }
    >
      You will be one of the first to experience Broccoli & Co. when we launch
    </Modal>
  )
}