import * as MyPosts from "@/services/client/MyPosts/__mock__/msw";
import * as MyProfile from "@/services/client/MyProfile/__mock__/msw";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile, setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import { logRoles, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import * as stories from "./index.stories";

const { Default } = composeStories(stories);
const user = userEvent.setup();

/** セットアップ関数を返却する関数 */
export function setup() {
  const { container } = render(<Default />);
  /** 記事のメイン画像を選択する関数 */
  const { selectImage } = selectImageFile();
  logRoles(container);
  /** 記事タイトルを入力する関数 */
  async function typeTitle(title: string) {
    const textbox = screen.getByRole("textbox", { name: "記事タイトル" });
    await user.type(textbox, title);
  }
  /** 「公開」として保存試行する関数 */
  async function saveAsPublished() {
    await user.click(screen.getByRole("switch", { name: "公開ステータス" }));
    await user.click(screen.getByRole("button", { name: "記事を公開する" }));
    // 非同期的に要素が描画される場合や、遅延ロードがある場合はfindByRoleを使用する
    await screen.findByRole("alertdialog");
  }
  /** 「下書き」として保存試行する関数 */
  async function saveAsDraft() {
    await user.click(screen.getByRole("button", { name: "下書きを保存する" }));
  }
  /** AlertDialogの「はい/いいえ」を選択する関数 */
  async function clickButton(name:"はい" | "いいえ") {
    await user.click(screen.getByRole("button", { name }));
  }
  return { typeTitle, saveAsPublished, saveAsDraft, clickButton, selectImage };
}
