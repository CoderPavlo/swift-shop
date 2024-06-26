import React from 'react'
import CategoriesBlock from './components/CategoriesBlock'

import { useSearchParams } from 'react-router-dom'
import TabsComponent from './components/TabsComponent';
import { Grid, Pagination } from '@mui/material';
import { goodAPI } from '../../store/services/goodAPI';
import GoodCard from '../../general/components/cards/GoodCard';
import GoodsSkeleton from './skeletons/GoodsSkeleton';
import Loading from '../../general/components/Loading';

type TQueryParams = "tab" | "page";

declare module "react-router-dom" {
  interface URLSearchParams {
    get(name: TQueryParams): string | null;
  }
}

export default function HomePage(): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: goods, isFetching, error, refetch } = goodAPI.useFetchGoodsForUserQuery({ tab: searchParams.get('tab') || '0', page: searchParams.get('page') || '1' });

  return (
    <>
      <CategoriesBlock />
      <TabsComponent value={Number(searchParams.get('tab') || '0')} onChange={(e, newValue) => setSearchParams({ tab: newValue.toString(), page: searchParams.get('page') || '1' })} />
      <Loading
        loading={isFetching}
        skeleton={<GoodsSkeleton />}
        error={Boolean(error)}
        refetch={refetch}
      >
        <Grid container spacing={2} sx={{ mt: '4px' }}>
          {goods?.data.map(good =>
            <GoodCard key={good.id} type='view' good={good} />
          )}
        </Grid>
        {goods?.pages && goods.pages > 1 &&
          <Pagination count={goods?.pages} variant="outlined" color="primary" page={Number(searchParams.get('page') || '1')} onChange={(e, page) => { setSearchParams({ tab: searchParams.get('tab') || '0', page: page.toString() }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            size='large'
            sx={{
              paddingBlock: 2,
              display: 'flex',
              justifyContent: 'center'
            }}
          />
        }
      </Loading>
    </>
  )
}
