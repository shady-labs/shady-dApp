import { createSlice } from "@reduxjs/toolkit";
import { shuffle } from "../../utils/shuffle";

const initialState = {
	currentTrack: null,
	isPlaying: false,
	currentIndex: 0,
	trackList: [],
	unShuffleList: [],
	repeatStatus: "OFF",
	shuffleStatus: "OFF",
};

export const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		resetPlayer: (state) => {
			state.currentTrack = null;
			state.isPlaying = false;
			state.currentIndex = 0;
			state.trackList = [];
			state.repeatStatus = "OFF";
		},
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload;
		},
		setPlaying: (state, action) => {
			state.isPlaying = action.payload;
		},
		playTrack: (state, action) => {
			state.currentTrack = action.payload;
			state.isPlaying = true;
		},
		setTrackList: (state, action) => {
			if(state.shuffleStatus=="ON"){
				state.trackList = shuffle(action.payload.list)
			}
			else{
				state.trackList = action.payload.list
				state.unShuffleList = action.payload.list
			}
			state.currentIndex = action.payload.index ? action.payload.index : 0;
		},
		PushTrackList: (state, action) => {
			console.log(action.payload.list)
			// state.trackList = action.payload.list;
			state.trackList.push(action.payload.list[0])
			state.currentIndex = action.payload.index ? action.payload.index : 0;
			console.log("state.trackList:",state.trackList, "state.currentIndex", state.currentIndex)
		},
		shuffleTrackList: (state, action) => {
			console.log("before shuffle", state.trackList)
			state.trackList = shuffle(state.trackList)
			console.log("after shuffle", state.trackList)
		},
		nextTrack: (state) => {
			if (state.currentIndex >= state.trackList.length - 1) {
				state.currentIndex = 0;
				state.currentTrack = state.trackList[0];
			} else {
				state.currentTrack = state.trackList[state.currentIndex + 1];
				state.currentIndex += 1;
			}
		},
		prevTrack: (state) => {
			if (state.currentIndex == 0) {
				state.currentIndex = state.trackList.length - 1;
				state.currentTrack = state.trackList[state.trackList.length - 1];
			} else {
				state.currentTrack = state.trackList[state.currentIndex - 1];
				state.currentIndex -= 1;
			}
		},
		toggleRepeat: (state) => {
			console.log("repeat ontap", state.repeatStatus)
			switch (state.repeatStatus) {
				case "OFF":
					state.repeatStatus = "TRACKLIST";
					break;
				case "TRACKLIST":
					state.repeatStatus = "SINGLE";
					break;
				case "SINGLE":
					state.repeatStatus = "OFF";
					break;
				default:
					break;
			}
			console.log("repeat aftertap", state.repeatStatus)
		},
		toggleShuffle: (state) => {
			console.log("shuffle tapped")
			console.log("shuffle ontap", state.shuffleStatus)
			switch (state.shuffleStatus) {
				case "OFF":
					state.shuffleStatus = "ON";
					state.trackList = shuffle(state.trackList)				
					break;
				case "ON":
					state.shuffleStatus = "OFF";
					state.trackList = state.unShuffleList;
					break;
				default:
					break;
			}
			if(!state.shuffleStatus){
				state.shuffleStatus = "OFF";
			}
			console.log("shuffle aftertap:", state.shuffleStatus)
		},
	},
});

export const {
	resetPlayer,
	setCurrentTrack,
	setPlaying,
	playTrack,
	setTrackList,
	PushTrackList,
	shuffleTrackList,
	nextTrack,
	prevTrack,
	toggleRepeat,
	toggleShuffle
} = playerSlice.actions;

export default playerSlice.reducer;
