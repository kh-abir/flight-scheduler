export const GENDER = [
  'Not specified',
  'Male',
  'Female',
  'Transgender man/trans man/female-to-male (FTM)',
  'Transgender woman/trans woman/male-to-female (MTF)',
  'Genderqueer/gender nonconforming neither exclusively male nor female',
  'Additional gender category or other (please specify)',
  'Decline to answer',
]

export const PREFERRED_PHONE = [
  { name: 'Home', value: 'homephone' },
  { name: 'Mobile', value: 'mobilephone' },
  { name: 'Work', value: 'workphone' },
  { name: 'Other', value: 'otherphone' },
]

export const MOBILE_MESSAGES = [
  'No Messages',
  'Voice Messages',
  'Text Messages',
  'Text & Voice Messages',
]

export const PHONE_MESSAGES = ['No Messages', 'Voice Messages']

export default { GENDER, PREFERRED_PHONE, MOBILE_MESSAGES, PHONE_MESSAGES }
