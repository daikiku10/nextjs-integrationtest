import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { RequestHandler } from "msw";
import { setupServer } from "msw/node";

export function setupMockServer(...handlers: RequestHandler[]) {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}

export function selectImageFile(
  inputTestId = "file",
  fileName = "hello.png",
  content = "hello"
) {
  // userEventを初期化する
  const user = userEvent.setup();
  // ダミーの画像ファイルを作成
  const filePath = [`C:\\fakepath\\${fileName}`];
  const file = new File([content], fileName, { type: "image/png" });
  // renderしたコンポーネントに含まれるdata-testid="file"相当のinput要素を取得
  const fileInput = screen.getByTestId(inputTestId);
  // この関数を実行すると、画像選択が再現される
  const selectImage = () => user.upload(fileInput, file);
  return { fileInput, filePath, selectImage };
}

const original = window.location;

export function mockWindowLocationReload() {
  Object.defineProperty(window, "location", {
    writable: true,
    value: { reload: jest.fn() },
  });
  const cleanup = () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: original,
    });
  };
  return cleanup;
}
