import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable loadingInitial = false;
  @observable acitivityRegistry = new Map();
  @observable submitting = false;
  @observable target = "";
  @observable activity: IActivity | null=null;

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("gettting acitivity", () => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("error gettting acitivity", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  getActivity(id: string) {
    return this.acitivityRegistry.get(id);
  }
  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          this.acitivityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading failed", () => {
        this.loadingInitial = false;
      });
    }
  };
  @action clearActivity = () => {
    this.activity = null;
  };
  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("creating activity", () => {
        this.acitivityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("error creaing activity", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("edit activity", () => {
        this.acitivityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("error edit activity", () => {
        this.submitting = false;
      });
    }
  };
  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("delete activity", () => {
        this.acitivityRegistry.delete(id);
        this.target = "";
        this.submitting = false;
      });
    } catch (error) {
      runInAction("error delete activity", () => {
        this.target = "";
        this.submitting = false;
      });
    }
  };
  @computed get activitiesByDate() {
    return Array.from(this.acitivityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }
}
export default createContext(new ActivityStore());
