import { BasicLayout } from "@/components/layouts/BasicLayout";
import { PutInput } from "@/pages/api/my/profile/edit";
import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile, setupMockServer } from "@/tests/jest";
import { render, screen, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { Avatar } from ".";

function TestComponent() {
  const { register, setValue } = useForm<PutInput>();
  return BasicLayout(
    <Avatar register={register} setValue={setValue} name="imageUrl" />
  );
}

describe("アップロードに成功するテスト", () => {
  test("画像のアップロードに成功した場合、画像のsrc属性が変化する", async () => {
    // 画像アップロードが成功するように設定
    mockUploadImage();
    // コンポーネントをレンダリング
    render(<TestComponent />);
    // 画像のsrc属性がからであることを確認
    expect(screen.getByRole("img").getAttribute("src")).toBeFalsy();
    // 画像を選択
    const { selectImage } = selectImageFile();
    await selectImage();
    // 画像のsrc属性が空でないことを確認
    await waitFor(() => expect(screen.getByRole("img").getAttribute("src")).toBeTruthy());
  });
});