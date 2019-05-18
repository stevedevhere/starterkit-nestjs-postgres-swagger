export interface JWTResponse {
  scope: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  access_token: string;
}
