import {createButton} from "react-social-login-buttons";

const config = {
  text: "Sign out",
  icon: "google",
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#3b5998" },
  activeStyle: { background: "#293e69" }
};

const MyGoogleSignOutButton = createButton(config);

export default MyGoogleSignOutButton;