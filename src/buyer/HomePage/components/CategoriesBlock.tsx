import React from 'react'


import { Typography, Stack, Card, IconButton, CardContent, Skeleton, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { CustomArrowProps, default as Slider, Settings as ISettings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getRandomCategories } from '../../../db/categories/categories';

import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

import { SxProps } from '@mui/system';
import { NavigateNext, NavigateBefore } from '@mui/icons-material';


const arrowSx: SxProps = {
  position: 'absolute',
  top: 'calc(50% - 15px)',
  width: '30px',
  height: '30px'
}

export default function CategoriesBlock(): React.JSX.Element {

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.up('xs'));
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const xl = useMediaQuery(theme.breakpoints.up('xl'));

  const [slides, setSlides] = React.useState<{ toShow: number, toScroll: number }>({ toShow: 10, toScroll: 5 });

  React.useEffect(() => {
    setSlides((prevValue) => {
      if (xl) {
        return { toShow: 10, toScroll: 5 };
      } else if (lg) {
        return { toShow: 8, toScroll: 5 };
      } else if (md) {
        return { toShow: 6, toScroll: 4 };
      } else if (sm) {
        return { toShow: 4, toScroll: 3 };
      } else if (xs) {
        return { toShow: 3, toScroll: 2 };
      } else {
        return prevValue;
      }
    });
  }, [xs, sm, md, lg, xl]);

  function RightNavArrow(props: CustomArrowProps): React.JSX.Element {
    const { slideCount, currentSlide, onClick } = props;
    const hidden: boolean = slideCount ? slideCount - slides.toShow === currentSlide : false;
    return (
      <IconButton color="secondary" onClick={onClick}
        sx={{
          visibility: hidden ? 'hidden' : 'visible',
          right: '-25px',
          ...arrowSx,
        }}>
        <NavigateNext />
      </IconButton>
    );
  }

  function LeftNavArrow(props: CustomArrowProps): React.JSX.Element {
    const { currentSlide, onClick } = props;
    return (
      <IconButton color="secondary" onClick={onClick}
        sx={{
          visibility: currentSlide === 0 ? 'hidden' : 'visible',
          left: '-25px',
          ...arrowSx,
        }}>
        <NavigateBefore />
      </IconButton>
    );
  }

  var settings: ISettings = {
    arrows: true,
    nextArrow: <RightNavArrow />,
    prevArrow: <LeftNavArrow />,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slides.toShow,
    slidesToScroll: slides.toScroll,
    initialSlide: 0,
  };

  const categories = getRandomCategories(10);
  return (
    <>
      <Stack display='flex' justifyContent="space-between" flexDirection="row" paddingBlock={2}>
        <Typography variant="subtitle1" color="primary" textTransform='uppercase'>
          Категорії
        </Typography>
        <Typography variant='subtitle1' component={Link} to="/categories" color="secondary">
          Всі
        </Typography>
      </Stack>
      <div style={{ marginInline: '25px' }}>
        <Slider {...settings}>
          {categories.map(category =>
            <div key={category.id}>
              <Link to={`/categories/${category.id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{
                  borderRadius: '10px', background: 'transparent', marginInline: '10px',
                  '&:hover': {
                    marginInline: '5px',
                  }
                }}>
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{ width: '100%' }}
                  />
                  <CardContent sx={{ display: 'flex', justifyContent: 'center', height: '92px' }}>
                    <Typography variant="subtitle2" textAlign="center">
                      {category.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </div>
          )}
        </Slider>
      </div>
    </>
  )
}
