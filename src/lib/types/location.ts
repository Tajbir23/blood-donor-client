export interface Thana {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
  thanas: Thana[];
}

export interface Division {
  id: string;
  name: string;
  districts: District[];
} 