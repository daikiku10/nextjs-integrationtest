import { InputFileButton } from "@/components/atoms/InputFileButton";
import { useUploadImage } from "@/components/hooks/useUploadImage";
import { useToastAction } from "@/components/providers/ToastProvider";
import { PutInput } from "@/pages/api/my/profile/edit";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import styles from "./styles.module.css";

type Props<T extends FieldValues = PutInput> = {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
  defaultImageUrl?: string;
};

export const Avatar = (props: Props) => {
  const { showToast } = useToastAction();
  const { onChangeImage, imageUrl } = useUploadImage({
    ...props,
    onRejected: () => {
      // ③：画像アップロードに失敗した場合、失敗した旨が警告される
      showToast({
        message: `画像のアップロードに失敗しました`,
        style: "failed",
      });
    },
  });
  return (
    <div className={styles.module}>
      <p className={styles.avatar}>
        {/* ②：画像アップロードに成功すると、imageUrlに画像URLが格納される */}
        <img src={imageUrl || ""} alt="" />
      </p>
      {/* ①：ボタン押下で画像を選択し、選択されたとき画像アップロードを試みる */}
      <InputFileButton
        buttonProps={{
          children: "写真を変更する",
          type: "button",
        }}
        inputProps={{
          "data-testid": "file",
          accept: "image/png, image/jpeg",
          onChange: onChangeImage,
        }}
      />
    </div>
  );
};
