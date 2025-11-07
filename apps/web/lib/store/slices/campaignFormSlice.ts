import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CampaignFormState {
  websiteUrl: string;
  campaignName: string;
  language: string;
  locations: Array<{
    name: string;
    lat: number;
    lng: number;
  }>;
  advertisingGoal:
    | "website-traffic"
    | "brand-awareness"
    | "online-leads"
    | "online-sales"
    | "";
  currentStep: number;
}

const initialState: CampaignFormState = {
  websiteUrl: "",
  campaignName: "",
  language: "en",
  locations: [],
  advertisingGoal: "",
  currentStep: 1,
};

const campaignFormSlice = createSlice({
  name: "campaignForm",
  initialState,
  reducers: {
    setWebsiteUrl: (state, action: PayloadAction<string>) => {
      state.websiteUrl = action.payload;
    },
    setCampaignName: (state, action: PayloadAction<string>) => {
      state.campaignName = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setLocations: (
      state,
      action: PayloadAction<Array<{ name: string; lat: number; lng: number }>>
    ) => {
      state.locations = action.payload;
    },
    addLocation: (
      state,
      action: PayloadAction<{ name: string; lat: number; lng: number }>
    ) => {
      state.locations.push(action.payload);
    },
    removeLocation: (state, action: PayloadAction<number>) => {
      state.locations.splice(action.payload, 1);
    },
    setAdvertisingGoal: (
      state,
      action: PayloadAction<CampaignFormState["advertisingGoal"]>
    ) => {
      state.advertisingGoal = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    resetForm: () => initialState,
  },
});

export const {
  setWebsiteUrl,
  setCampaignName,
  setLanguage,
  setLocations,
  addLocation,
  removeLocation,
  setAdvertisingGoal,
  setCurrentStep,
  nextStep,
  previousStep,
  resetForm,
} = campaignFormSlice.actions;

export default campaignFormSlice.reducer;
