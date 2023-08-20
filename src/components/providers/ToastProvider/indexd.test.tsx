import { logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider } from "./";
import { useToastAction } from "./hooks";
import { ToastState } from "./ToastContext";
import exp from "constants";

const user = userEvent.setup();

/** テスト用コンポーネント */
const TestComponent = ({ message }: { message: string }) => {
  const { showToast } = useToastAction();
  return <button onClick={() => showToast({message})}>show</button>
}

test("showToastを呼び出すとToastコンポーネントが表示される", async () => {
  const message = "test";
  const { container } = render(
    <ToastProvider>
      <TestComponent message={message} />
    </ToastProvider>
  );
  // はじめは表示されていなく、クリック後に表示される
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  await user.click(screen.getByRole("button"));
  expect(screen.getByRole("alert")).toHaveTextContent(message);
});

test("Succeed", () => {
  const state: ToastState = {
    isShown: true,
    message: "成功しました",
    style: "succeed",
  };
  render(<ToastProvider defaultState={state}>{null}</ToastProvider>);
  expect(screen.getByRole("alert")).toHaveTextContent(state.message);
});

test("Failed", () => {
  const state: ToastState = {
    isShown: true,
    message: "失敗しました",
    style: "failed",
  };
  render(<ToastProvider defaultState={state}>{null}</ToastProvider>);
  expect(screen.getByRole("alert")).toHaveTextContent(state.message);
});