import { logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { Header } from "./";

const user = userEvent.setup();

function setup(url = "/my/posts?page=1") {
  mockRouter.setCurrentUrl(url);
  const { container } = render(<Header />);
  logRoles(container);
  const combobox = screen.getByRole("combobox", { name: "公開ステータス" });
  async function selectOption(label:string) {
    await user.selectOptions(combobox, label);
  }
  return { combobox, selectOption };
}

test("デフォルトでは、「すべて」が選択されている", async () => {
  const { combobox } = setup();
  expect(combobox).toHaveDisplayValue("すべて");
});

test("status?=publicのアクセスの場合、「公開」が選択されている", async () => {
  const { combobox } = setup("/my/posts?status=public");
  expect(combobox).toHaveDisplayValue("公開");
});

test("status?=privateのアクセスの場合、「下書き」が選択されている", async () => {
  const { combobox } = setup("/my/posts?status=private");
  expect(combobox).toHaveDisplayValue("下書き");
});

test("公開ステータスを変更すると、statusが変わる", async () => {
  const { selectOption } = setup();
  expect(mockRouter).toMatchObject({ query: { page: "1" } });
  // 公開を選択すると、?status=publicになる
  await selectOption("公開");
  // すでにあるpage=1が消えていないことも合わせて検証
  expect(mockRouter).toMatchObject({
    query: { page: "1", status: "public" },
  });
  // 下書きを選択すると、?status=privateになる
  await selectOption("下書き");
  // すでにあるpage=1が消えていないことも合わせて検証
  expect(mockRouter).toMatchObject({
    query: { page: "1", status: "private" },
  });
});
