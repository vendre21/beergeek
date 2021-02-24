import { useSelector } from 'react-redux'

import { RootState } from 'app/store'
import { selectLoadingByActionName } from 'common/apiRequests/apiRequestSelectors'


export const useLoadingState = (actionName: string): boolean => {
  const actionLoadingState = useSelector((state: RootState) =>
    selectLoadingByActionName(state, actionName)
  );

  return actionLoadingState?.loading ?? false;
};
