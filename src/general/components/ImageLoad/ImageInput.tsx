import React, { useMemo } from 'react';

import { Accept, useDropzone } from 'react-dropzone';
import {
    Typography,
    Paper
} from '@mui/material'
import { useTheme } from '@mui/material/styles';

interface IImageInputProps {
    image?: string, 
    setImage: (value: string)=>void,
    width?: string,
    height?: string,
}

const ImageInput = ({ image, setImage, width='100%', height}: IImageInputProps) => {
    const theme = useTheme();
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg']
        } as Accept,
        onDrop: (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];

            // Перевірка розширення файлу
            const isImage = file.type.startsWith('image/');

            if (isImage) {
                const imageUrl = URL.createObjectURL(file);
                setImage(imageUrl);
            } else {
                alert('Можна вибрати тільки зображення.');
            }
        }
    });

    const style: React.CSSProperties = useMemo(() => {
        const baseStyle : React.CSSProperties = {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderWidth: 2,
            borderRadius: 2,
            borderColor: theme.palette.secondary.main,
            borderStyle: 'dashed',
            backgroundColor: theme.palette.background.default,
            color: image? theme.palette.text.primary : theme.palette.secondary.main,
            outline: 'none',
            transition: 'border .24s ease-in-out',
            height: height,
            justifyContent: 'center'
        };

        const focusedStyle : React.CSSProperties = {
            borderColor: theme.palette.primary.main,
        };

        const acceptStyle : React.CSSProperties = {
            borderColor: theme.palette.success.main,
        };

        const rejectStyle: React.CSSProperties = {
            borderColor: theme.palette.error.main,
        };

        return {
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        };
    }, [isFocused, isDragAccept, isDragReject, theme, image, height]);

    return (
        <Paper elevation={3} style={{width: width, height: height}}>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <Typography variant="body1" textAlign='center'>
                    {"Виберіть зображення"}
                </Typography>
            </div>
        </Paper>
    )
}

export default ImageInput