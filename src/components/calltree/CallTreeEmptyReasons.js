/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// @flow

import React, { PureComponent } from 'react';

import EmptyReasons from '../shared/EmptyReasons';
import { selectedThreadSelectors } from '../../reducers/profile-view';
import { oneLine } from 'common-tags';
import explicitConnect, {
  type ExplicitConnectOptions,
  type ConnectedProps,
} from '../../utils/connect';

import type { Thread } from '../../types/profile';
import type { State } from '../../types/store';

type StateProps = {|
  threadName: string,
  rangeFilteredThread: Thread,
  thread: Thread,
|};

type Props = ConnectedProps<{||}, StateProps, {||}>;

/**
 * This component attempts to tell why exactly a call tree is empty with no samples
 * and display a friendly message to the end user.
 */
class CallTreeEmptyReasons extends PureComponent<Props> {
  render() {
    const { thread, rangeFilteredThread, threadName } = this.props;
    let reason;

    if (thread.samples.length === 0) {
      reason = 'This thread has no samples.';
    } else if (rangeFilteredThread.samples.length === 0) {
      reason = 'Broaden the selected range to view samples.';
    } else {
      reason = oneLine`
        Try broadening the selected range, removing search terms, or call tree transforms
        to view samples.
      `;
    }

    return (
      <EmptyReasons
        threadName={threadName}
        reason={reason}
        viewName="call tree"
      />
    );
  }
}

const options: ExplicitConnectOptions<{||}, StateProps, {||}> = {
  mapStateToProps: (state: State) => ({
    threadName: selectedThreadSelectors.getFriendlyThreadName(state),
    thread: selectedThreadSelectors.getThread(state),
    rangeFilteredThread: selectedThreadSelectors.getRangeFilteredThread(state),
  }),
  component: CallTreeEmptyReasons,
};

export default explicitConnect(options);
