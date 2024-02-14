import React from "react";
import {
  DynamicUserProfile,
  useDynamicContext
} from "@dynamic-labs/sdk-react-core";

export const AvatarNav = () => {
  const { setShowDynamicUserProfile } = useDynamicContext();
  return (
    <>
      <button onClick={() => setShowDynamicUserProfile(true)}>
        Profile
      </button>
      <DynamicUserProfile />
    </>
  );
};
