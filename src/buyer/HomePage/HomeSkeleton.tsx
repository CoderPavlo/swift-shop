import React from 'react'
import CategoriesSceleton from './skeletons/CategoriesSkeleton'
import TabsSkeleton from './skeletons/TabsSkeleton'
import GoodsSkeleton from './skeletons/GoodsSkeleton'


export default function HomeSkeleton(): React.JSX.Element {

  return (
    <>
      <CategoriesSceleton/>
      <TabsSkeleton/>
      <GoodsSkeleton/>
    </>
  )
}
