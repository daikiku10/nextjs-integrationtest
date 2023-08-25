import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Button } from "./";

export default {
  component: Button,
  args: { children: "送信する" },
} as ComponentMeta<typeof Button>;

type Story = ComponentStoryObj<typeof Button>;

export const Default: Story = {};

// サイズの大きいボタンをStory登録
export const Large: Story = {
  args: { variant: "large" },
};
// サイズの小さいボタンをStory登録
export const Small: Story = {
  args: { variant: "small" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Dark: Story = {
  args: { theme: "dark" },
};

export const Light: Story = {
  args: { theme: "light" },
};

export const Transparent: Story = {
  args: { theme: "transparent" },
};

export const Blue: Story = {
  args: { theme: "blue" },
};

export const Error: Story = {
  args: { theme: "error" },
};
