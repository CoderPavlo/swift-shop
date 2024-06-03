import React from 'react'
import { useTranslation } from 'react-i18next';
import { Autocomplete, CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Close, Search as SearchIcon } from '@mui/icons-material';
import { goodAPI } from '../../../store/services/goodAPI';
import { useNavigate } from 'react-router';

export default function Search(): React.JSX.Element {
  const [searchString, setSearchString] = React.useState<string>("");
  const {data: history, isFetching} = goodAPI.useFetchSearchHistoryQuery(searchString);
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  let typingTimer: ReturnType<typeof setTimeout>;
  const navigate = useNavigate();

  return (
    <>
      <Autocomplete
        freeSolo
        size='small'
        sx={{ width: { xs: '100%', md: '35%' }, marginInline: { xs: 1, md: 0 }, border: '0px', }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(e, newValue)=>{if(newValue) navigate(`/search/?query=${newValue}`)}}
        options={history ? history: []}
        loading={isFetching}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Пошук..."
            onChange={(e)=>{
              console.log('textField');
              clearTimeout(typingTimer);
            typingTimer = setTimeout(() =>
                setSearchString(e.target.value), 500);
            }}
            sx={{
              border: '0px',
              backgroundColor: alpha(theme.palette.common.white, 0.15),
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
              },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start" sx={{ paddingLeft: '8px' }}>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <React.Fragment>
                  {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                </React.Fragment>
              ),
              type: 'search',
            }}
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <Typography variant="body1" color="text.primary" width='calc(100% - 20px)' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                {option}
              </Typography>
              <IconButton aria-label="delete" color='error'
                onClick={(e)=>{
                  e.stopPropagation();

                }}
              >
                <Close/>
              </IconButton>
            </li>
          )
        }}
      />
    </>
  )
}