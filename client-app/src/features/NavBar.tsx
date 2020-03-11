import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
interface IProps {
  openCreateForm: () => void;
}
export const NavBar:React.FC<IProps> = ({openCreateForm}) => {
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
            <Button onClick={openCreateForm} positive>Create Actitity</Button>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};
