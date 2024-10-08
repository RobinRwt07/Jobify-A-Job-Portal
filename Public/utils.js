
export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.length === 0) {
    return "Please Enter Your Email";
  }
  else if (!regex.test(email)) {
    return "Please Provide Valid Email Address";
  }
  else {
    return false
  }
}

export const validatePassword = (password) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (password.length === 0) {
    return "Please Enter Your Password";
  }
  else if (password.length < 8) {
    return "Password should be at least 8 Character long";
  }
  else if (!regex.test(password)) {
    return "Password Should contain at least one special symbol,digit and capital letter";
  }
  else {
    return false;
  }
}

export const validateName = (name) => {
  const regex = /(^[a-zA-Z\s]{0,20}$)/;
  if (name.length === 0) {
    return "Name field Should not be empty";
  }
  else if (!regex.test(name)) {
    return "Name should only contain letter.";
  }
  else {
    return false;
  }
}


export const generateRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const statesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];