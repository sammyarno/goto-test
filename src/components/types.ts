export type ActionButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  info?: boolean;
  thumbnail?: boolean;
  small?: boolean;
};

export type ContainerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  padded?: boolean;
  style?: string;
};

export type MessageInfoProps = {
  type: "SUCCESS" | "DANGER";
};

export type RowInputProps = {
  footer?: boolean;
};
