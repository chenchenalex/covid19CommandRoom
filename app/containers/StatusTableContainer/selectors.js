import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the statusTableContainer state domain
 */

const selectStatusTableContainerDomain = state => state.statusTableContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StatusTableContainer
 */

const makeSelectStatusTableContainer = () =>
  createSelector(selectStatusTableContainerDomain, substate => substate);

export default makeSelectStatusTableContainer;
export { selectStatusTableContainerDomain };
