
import { render, screen } from "@testing-library/react";

import Main from "../pages/index";


/**
 * This is a placeholder test that is here only to make sure `npm test` will not choke because there are no tests. It should be removed as soon as you write a real test.
 */
test("Placeholder test - replace with real tests", ()=>{
    render(<Main />);
    expect(screen.getByText("Generic Project")).toBeVisible();
});