import React from 'react'
import { Edit, Assessment, LocalOffer, Inbox, Logout, } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
interface IListEl {
    primary: string,
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
}

const list: IListEl[] = [
    {
        Icon: Edit,
        primary: 'Редагувати',
    },
    {
        Icon: Assessment,
        primary: 'Статистика',
    },
    {
        Icon: Inbox,
        primary: 'Замовлення',
    },
    {
        Icon: LocalOffer,
        primary: 'Купони',
    },
    {
        Icon: Logout,
        primary: 'Вийти',
    },

]
export default function ProfileTab() {
    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, } }}>
            {list.map((item, index) =>
                <ListItemButton key={index}>
                    <ListItemIcon>
                        <item.Icon/>
                    </ListItemIcon>
                    <ListItemText primary={item.primary} />
                </ListItemButton>
            )}
        </List>
    )
}
