import { connect } from 'react-redux';
import { mapDispatchToProps } from '../actions';
import type { StateType } from '../reducer';
import type { WidthBreakpoint } from '../../components/_util';
import { DialogSwitchToOfficialClient } from '../../components/DialogSwitchToOfficialClient';

type PropsType = Readonly<{ containerWidthBreakpoint: WidthBreakpoint }>;

const mapStateToProps = (_: StateType, ownProps: PropsType) => {
  return {
    ...ownProps,
  };
};

const smart = connect(mapStateToProps, mapDispatchToProps);

export const SmartSwitchToOfficialClientDialog = smart(
  DialogSwitchToOfficialClient
);
