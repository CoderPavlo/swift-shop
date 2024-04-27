import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from '@mui/material';
import React from 'react'
import ImageInput from './ImageInput';
import { Close } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Cropper, { Area, Point } from 'react-easy-crop';
import getCroppedImg from './getCroppedImg';

interface IImageLoadProps {
    image: File | string | null,
    setImage: (image: File | undefined) => void,
}

export default function ImageLoad({image, setImage}: IImageLoadProps) {
    // const [image, setImage] = React.useState<File | null>();

    const [selectedImage, setSelectedImage] = React.useState<string>();
    const theme = useTheme();

    const [crop, setCrop] = React.useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = React.useState<number>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | undefined>();

    const handleClick = async () => {
        setImage(await getCroppedImg(selectedImage, croppedAreaPixels));
        setSelectedImage(undefined);
    }
    return (
        <>
            <Stack direction='row' spacing={1}>
                {image &&
                    <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt='Product media' style={{ width: '150px', height: '150px' }} />
                }
                <ImageInput image={selectedImage} setImage={setSelectedImage} width='150px' height='150px' />
            </Stack>
            <Dialog
                onClose={() => setSelectedImage(undefined)}
                open={Boolean(selectedImage)}
                fullWidth
                maxWidth='xs'
                PaperProps={{ sx: { background: theme.palette.background.paper } }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Зображення
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setSelectedImage(undefined)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
                <DialogContent dividers>
                    <Cropper
                        image={selectedImage}
                        crop={crop}
                        zoom={zoom}
                        zoomSpeed={1}
                        maxZoom={3}
                        zoomWithScroll={true}
                        showGrid={true}
                        aspect={1}
                        onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        style={{
                            containerStyle: {
                                width: '100%',
                                position: 'relative',
                            },
                            mediaStyle: {
                                position: 'relative',
                            }

                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClick}>
                        ОК
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
