import React from 'react'
import CategoriesBlock from './components/CategoriesBlock'
import GoodsBlock from './components/GoodsBlock'

import { useSearchParams } from 'react-router-dom'

export default function HomePage(): React.JSX.Element {

  return (
    <>
      <CategoriesBlock />
      <GoodsBlock>
        
      </GoodsBlock>
    </>
  )
}
