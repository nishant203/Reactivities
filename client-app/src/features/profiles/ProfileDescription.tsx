import React, { useState, useContext } from "react";
import { Tab, Grid, Header, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ProfileEditForm from "./ProfileEditForm";
import { observer } from "mobx-react-lite";
import { IProfile } from "../../app/models/profile";

const ProfileDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    isCurrentUser,
    profile,
    submitting,
    editProfile
  } = rootStore.profileStore;
  const [editProfileMode, setEditProfileMode] = useState(false);
  const handleEditProfile = (profile: IProfile) => {
    editProfile(profile)
      .then(() => setEditProfileMode(false))
      .catch(err => console.log(err));
  };
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" icon="user" content={`About ${profile!.displayName}`} />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editProfileMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditProfileMode(!editProfileMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editProfileMode ? (
            <ProfileEditForm
              profile={profile!}
              editProfile={handleEditProfile}
              loading={submitting}
            />
          ) : (
            <p>{profile?.bio}</p>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileDescription);
