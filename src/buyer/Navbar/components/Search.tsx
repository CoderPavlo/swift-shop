import React from 'react'
import { useTranslation } from 'react-i18next';
import { Button, Chip } from '@mui/material';


import SearchIcon from '@mui/icons-material/Search';

export default function Search(): React.JSX.Element {

  const { t } = useTranslation();

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // event.preventDefault();
      // Перевірка, чи натиснута клавіша Ctrl + K
      if (event.ctrlKey && event.key === 'k') {
        // Зміна стану для фокусування елементу Input
        
      console.log('Успіх');
      }
    };

    // Додавання обробника подій до всього документу
    document.addEventListener('keydown', handleKeyPress);

    // Прибирання обробника подій при знищенні компонента
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);


  return (

    <Button variant="outlined" size="small" color="secondary"
    startIcon={<SearchIcon />} endIcon={<Chip label="Ctrl+K" size="small" sx={{fontSize: '10px !important'}}/>}>
      {t('search')}...
    </Button>
  )
}
