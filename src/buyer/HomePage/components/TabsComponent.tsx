import { Tabs, Tab } from '@mui/material'
import React from 'react'
import { SxProps } from '@mui/system';

export enum ETabs {
    RECOMMENDED,
    POPULAR,
    NEW,
}
const tabSx: SxProps = {
    border: '1px solid',
    borderRadius: '16px',
    padding: '0px 8px',
}

interface ITabComponentProps {
    value: ETabs,
    onChange: (event: React.SyntheticEvent, newValue: number) => void,
}

export default function TabsComponent({ value, onChange }: ITabComponentProps) {
    return (
        <Tabs value={value} onChange={onChange} aria-label="goods tabs"
            sx={{ marginBlock: 2 }}

            TabIndicatorProps={{
                sx: { bgcolor: "transparent", }
            }}
        >
            <Tab label="Рекомендовані" sx={tabSx} value={ETabs.RECOMMENDED} />
            <Tab label="Популярні" sx={{ ...tabSx, marginInline: '16px' }} value={ETabs.POPULAR} />
            <Tab label="Нові" sx={tabSx} value={ETabs.NEW} />
        </Tabs>
    )
}
