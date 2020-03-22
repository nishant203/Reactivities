import React, {useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActitvityList  from "./ActivityList";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityDetails } from "../details/ActivityDetails";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {editMode, selectedActivity} =activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActitvityList
        ></ActitvityList>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails></ActivityDetails>
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity!}
          ></ActivityForm>
        )}
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard)