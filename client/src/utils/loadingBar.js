let loadingBar = null;

export const setLoadingBar = (ref) => {
  loadingBar = ref;
};

export const startLoading = () => {
  if (loadingBar) {
    loadingBar.continuousStart();
  }
};

export const completeLoading = () => {
  if (loadingBar) {
    loadingBar.complete();
  }
};
