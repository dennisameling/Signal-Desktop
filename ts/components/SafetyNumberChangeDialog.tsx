// Copyright 2020 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as React from 'react';
import { noop } from 'lodash';

import { Avatar } from './Avatar';
import { ConfirmationDialog } from './ConfirmationDialog';
import { InContactsIcon } from './InContactsIcon';
import { Modal } from './Modal';

import { ConversationType } from '../state/ducks/conversations';
import { LocalizerType } from '../types/Util';

export type SafetyNumberProps = {
  contactID: string;
  onClose?: () => void;
};

export type Props = {
  readonly confirmText?: string;
  readonly contacts: Array<ConversationType>;
  readonly i18n: LocalizerType;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
  readonly renderSafetyNumber: (props: SafetyNumberProps) => JSX.Element;
};

export const SafetyNumberChangeDialog = ({
  confirmText,
  contacts,
  i18n,
  onCancel,
  onConfirm,
  renderSafetyNumber,
}: Props): JSX.Element => {
  const [selectedContact, setSelectedContact] = React.useState<
    ConversationType | undefined
  >(undefined);
  const cancelButtonRef = React.createRef<HTMLButtonElement>();

  React.useEffect(() => {
    if (cancelButtonRef && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, [cancelButtonRef, contacts]);

  const onClose = selectedContact
    ? () => {
        setSelectedContact(undefined);
      }
    : onCancel;

  if (selectedContact) {
    return (
      <Modal i18n={i18n}>
        {renderSafetyNumber({ contactID: selectedContact.id, onClose })}
      </Modal>
    );
  }

  return (
    <ConfirmationDialog
      actions={[
        {
          action: onConfirm,
          text: confirmText || i18n('sendMessageToContact'),
          style: 'affirmative',
        },
      ]}
      i18n={i18n}
      onCancel={onClose}
      onClose={noop}
      title={i18n('safetyNumberChanges')}
    >
      <div className="module-SafetyNumberChangeDialog__message">
        {i18n('changedVerificationWarning')}
      </div>
      <ul className="module-SafetyNumberChangeDialog__contacts">
        {contacts.map((contact: ConversationType) => {
          const shouldShowNumber = Boolean(contact.name || contact.profileName);

          return (
            <li
              className="module-SafetyNumberChangeDialog__contact"
              key={contact.id}
            >
              <Avatar
                avatarPath={contact.avatarPath}
                color={contact.color}
                conversationType="direct"
                i18n={i18n}
                name={contact.name}
                phoneNumber={contact.phoneNumber}
                profileName={contact.profileName}
                title={contact.title}
                size={52}
              />
              <div className="module-SafetyNumberChangeDialog__contact--wrapper">
                <div className="module-SafetyNumberChangeDialog__contact--name">
                  {contact.title}
                  {contact.name ? (
                    <span>
                      {' '}
                      <InContactsIcon i18n={i18n} />
                    </span>
                  ) : null}
                </div>
                {shouldShowNumber ? (
                  <div className="module-SafetyNumberChangeDialog__contact--number">
                    {contact.phoneNumber}
                  </div>
                ) : null}
              </div>
              <button
                className="module-SafetyNumberChangeDialog__contact--view"
                onClick={() => {
                  setSelectedContact(contact);
                }}
                tabIndex={0}
                type="button"
              >
                {i18n('view')}
              </button>
            </li>
          );
        })}
      </ul>
    </ConfirmationDialog>
  );
};
