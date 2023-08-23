import { composeStories } from "@storybook/testing-react";
import { logRoles, render, screen } from "@testing-library/react";
import { TextboxWithInfo } from ".";
import * as stories from "./index.stories";

test("TextboxWithInfo", async () => {
  const args = {
    title: "記事タイトル",
    info: "0 / 64",
    description: "半角英数64文字以内で入力してください。",
    error: "不正な文字が含まれています",
  };

  render(<TextboxWithInfo {...args} />);
  const textbox = screen.getByRole("textbox");
  // labelのhtmlForの確認
  expect(textbox).toHaveAccessibleName(args.title);
  // aria-describedbyの確認
  expect(textbox).toHaveAccessibleDescription(args.description);
  // aria-errormessageの確認
  expect(textbox).toHaveErrorMessage(args.error);

});