import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import allProfilesReducer from "./allProfiles";
import expReducer from "./experiences";
import otherProfileReducer from "./otherUserSlice";

export const store = configureStore({
  reducer: {
    myProfile: profileReducer,
    otherProfile: otherProfileReducer,
    myExp: expReducer,
    allProfiles: allProfilesReducer,
  },
});
