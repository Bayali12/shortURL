import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addNotification } from '../notifications';
import { Link } from '../../../shared/types';
import api from '../../../api';

type LinksState = {
  link: Link | null;
  links: Array<Link>;
  isLoading: boolean;
  total: number;
  page: number;
  sortField: keyof Link | null;
  sortOrder: 'asc' | 'desc' | null;
};

type MyData = {
  data: Array<Link>;
  totalCount: number;
};

const initialState: LinksState = {
  link: null,
  isLoading: false,
  links: [],
  total: 0,
  page: 0,
  sortField: null,
  sortOrder: null,
};

export const fetchAllLinks = createAsyncThunk(
  'links/fetchAllLinks',
  async (params: {
    page: number;
    sortField: string | null;
    sortOrder: string | null;
  }) => {
    const { sortField: field, sortOrder: order } = params;

    const response = await api.get(
      `/statistics?${field && `order=${order}_${field}`}&offset=${
        params.page * 10
      }&limit=10`,
    );

    const totalCount = Number(response.headers['x-total-count']);
    const data = response.data;

    return { data, totalCount };
  },
);

export const fetchSqueezeLink = createAsyncThunk(
  'links/fetchSqueezeLink',
  async (link: string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post(`/squeeze?link=${link}`);

      dispatch(
        addNotification({
          message: `Short link created`,
          kind: 'success',
        }),
      );

      return data;
    } catch (error) {
      dispatch(
        addNotification({
          message: `Failed to create short link`,
          kind: 'error',
        }),
      );
      return rejectWithValue(error);
    }
  },
);

export const copyToClipBoard = createAsyncThunk(
  'links/copyToClipBoard',
  async (copyText: string, { rejectWithValue, dispatch }) => {
    try {
      await navigator.clipboard.writeText(copyText);
      dispatch(
        addNotification({
          message: `Link Copied`,
          kind: 'success',
        }),
      );
    } catch (error) {
      dispatch(
        addNotification({
          message: `Failed to copy link`,
          kind: 'error',
        }),
      );
      return rejectWithValue(error);
    }
  },
);

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSortField: (state, action: PayloadAction<keyof Link>) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSqueezeLink.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      fetchSqueezeLink.fulfilled,
      (state, action: PayloadAction<Link>) => {
        state.isLoading = false;
        state.link = action.payload;
      },
    );

    builder.addCase(fetchSqueezeLink.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchAllLinks.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      fetchAllLinks.fulfilled,
      (state, action: PayloadAction<MyData>) => {
        state.isLoading = false;
        state.links = action.payload.data;
        state.total = action.payload.totalCount;
      },
    );

    builder.addCase(fetchAllLinks.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const linksReducer = linksSlice.reducer;
export const { setCurrentPage, setSortField, setSortOrder } =
  linksSlice.actions;
