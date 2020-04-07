import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActitvityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { loadActivities, loadingInitial } = rootStore.activityStore;
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial) return <LoadingComponent content="Loading..." />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActitvityList></ActitvityList>
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activities</h2>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard);
