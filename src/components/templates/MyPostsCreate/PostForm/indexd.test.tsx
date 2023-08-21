import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile, setupMockServer } from "@/tests/jest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostForm } from ".";

const user = userEvent.setup();

// セットアップ関数
export function setup() {
  // アサーション用に用意したモック関数(スパイ)
  const onClickSave = jest.fn();
  const onValid = jest.fn();
  const onInvalid = jest.fn();

  render(
    <PostForm
      title="新規記事"
      onClickSave={onClickSave}
      onValid={onValid}
      onInvalid={onInvalid}
    />
  );
  /** 記事タイトルを入力するインタラクション関数 */
  async function typeTitle(title: string) {
    const textbox = screen.getByRole("textbox", { name: "記事タイトル" });
    await user.type(textbox, title);
  }
  /** 記事公開するインタラクション関数 */
  async function saveAsPublished() {
    await user.click(screen.getByRole("switch", { name: "公開ステータス" }));
    await user.click(screen.getByRole("button", { name: "記事を公開する" }));
  }
  /** 下書き保存するインタラクション関数 */
  async function saveAsDraft() {
    await user.click(screen.getByRole("button", { name: "下書き保存する" }));
  }
  return {
    typeTitle,
    saveAsPublished,
    saveAsDraft,
    onClickSave,
    onValid,
    onInvalid,
  };

}