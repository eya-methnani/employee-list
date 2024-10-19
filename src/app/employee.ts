export interface Employee {
    id: number | string;             // Can be number or string based on your data
    age: number | string | null;     // Age can be number, string or null
    dob: string | null;              // Date of birth can be string or null
    email: string;                   // Email is always a string
    salary: number | string | null;  // Salary can be number, string, or null
    address: string;                 // Address is always a string
    imageUrl: string | null;         // Image URL can be string or null
    lastName: string;                // Last name is always a string
    firstName: string;               // First name is always a string
    contactNumber: string | number | null; // Contact number can be string, number, or null
  }