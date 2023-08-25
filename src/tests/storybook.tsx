import { BasicLayout } from "@/components/layouts/BasicLayout";
import { LoginUserInfoProvider } from "@/components/providers/LoginUserInfo";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Args, PartialStoryFn } from "@storybook/csf";
import { ReactFramework } from "@storybook/react";

export const BasicLayoutDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>
) => BasicLayout(<Story />);

/** 各Storyのレンダリング関数ラッパー(Decorator) */
export const LoginUserInfoProviderDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>
) => (
  // <div style={{ padding: '30px'}}> 余白を設けられる
  <LoginUserInfoProvider>
    {/* StoryがContext経由でLoginUserInfoを参照 */}
    <Story /> 
  </LoginUserInfoProvider>
  // </div>
);

export const SPStory = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
    screenshot: {
      viewport: {
        width: 375,
        height: 667,
        deviceScaleFactor: 1,
      },
      fullPage: false,
    },
  },
};

export const PCStory = {
  parameters: {
    screenshot: {
      viewport: {
        width: 1280,
        height: 800,
      },
      fullPage: false,
    },
  },
};
