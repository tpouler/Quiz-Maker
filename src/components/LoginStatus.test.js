import { screen, fireEvent, render } from "@testing-library/react";
import LoginStatus from "./LoginStatus";
import UserContext from "../contexts/UserContext.js";

const signOutMock = jest.fn();
jest.mock("firebase/auth", () => ({
  getAuth: () => ({
    signOut: signOutMock,
  }),
}));

describe("LoginStatus tests", () => {
  test("LoginStatus: With no user, displays Log in", () => {
    render(
      <UserContext.Provider value={{}}>
        <LoginStatus />
      </UserContext.Provider>
    );

    expect(screen.getByText("Log in")).toBeVisible();
  });

  test("LoginStatus: With proper user, displays email and Log out", () => {
    const user = {
      uid: 1,
      email: "a@middlebury.edu",
    };
    render(
      <UserContext.Provider value={user}>
        <LoginStatus />
      </UserContext.Provider>
    );

    expect(screen.getByText(user.email)).toBeVisible();

    expect(screen.getByTitle("logIcon")).toBeVisible();
  });

  test("LoginStatus: When user is logged in, logout button is visible", () => {
    const user = {
      uid: 1,
      email: "a@middlebury.edu",
    };
    render(
      <UserContext.Provider value={user}>
        <LoginStatus />
      </UserContext.Provider>
    );

    const logIcon = screen.getByTitle("logIcon");
    expect(logIcon).toBeVisible();

    fireEvent.click(logIcon);

    expect(signOutMock).toHaveBeenCalled();
  });
});
