export interface ICustomer {
  addressList?: CustomerList[];
}

export interface CustomerList {
  id: string;
  data: CustomerData;
}
export interface CustomerData {
  city: string;
  email: string;
  firstName: string;
  surname: string;
}
