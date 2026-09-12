import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test/test-utils";
import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
  it("shows a translated error message on invalid credentials", async () => {
    renderWithProviders(<LoginPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("e-posta"), "umut@example.com");
    await user.type(screen.getByLabelText("şifre"), "wrong");
    await user.click(screen.getByRole("button", { name: /giriş yap/i }));

    await waitFor(() => {
      expect(screen.getByText("E-posta veya şifre hatalı.")).toBeInTheDocument();
    });
  });
});
