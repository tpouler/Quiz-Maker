import Link from "next/link";

import { useUser } from "../contexts/UserContext";
import { getAuth } from "firebase/auth";

import { Icon } from "@iconify/react";
import loginOutlined from "@iconify/icons-ant-design/login-outlined";

import loginsStyles from "../styles/LoginStatus.module.css";

export default function LoginStatus() {
  const user = useUser();

  function logout() {
    const auth = getAuth();
    // no import necessary for signOut()?
    auth.signOut();
  }

  if (user && user.email) {
    return (
      <div className={loginsStyles.content}>
        <div>
          <Icon
            icon={loginOutlined}
            title="logIcon"
            onClick={() => logout()}
            width="25"
            height="20"
            cursor="pointer"
          />
          <p>{user.email}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={loginsStyles.content}>
        <Link href="/login">Log in</Link>
      </div>
    );
  }
}
