import {
  render,
  screen,
  fireEvent,
  waitFor,
  findByLabelText,
} from "@testing-library/react";
import Loader from "../components/Loader";
import NewAppointmentForm from "../components/NewAppointmentForm";

jest.setTimeout(30000);

describe("NewAppointmentForm", () => {
  test('form progresses to the next step when the "Next" button is clicked', async () => {
    render(<NewAppointmentForm />);

    // Wait for api call
    await new Promise((r) => setTimeout(r, 5000));

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    // Click the "Next" button
    fireEvent.click(screen.getByText("Next"));

    // Wait for the next step to be displayed
    await waitFor(() => {
      expect(screen.getByLabelText("Date and Time")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Date and Time"), {
      target: { value: "2023-05-18T13:00" },
    });

    // Click the "Submit" button
    fireEvent.click(screen.getByText("Submit"));

    // Wait for api call
    await new Promise((r) => setTimeout(r, 4000));

    await waitFor(() => {
      expect(
        screen.getByText("Success! Appointment created.")
      ).toBeInTheDocument();
    });
  });
});
