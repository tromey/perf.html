/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @flow

import type { Summary } from '../../common/summarize-profile';
import type {
  Action, ExpandedSet, CallTreeFiltersPerThread, DataSource, ProfileSelection,
  ImplementationFilter,
} from '../actions/types';
import type { Milliseconds, StartEndRange } from '../../common/types/units';
import type { IndexIntoMarkersTable, IndexIntoFuncTable, Profile, ThreadIndex } from '../../common/types/profile';
import type { Attempt } from '../errors';

export type Reducer<T> = (T, Action) => T;

export type RequestedLib = { pdbName: string, breakpadId: string };
export type SymbolicationStatus = 'DONE' | 'SYMBOLICATING';
export type ThreadViewOptions = {
  selectedFuncStack: IndexIntoFuncTable[],
  expandedFuncStacks: Array<IndexIntoFuncTable[]>,
  selectedMarker: IndexIntoMarkersTable | -1,
};
export type ProfileViewState = {
  viewOptions: {
    threadOrder: number[],
    perThread: ThreadViewOptions[],
    symbolicationStatus: SymbolicationStatus,
    waitingForLibs: Set<RequestedLib>,
    selection: ProfileSelection,
    scrollToSelectionGeneration: number,
    rootRange: StartEndRange,
    zeroAt: Milliseconds,
    tabOrder: number[],
  },
  profile: Profile,
};

export type AppViewState =
  {| phase: string |} |
  { phase: 'INITIALIZING', additionalData: { attempt: Attempt }} |
  { phase: 'FATAL_ERROR', error: Error };

export type AppState = {
  view: AppViewState,
  isURLSetupDone: boolean,
};

export type SummaryViewState = {
  summary: null|Summary,
  expanded: null|ExpandedSet,
};

export type RangeFilterState = {
  start: number,
  end: number,
};

export type URLState = {
  dataSource: DataSource,
  hash: string,
  selectedTab: string,
  rangeFilters: RangeFilterState[],
  selectedThread: ThreadIndex,
  callTreeSearchString: string,
  callTreeFilters: CallTreeFiltersPerThread,
  implementation: ImplementationFilter,
  invertCallstack: boolean,
  hidePlatformDetails: boolean,
};

export type IconState = Set<string>;

export type State = {
  app: AppState,
  profileView: ProfileViewState,
  summaryView: SummaryViewState,
  urlState: URLState,
  icons: IconState,
};

export type IconWithClassName = {
  icon: string,
  className: string,
};
