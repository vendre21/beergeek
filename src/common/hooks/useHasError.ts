import { useSelector } from 'react-redux'

import { RootState } from 'app/store'
import { selectErrorByActionName } from 'common/apiRequests/apiRequestSelectors'


export const useHasError = (
  actionName: string
): { hasError: boolean; error: string | undefined } => {
  const actionErrorState = useSelector((state: RootState) =>
    selectErrorByActionName(state, actionName)
  );

  return {
    hasError: actionErrorState?.hasError ?? false,
    error: actionErrorState?.error,
  };
};
