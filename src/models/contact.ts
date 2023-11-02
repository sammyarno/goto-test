export interface ContactPhone {
  id: number;
  number: string;
}

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  phones: ContactPhone[];
}
