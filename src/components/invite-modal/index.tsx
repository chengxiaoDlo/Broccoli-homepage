import { Modal, Form, Input, Button } from 'antd';
import { useState } from 'react';
import axios from 'axios';

import styles from './index.less';

interface IProps {
  show: boolean;
  setShow: (val: boolean) => void;
  onSuccess: VoidFunction;
}

export default function({ show, setShow, onSuccess }: IProps) {
  const [form] = Form.useForm();
  const [btnText, setBtnText] = useState('Send');
  const [lock, setLock] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submit = () => {
    setLock(true);
    setBtnText('Sending, please wait...')
    axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
      name: form.getFieldValue('userName'),
      email: form.getFieldValue('email')
    }).then(() => {
      setBtnText('Send');
      setLock(false);
      onSuccess();
    }).catch(e => {
      setBtnText('Send');
      setLock(false);
      setErrorMessage(e.message);
    })
  }

  return (
    <Modal
      title="Request an invite"
      visible={show}
      footer={null}
      centered
      destroyOnClose
      onCancel={() => setShow(false)}
    >
      <Form preserve={false} form={form} onFinish={submit}>
        <Form.Item
          label={null}
          name="userName"
          rules={[
            { required: true, message: 'Please input your full name!' },
            { pattern: /^([\u4e00-\u9fa5]{1,30}|[a-zA-Z.'\s]{2,40})$/, message: 'Please input the correct full name' }
          ]}
        >
          <Input
            placeholder="Full name"
            onChange={() => setErrorMessage('')}
          />
        </Form.Item>
        <Form.Item
          label={null}
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please input the correct email address' }
          ]}
        >
          <Input
            placeholder="Email"
            onChange={() => setErrorMessage('')}
          />
        </Form.Item>
        <Form.Item
          label={null}
          name="confirmedEmail"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please input the correct email address' },
            {
              validateTrigger: 'blur',
              validator: (_, value) => {
                const email = form.getFieldValue('email');
                if (value === email) return Promise.resolve();
                return Promise.reject(new Error('two emails are different!'));
              }
            }
          ]}
        >
          <Input
            placeholder="Confirm Email"
            onChange={() => setErrorMessage('')}
          />
        </Form.Item>
        <Button disabled={lock} style={{ width: '100%', marginTop: '24px' }} type="primary" htmlType="submit">{btnText}</Button>
      </Form>
      {errorMessage ? <div className={styles.error}>{errorMessage}</div> : null}
    </Modal>
  )
}