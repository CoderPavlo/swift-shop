import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TAppDispatch, TRootState } from "./store";
import { useCallback, useRef } from "react";

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;