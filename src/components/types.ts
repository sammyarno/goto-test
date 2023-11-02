export type ActionButtonProps = {
  danger?: boolean;
  primary?: boolean;
  thumbnail?: boolean;
  secondary?: boolean;
};

export type ContainerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  padded?: boolean;
  style?: string;
};

export type MessageInfoProps = {
  type: "SUCCESS" | "DANGER";
};
