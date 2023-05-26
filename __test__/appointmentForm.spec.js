import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewAppointmentForm from "./NewAppointmentForm";

describe("NewAppointmentForm", () => {
  test('form progresses to the next step when the "Next" button is clicked', async () => {
    render(<NewAppointmentForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });

    // Click the "Next" button
    fireEvent.click(screen.getByText("Next"));

    // Wait for the next step to be displayed
    await waitFor(() => {
      expect(screen.getByLabelText("Date and Time")).toBeInTheDocument();
    });
  });
});
