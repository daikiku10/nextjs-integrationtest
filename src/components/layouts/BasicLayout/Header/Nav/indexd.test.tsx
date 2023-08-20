import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { Nav } from "./";

test("「My Posts」がカレント状態になっている", () => {
  // 現在のURLが /my/posts である仮定する
  mockRouter.setCurrentUrl("/my/posts");
  render(<Nav onCloseMenu={() => { }} />);
  const link = screen.getByRole("link", { name: "My Posts" });
  // aria-current属性が指定されていることをアサート
  expect(link).toHaveAttribute("aria-current", "page");
});

test("「Create Post」がカレント状態になっている", () => {
  // 現在のURLが /my/posts である仮定する
  mockRouter.setCurrentUrl("/my/posts/create");
  render(<Nav onCloseMenu={() => { }} />);
  const link = screen.getByRole("link", { name: "Create Post" });
  // aria-current属性が指定されていることをアサート
  expect(link).toHaveAttribute("aria-current", "page");
});

// 反復テスト
test.each([
  { url: "/my/posts", name: "My Posts" },
  { url: "/my/posts/123", name: "My Posts" },
  { url: "/my/posts/create", name: "Create Post" },

])("$url では $name がカレントになっている", ({ url, name}) => {
  mockRouter.setCurrentUrl(url);
  render(<Nav onCloseMenu={() => { }} />);
  const link = screen.getByRole("link", { name});
  expect(link).toHaveAttribute("aria-current", "page");
});