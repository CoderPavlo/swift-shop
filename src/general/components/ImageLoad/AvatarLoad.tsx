import { Button, Grid } from '@mui/material'
import React from 'react'
import { ESteps } from '../../authentication/components/RegisterStepper';
import ImageInput from './ImageInput';
import Cropper, { Area, Point } from 'react-easy-crop';


interface IAvatarLoad {
    data: IAvatarData,
    setData: React.Dispatch<React.SetStateAction<IAvatarData>>,
    setActiveStep: React.Dispatch<React.SetStateAction<ESteps>>,
}

export interface IAvatarData {
    loadImage?: string,
    crop: Point,
    zoom: number,
    croppedAreaPixels?: Area,
}

export default function AvatarLoad({ data, setData, setActiveStep }: IAvatarLoad) {
    const [crop, setCrop] = React.useState<Point>(data.crop);
    const [zoom, setZoom] = React.useState<number>(data.zoom);
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | undefined>(data.croppedAreaPixels);

    const onCropComplete = React.useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleClickNext = () => {
        setData({ ...data, crop, zoom, croppedAreaPixels })
        setActiveStep(ESteps.AUTH_DATA);
    }
    const handleClickBack = () => {
        if (data.loadImage)
            setData({ crop: { x: 0, y: 0 }, zoom: 1, });
        else
            setActiveStep(ESteps.PERSONAL_DATA);

    }


    return (
        <Grid container spacing={data.loadImage ? 1 : 3}>
            <Grid item xs={12} position='relative'>
                {data.loadImage ?
                    <Cropper
                        image={data.loadImage}
                        crop={crop}
                        zoom={zoom}
                        zoomSpeed={1}
                        maxZoom={3}
                        zoomWithScroll={true}
                        showGrid={true}
                        aspect={1}
                        onCropComplete={onCropComplete}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        cropShape="round"
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
                    :
                    <ImageInput image={data.loadImage} setImage={(value: string) => setData({ ...data, loadImage: value })} />
                }
            </Grid>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} md={6}>
                    <Button onClick={handleClickBack} disableElevation fullWidth size="large" type="button" variant="outlined" color="primary">
                        Назад
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button disableElevation fullWidth size="large" onClick={handleClickNext} variant="contained" color="primary">
                        Далі
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
