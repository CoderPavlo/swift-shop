import React from 'react'
import { Edit, Assessment, LocalOffer, Inbox, Logout, } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useAppDispatch } from '../../store/hooks';
import { clearTokens } from '../../store/reducers/authSlice';
import { useNavigate } from 'react-router';
interface IListEl {
    primary: string,
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
    onClick: ()=>void,
}


export default function ProfileTab() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const list: IListEl[] = [
        {
            Icon: Edit,
            primary: 'Редагувати',
            onClick: ()=>{
    
            }
        },
        {
            Icon: Assessment,
            primary: 'Статистика',
            onClick: ()=>{
                
            }
        },
        {
            Icon: Inbox,
            primary: 'Замовлення',
            onClick: ()=>{
                
            }
        },
        {
            Icon: LocalOffer,
            primary: 'Купони',
            onClick: ()=>{
                
            }
        },
        {
            Icon: Logout,
            primary: 'Вийти',
            onClick: ()=>{
                dispatch(clearTokens());
                navigate('/login');
            }
        },
    
    ]
    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, } }}>
            {list.map((item, index) =>
                <ListItemButton key={index} onClick={item.onClick}>
                    <ListItemIcon>
                        <item.Icon/>
                    </ListItemIcon>
                    <ListItemText primary={item.primary} />
                </ListItemButton>
            )}
        </List>
    )
}
