import React from "react"
import {screen, render} from "@testing-library/react"

import {ProfileWidget} from "./profile-widget";

describe("ProfileWidget", () => {
    it("should render the component", () => {
        render(<ProfileWidget contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
