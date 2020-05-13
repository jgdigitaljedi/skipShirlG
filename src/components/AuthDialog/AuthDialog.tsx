import React, { FunctionComponent, useState, useCallback } from 'react';
import './AuthDialog.scss';
import { Dialog } from 'primereact/dialog';

type AuthAction = 'login' | 'create';

interface IAuthProps {
  closeModal: () => {};
}

const AuthDialog: FunctionComponent<IAuthProps> = ({ closeModal }) => {
  const [action, setAction] = useState<AuthAction>('login');

  const setAuthHeader = useCallback(() => {
    return action === 'login' ? 'Login' : 'Create  Account';
  }, [action]);

  return (
    <Dialog
      visible={true}
      header={setAuthHeader()}
      modal={true}
      closeOnEscape={true}
      onHide={() => {
        closeModal();
      }}
    ></Dialog>
  );
};

export default AuthDialog;
