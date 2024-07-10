type CreateAccountPayload = {
  telegramId: string;
  password: string;
  fullName: string;
};

type LoginPasswordPayload = {
  telegramId: string;
  password: string;
  token: string;
};
