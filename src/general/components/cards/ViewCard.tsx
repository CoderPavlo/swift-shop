import { AddShoppingCart, Check, Error } from '@mui/icons-material'
import { Stack, Rating, Typography, Tooltip, Box, CircularProgress, Fab } from '@mui/material'
import React from 'react'
import { IGoodCardData } from '../../../models/IGood'
import { orderAPI } from '../../../store/services/orderAPI';
interface IViewCardProps {
    good: IGoodCardData,
}
export default function ViewCard({ good }: IViewCardProps) {
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const timer = React.useRef<ReturnType<typeof setTimeout>>();
    const [addGoodToCart, { isLoading }] = orderAPI.useAddGoodToCartMutation();
    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await addGoodToCart({ good: good.id, count: 1 }).unwrap()
            .then(() => {
                setSuccess(true);
                timer.current = setTimeout(() => {
                    setSuccess(false);
                }, 2000);
            }).catch(err => {
                setError(true);
                timer.current = setTimeout(() => {
                    setError(false);
                }, 2000);
            });

    };
    return (
        <Stack display="flex" flexDirection="row" justifyContent="space-between">
            <Stack>
                <Rating value={good.rating} readOnly size="small" precision={0.1} />

                <Typography variant='h5' sx={{ overflow: 'hidden', mt: 1 }}>
                    $&#160;{good.price}
                </Typography>

            </Stack>
            <Tooltip title="Додати до корзини">
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Fab
                        aria-label="add to cart"
                        color="primary"
                        onClick={handleButtonClick}
                    >
                        {success ? <Check /> : error ? <Error/> : <AddShoppingCart/> }
                    </Fab>
                    {isLoading && (
                        <CircularProgress
                            size={68}
                            color='primary'
                            sx={{
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                            }}
                        />
                    )}
                </Box>
            </Tooltip>
        </Stack>
    )
}
