import { useSnackbar } from 'notistack';

const useErrorHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleError = (error) => {
    console.error(error);
    enqueueSnackbar(error.message || 'An error occurred', { 
      variant: 'error',
      autoHideDuration: 3000,
    });
  };

  return handleError;
};

export default useErrorHandler;