import { useSelector } from 'react-redux'

import { RootState } from 'app/store'
import { selectApiRequestStateByActionName } from 'common/apiRequests/apiRequestsSelectors'


export const useRequestState = (actionName: string): boolean => {
  const actionState = useSelector((state: RootState) =>
    selectApiRequestStateByActionName(state, actionName)
  );

  return actionState?.loading ?? false;
};
