import { useState } from 'react';
import { Button } from 'antd';
import InviteModal from '@/components/invite-modal';
import SuccessModal from '@/components/success-modal';

import styles from './index.less';

export default function HomePage() {
  const [showInviteModal, setShowInviteShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <div className={styles.container}>
      <header>
        BROCCOLI & CO.
      </header>
      <main>
        <div>
          <h2>A better way</h2>
          <h2>to enjoy every day.</h2>
          <div className={styles.desc}>Be the first to know when we launch</div>
          <Button
            style={{
              display: 'block',
              margin: '32px auto 0'
            }}
            size="large"
            type="primary"
            onClick={() => setShowInviteShowModal(true)}
          >
            Request an invite
          </Button>
        </div>
      </main>
      <footer>
        <div>
          <p>Made whit 🖤 in Melbourne.</p>
          <p>© 2016 Broccoli & Co. All rights reserved.</p>
        </div>
      </footer>
      {showInviteModal && (
        <InviteModal
          show={showInviteModal}
          setShow={setShowInviteShowModal}
          onSuccess={() => {
            setShowInviteShowModal(false);
            setShowSuccessModal(true);
          }}
        />
      )}
      {showSuccessModal && <SuccessModal show={showSuccessModal} setShow={setShowSuccessModal} /> }
      {}
    </div>
  );
}
