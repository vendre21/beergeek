import { useSelector } from 'react-redux'

import { RootState } from 'app/store'
import { selectApiRequestStateByActionName } from 'common/apiRequests/apiRequestsSelectors'


export const useRequestState = (actionName: string | string[]): boolean => {
  const actionStates = useSelector((state: RootState) =>
    selectApiRequestStateByActionName(state, actionName)
  );

  return actionStates.some((x) => x.loading === true) ?? false;
};
