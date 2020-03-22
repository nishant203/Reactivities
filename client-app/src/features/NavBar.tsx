import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../app/stores/activityStore";
import { observer } from "mobx-react-lite";

export const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <img
              src="/assets/logo.png"
              style={{ marginRight: "10px" }}
              alt="Logo"
            />
            Reactivites
          </Menu.Item>
          <Menu.Item name="Activities" />
          <Menu.Item>
            <Button onClick={activityStore.openCreateForm} positive>
              Create Actitity
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};
export default observer(NavBar);
