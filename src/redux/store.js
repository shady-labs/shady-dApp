import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistReducer,
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import playerReducer from "./slices/playerSlice";

const persistConfig = { key: "root", storage, version: 1 };
const reducers = combineReducers({
	player: playerReducer
});
const persistedReducers = persistReducer(persistConfig, reducers);
export const store = configureStore({
	reducer: persistedReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
			},
		}),
});
