import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next';
import PasswordInput from './PasswordInput'

import { useTheme } from '@mui/material/styles';
import {
    Box,
    FormControl,
    Grid,
    Typography,

} from '@mui/material';

const hasNumber = (number: string): boolean => new RegExp(/[0-9]/).test(number);

const hasMixed = (number: string): boolean => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

const hasSpecial = (number: string): boolean => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

interface Ilevel {
    label: string,
    color: string,
}

interface IStrength extends Ilevel {
    strengths: number
}



interface INewPasswordInputProps extends React.ComponentPropsWithoutRef<typeof PasswordInput> {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function NewPasswordInput({ onChange, ...rest }: INewPasswordInputProps): React.JSX.Element {
    const theme = useTheme();
    const { t } = useTranslation();
    const strengthColor = (count: number): Ilevel => {
        if (count < 2) return { label: t('password.poor'), color: 'error.main' };
        if (count < 3) return { label: t('password.weak'), color: 'warning.main' };
        if (count < 4) return { label: t('password.normal'), color: 'warning.main' };
        if (count < 5) return { label: t('password.good'), color: 'success.main' };
        if (count < 6) return { label: t('password.strong'), color: 'success.dark' };
        return { label: 'Poor', color: 'error.main' };
    };

    const strengthIndicator = (number: string): IStrength => {
        let strengths = 1;
        if (number.length > 7) strengths += 1;
        if (hasNumber(number)) strengths += 1;
        if (hasSpecial(number)) strengths += 1;
        if (hasMixed(number)) strengths += 1;
        return { strengths: strengths*20, ...strengthColor(strengths) };
    };


    const [level, setLevel] = React.useState<IStrength>(strengthIndicator(''));
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange(e);
        setLevel(strengthIndicator(e.target.value));
    }

    return (
        <>
            <PasswordInput
                onChange={handleChange}
                {...rest}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Box sx={{ bgcolor: theme.palette.text.secondary, width: 100, height: 8, borderRadius: '7px' }} />
                        <Box sx={{ bgcolor: level?.color, width: level.strengths, height: 8, borderRadius: '7px', mt: -1 }} />
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                            {level?.label}
                        </Typography>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    )
}
