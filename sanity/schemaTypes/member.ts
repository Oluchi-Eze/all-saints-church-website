export default {
  name: 'member',
  title: 'Members',
  type: 'document',
  fields: [
    { name: 'fullName', title: 'Full Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    {
      name: 'membershipType',
      title: 'Membership Classification',
      type: 'string',
      options: {
        list: [
          { title: 'Full Member', value: 'Full Member' },
          { title: 'Associate Member', value: 'Associate Member' },
          { title: 'Honorary Member', value: 'Honorary Member' },
        ],
      },
    },
    {
  name: 'birthMonth',
  title: 'Birth Month',
  type: 'number',
  options: {
    list: [
      { title: 'January', value: 1 }, { title: 'February', value: 2 },
      { title: 'March', value: 3 }, { title: 'April', value: 4 },
      { title: 'May', value: 5 }, { title: 'June', value: 6 },
      { title: 'July', value: 7 }, { title: 'August', value: 8 },
      { title: 'September', value: 9 }, { title: 'October', value: 10 },
      { title: 'November', value: 11 }, { title: 'December', value: 12 },
    ],
  },
},
{
  name: 'birthDay',
  title: 'Birth Day',
  type: 'number',
},
{
  name: 'emailOptIn',
  title: 'Birthday Email Opt-in',
  type: 'boolean',
  initialValue: true,
},
{
  name: 'status',
  title: 'Status',
  type: 'string',
  initialValue: 'pending',
  options: {
    list: [
      { title: 'Pending Review', value: 'pending' },
      { title: 'Approved / Active', value: 'approved' },
      { title: 'Archived', value: 'archived' },
    ],
    layout: 'radio', // This makes it look like a list of options
  },
},  ],
}