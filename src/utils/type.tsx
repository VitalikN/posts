export interface ErrorFeedbackProps {
  name: string;
}
export type FormValuesAdd = {
  title: string;
  datetime: string;
};
export interface ErrorFeedbackProps {
  name: string;
}
export interface FormValues {
  username?: string;
  email: string;
  password: string;
}

export interface FormValueslogin {
  name?: string;
  identifier: string;
  password: string;
}

export interface UserData {
  attributes: {
    username: string;
  };
}

export interface Post {
  id: string;
  attributes: {
    title: string;
    datetime: string;
    user: {
      data: UserData | null;
    };
  };
}
export interface PostId {
  id: string;
}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}
