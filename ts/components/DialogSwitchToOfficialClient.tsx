import React from 'react';

import type { WidthBreakpoint } from './_util';

import { LeftPaneDialog } from './LeftPaneDialog';
import { openLinkInWebBrowser } from '../util/openLinkInWebBrowser';

type PropsType = {
  containerWidthBreakpoint: WidthBreakpoint;
};

export const DialogSwitchToOfficialClient = ({
  containerWidthBreakpoint,
}: PropsType): JSX.Element | null => {
  if (process.platform !== 'darwin') {
    return null;
  }

  return (
    <LeftPaneDialog
      containerWidthBreakpoint={containerWidthBreakpoint}
      hasXButton={false}
      type="warning"
      onClick={() => {
        openLinkInWebBrowser(
          'https://github.com/dennisameling/Signal-Desktop#ending-support-for-signal-unofficial-on-macos'
        );
      }}
      clickLabel="Click for more details."
      hasAction
      title="Switch to official client"
      subtitle="Signal Unofficial is no longer supported on macOS."
    />
  );
};
