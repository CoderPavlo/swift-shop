import React from 'react'

import { useSearchParams } from 'react-router-dom'
import { Tabs, Tab, Pagination } from '@mui/material';

import { SxProps } from '@mui/system';

import Goods from './Goods';
const tabSx: SxProps = {
    border: '1px solid',
    borderRadius: '16px',
    padding: '0px 8px',
}

type TQueryParams = "tab" | "page";

declare module "react-router-dom" {
    interface URLSearchParams {
        get(name: TQueryParams): string | null;
    }
}

enum UTabs {
    RECOMMENDED,
    POPULAR,
    NEW,
}

interface IGoodsBlock {
    children?: React.ReactNode,
}

export default function GoodsBlock({ children }: IGoodsBlock): React.JSX.Element {

    const [searchParams, setSearchParams] = useSearchParams();
    const getValidValue = (paramName: TQueryParams, minValue: number, maxValue: number): string => {
        let value = Number(searchParams.get(paramName) || '0');
        if (value < minValue || value > maxValue)
            value = 0;
        return value.toString();
    };

    React.useEffect(() => {
        setSearchParams({
            tab: getValidValue('tab', 0, 3),
            page: getValidValue('page', 1, 11),
        });
        // eslint-disable-next-line
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSearchParams({ tab: newValue.toString(), page: searchParams.get('page') || '1' });
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setSearchParams({ page: value.toString(), tab: searchParams.get('tab') || '0' });
    };

    return (
        <>
            <Tabs value={Number(searchParams.get('tab'))} onChange={handleChange} aria-label="goods tabs"
                sx={{ marginBlock: 2 }}

                TabIndicatorProps={{
                    sx: { bgcolor: "transparent", }
                }}
            >
                <Tab label="Рекомендовані" sx={tabSx} value={UTabs.RECOMMENDED} />
                <Tab label="Популярні" sx={{ ...tabSx, marginInline: '16px' }} value={UTabs.POPULAR} />
                <Tab label="Нові" sx={tabSx} value={UTabs.NEW} />
            </Tabs>
            <Goods />
            <Pagination count={11} variant="outlined" color="primary" page={Number(searchParams.get('page'))} onChange={handleChangePage} 
                size='large'
                sx={{
                    paddingBlock: 2,
                    display: 'flex',
                    justifyContent: 'center'
                }}
            />
        </>
    )
}
