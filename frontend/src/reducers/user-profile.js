export default function () {
  return {
    user: {
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        suite: '',
        city: '',
        state: '',
        zipcode: '',
      },
    },
    community: [
      {
        id: 2,
        childName: 'Leanne Graham',
        grade: 'Apt. 556',
        classNameroom: 'Gwenborough',
        school: {
          name: 'Kulas Light',
          street: 'Apt. 556',
          suite: 'Apt. 556',
          city: 'Apt. 556',
          state: 'California',
          zipcode: '92998-3874',
        },
      },
    ],
    isTandCAccepted: false,
  };
}
