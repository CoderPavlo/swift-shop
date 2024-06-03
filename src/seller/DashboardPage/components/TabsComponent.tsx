import { Tabs, Tab } from '@mui/material'
import React from 'react'
import { SxProps } from '@mui/system';

export enum ETabs {
    GENERAL,
    GOODS,
    INFLUENCE,
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
            <Tab label="Загальна статистика" sx={tabSx} value={ETabs.GENERAL} />
            <Tab label="Статистика по товарах" sx={{ ...tabSx, marginInline: '16px' }} value={ETabs.GOODS} />
            <Tab label="Фактори впливу" sx={tabSx} value={ETabs.INFLUENCE} />
        </Tabs>
    )
}
