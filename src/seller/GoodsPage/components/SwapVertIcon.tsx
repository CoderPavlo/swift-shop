import React from 'react'

interface ITwoToneIconProps {
    color1: string,
    color2: string,
}

export default function SwapVertIcon({ color1, color2 }: ITwoToneIconProps) {
    return (
        <svg width='24px' height='24px' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill={color1} d="m9,3l-4,3.99l3,0l0,7.01l2,0l0,-7.01l3,0l-4,-3.99z" />
            <path fill={color2} d="m16,17.01l0,-7.01l-2,0l0,7.01l-3,0l4,3.99l4,-3.99l-3,0z" />
        </svg>
    )
}
