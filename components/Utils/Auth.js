import * as Keychain from 'react-native-keychain';

export const SaveUserInfo = async (name, email, mobile, password) => {
  try {
    const userObject = { 
      name: name, 
      email: email, 
      mobile: mobile,
      password:password,
    };

    const jsonString = JSON.stringify(userObject);

    await Keychain.setGenericPassword('current_user', jsonString, { 
      service: 'user_profile_data' 
    });
    
    console.log('User info saved successfully');
    return true;
  } catch (error) {
    console.log('Error saving user info', error);
    return false;
  }
};

export const GetUserInfo = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({ 
      service: 'user_profile_data' 
    });

    if (credentials) {
      const userObject = JSON.parse(credentials.password);
      return userObject; 
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error getting user info', error);
    return null;
  }
};

export const LogoutUser = async () => {
  try {
    await Keychain.resetGenericPassword();

    await Keychain.resetGenericPassword({ service: 'user_profile_data' });

    return true;
  } catch (error) {
    return false;
  }
};