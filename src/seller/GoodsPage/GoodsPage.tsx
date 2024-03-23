import { Add, SwapVertTwoTone } from '@mui/icons-material'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { goods } from '../../db/goods/goods';
import GoodCard from '../../general/components/cards/GoodCard';

export default function GoodsPage() {
    return (
        <>
            <Stack display='flex' justifyContent="space-between" flexDirection="row" paddingBlock={2} alignItems='center'>
                <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
                    Сітка товарів
                </Typography>
                <Button variant='contained' startIcon={<Add />}>
                    Створити новий
                </Button>
            </Stack>
            <Stack padding={1}  display='flex' justifyContent="space-between" flexDirection="row" alignItems='center'>
                <TextField placeholder='Пошук...' size='small' sx={{ width: { md: '35%' } }} />
                <Stack direction='row' display='flex' alignItems='center'>
                    <FormControl size='small' sx={{ marginInline: 1, minWidth: '121px' }}>
                        <InputLabel id="demo-simple-select-label">Категорія</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Категорія"
                        // onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Всі</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant='outlined' endIcon={<SwapVertTwoTone />}>
                        Останні
                    </Button>
                </Stack>
            </Stack>

            <Grid container spacing={2} sx={{ mt: '4px' }}>
                {goods.map((good, index) =>
                    <GoodCard key={index} type='seller' good={good}/>
                )}
            </Grid>
        </>
    )
}
