import React from 'react'

import { useTheme } from '@mui/material/styles';
import {
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    FormControl,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export interface IPasswordInput extends React.ComponentPropsWithoutRef<typeof OutlinedInput> {
    error : boolean,
    label : string,
    helperText : string | undefined,
    id : string,
}
export default function PasswordInput({error, label, helperText, id, ...rest }: IPasswordInput): React.JSX.Element {

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const theme = useTheme();
    return (
        <FormControl sx={{ width: '100%' }} variant="outlined">
            <InputLabel sx={{ color: error ? theme.palette.error.main : theme.palette.text.secondary }} htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
                id={id}
                error={error}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>setShowPassword(!showPassword)}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                {...rest}
            />
            <FormHelperText error id="standard-weight-helper-text-password-login">
                {error ? helperText : ' '}
            </FormHelperText>
        </FormControl>
    )
}
