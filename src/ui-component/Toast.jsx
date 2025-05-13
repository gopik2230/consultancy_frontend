import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showToast = (message, variant = 'default') => {
    enqueueSnackbar(message, {
      variant,
      action: (snackbarId) => (
        <IconButton
          onClick={() => closeSnackbar(snackbarId)}
          sx={{ color: '#fff' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )
    });
  };

  return showToast;
};

export default useToast;
