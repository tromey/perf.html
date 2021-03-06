/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import { getProfileViewOptions } from '../reducers/profile-view';

function englishSgPlLibrary(count) {
  return count === 1 ? 'library' : 'libraries';
}

function englishListJoin(list) {
  switch (list.length) {
    case 0:
      return '';
    case 1:
      return list[0];
    default: {
      const allButLast = list.slice(0, list.length - 1);
      return allButLast.join(', ') + ' and ' + list[list.length - 1];
    }
  }
}

class SymbolicationStatusOverlay extends PureComponent {
  render() {
    const { symbolicationStatus, waitingForLibs } = this.props;
    if (symbolicationStatus === 'SYMBOLICATING') {
      if (waitingForLibs.size > 0) {
        const libNames = Array.from(waitingForLibs.values()).map(lib => lib.debugName);
        return (
          <div className='symbolicationStatusOverlay'>
            <span className='symbolicationStatusOverlayThrobber'></span>
            {`Waiting for symbol tables for ${englishSgPlLibrary(libNames.length)} ${englishListJoin(libNames)}...`}
          </div>
        );
      }
      return (
        <div className='symbolicationStatusOverlay'>
          <span className='symbolicationStatusOverlayThrobber'></span>
          {'Symbolicating call stacks...'}
        </div>
      );
    }
    return (
      <div className='symbolicationStatusOverlay hidden'></div>
    );
  }
}

SymbolicationStatusOverlay.propTypes = {
  symbolicationStatus: PropTypes.string.isRequired,
  waitingForLibs: PropTypes.object.isRequired,
};

export default connect(state => ({
  symbolicationStatus: getProfileViewOptions(state).symbolicationStatus,
  waitingForLibs: getProfileViewOptions(state).waitingForLibs,
}), actions)(SymbolicationStatusOverlay);
