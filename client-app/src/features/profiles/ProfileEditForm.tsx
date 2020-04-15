import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { IProfile } from "../../app/models/profile";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { observer } from "mobx-react-lite";
import { combineValidators, isRequired } from "revalidate";
import TextAreaInput from "../../app/common/form/TextAreaInput";

interface IProps {
  profile: IProfile;
  loading: boolean;
  editProfile: (profile: IProfile) => void;
}
const ProfileEditForm: React.FC<IProps> = ({
  profile,
  editProfile,
  loading
}) => {
  const validate = combineValidators({
    displayName: isRequired("Display Name"),
  });
  return (
    <FinalForm
      onSubmit={(values: IProfile) => editProfile(values)}
      initialValues={profile!}
      validate={validate}
      render={({ handleSubmit, pristine,invalid }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
            value={profile!.displayName}
          />
          <Field name="bio" value={profile!.bio} component={TextAreaInput} placeholder="Bio" />
          <Button
            loading={loading}
            positive
            content="Update Profile"
            disabled={invalid || pristine}
            floated='right'
          />
        </Form>
      )}
    ></FinalForm>
  );
};

export default observer(ProfileEditForm);
