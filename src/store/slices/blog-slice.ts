import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";

import { setAll } from "../../helpers/set-all";
import { HTMLAttributes } from "react";

interface Attributes extends HTMLAttributes<HTMLDivElement> {
  bold?: boolean;
  src?: string;
  altText?: string;
  className?: string;
  onDoubleClick?: () => void;
}

interface IInnerTags {
  type: string;
  attributes?: Attributes;
  value: any;
}

interface IBlogItem {
  type: string;
  value: Array<any>;
  attributes?: Attributes;
  language?: string;
  possibleInnerTags?: Array<IInnerTags>;
  changed: boolean;
  handlelangaugeselect?: (e: any, keyNum: number) => void;
}

interface BlogType {
  title: string;
  frontFacingPic: File | null;
  summary: string;
  likes: number;
  dislikes: number;
  views: number;
  author: string;
  authorPic?: File;
  arrayOfBlogItems: Array<IBlogItem>;
}

const initialState: BlogType = {
  title: "",
  frontFacingPic: null,
  summary: "",
  likes: 0,
  dislikes: 0,
  views: 0,
  author: "",
  authorPic: undefined,
  arrayOfBlogItems: [],
};

export const blogSlice = createSlice({
  name: "blogData",
  initialState,
  reducers: {
    loadBlogData(state, action) {
      setAll(state, action.payload);
    },
  },
});

export const { loadBlogData } = blogSlice.actions;
type RootState = ReturnType<typeof store.getState>;
export const blogSelector = (state: RootState) => state.blog;

export default blogSlice.reducer;
