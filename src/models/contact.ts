export interface ContactPhone {
  id: number;
  contact_id: string;
  created_ad: string;
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
