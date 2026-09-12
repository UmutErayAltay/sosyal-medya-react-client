import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test/test-utils";
import { samplePost } from "../test/mocks/handlers";
import { PostCard } from "./PostCard";

describe("PostCard", () => {
  it("flips like state and count immediately, before the network responds", async () => {
    renderWithProviders(<PostCard post={samplePost} />);
    const user = userEvent.setup();

    expect(screen.getByText("2")).toBeInTheDocument();

    const likeButton = screen.getByRole("button", { name: /2/ });
    await user.click(likeButton);

    // Optimistic update: count/heart flip synchronously, not after a round-trip.
    expect(screen.getByText("3")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });
});
