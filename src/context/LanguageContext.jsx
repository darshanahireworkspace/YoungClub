import React, { createContext, useContext, useState, useEffect } from 'react';

export const LANGUAGES = [
  { code: 'EN', name: 'English', flag: 'US', nativeName: 'English' },
  { code: 'HD', name: 'Hindi', flag: 'IN', nativeName: 'हिन्दी' },
  { code: 'TA', name: 'Tamil', flag: 'IN', nativeName: 'தமிழ்' },
  { code: 'TE', name: 'Telugu', flag: 'IN', nativeName: 'తెలుగు' },
];

export const TRANSLATIONS = {
  EN: {
    login: 'Log in',
    register: 'Register',
    loginSubtitle1: 'Please log in with your phone number or email',
    loginSubtitle2: 'If you forget your password, please contact customer service',
    registerSubtitle: 'Please register by phone number or email',
    phoneNumber: 'Phone Number',
    phoneNumberField: 'Phone number',
    registerPhone: 'Register your phone',
    email: 'Email',
    password: 'Password',
    setPassword: 'Set password',
    confirmPassword: 'Confirm password',
    inviteCode: 'Invite code',
    enterPhone: 'Please enter the phone number',
    enterEmail: 'Please enter the email address',
    enterPassword: 'Password',
    enterSetPassword: 'Set password',
    enterConfirmPassword: 'Confirm password',
    enterInviteCode: 'Please enter the invitation code',
    rememberPassword: 'Remember password',
    forgotPassword: 'Forgot password?',
    haveAccountLogin: 'I have an account Login',
    readAndAgree: 'I have read and agree',
    privacyAgreement: '【Privacy Agreement】',
    pleaseFillAll: 'Please fill in all required fields',
    passwordsDoNotMatch: 'Passwords do not match',
    phoneMustBe10Digits: 'Mobile number must be exactly 10 digits',
    welcomeBack: 'Welcome back',
    loginSuccess: 'Login successful!',
    registerSuccess: 'Account created! Welcome to Young Club! 🎉',
  },
  HD: {
    login: 'लॉग इन',
    register: 'रजिस्टर',
    loginSubtitle1: 'कृपया अपने फ़ोन नंबर या ईमेल से लॉग इन करें',
    loginSubtitle2: 'यदि आप अपना पासवर्ड भूल गए हैं, तो कृपया ग्राहक सेवा से संपर्क करें',
    registerSubtitle: 'कृपया फ़ोन नंबर या ईमेल द्वारा रजिस्टर करें',
    phoneNumber: 'फ़ोन नंबर',
    phoneNumberField: 'फ़ोन नंबर',
    registerPhone: 'अपना फ़ोन रजिस्टर करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    setPassword: 'पासवर्ड सेट करें',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    inviteCode: 'आमंत्रण कोड',
    enterPhone: 'कृपया फ़ोन नंबर दर्ज करें',
    enterEmail: 'कृपया ईमेल दर्ज करें',
    enterPassword: 'पासवर्ड',
    enterSetPassword: 'पासवर्ड सेट करें',
    enterConfirmPassword: 'पासवर्ड की पुष्टि करें',
    enterInviteCode: 'कृपया आमंत्रण कोड दर्ज करें',
    rememberPassword: 'पासवर्ड याद रखें',
    forgotPassword: 'पासवर्ड भूल गए?',
    haveAccountLogin: 'मेरा खाता है, लॉग इन करें',
    readAndAgree: 'मैंने पढ़ लिया और सहमत हूँ',
    privacyAgreement: '【गोपनीयता समझौता】',
    pleaseFillAll: 'कृपया सभी आवश्यक फ़ील्ड भरें',
    passwordsDoNotMatch: 'पासवर्ड मेल नहीं खाते',
    phoneMustBe10Digits: 'फ़ोन नंबर कम से कम 10 अंकों का होना चाहिए',
    welcomeBack: 'वापसी पर स्वागत है',
    loginSuccess: 'लॉग इन सफल रहा!',
    registerSuccess: 'पंजीकरण सफल रहा! यंग क्लब में आपका स्वागत है! 🎉',
  },
  TA: {
    login: 'உள்நுழைக',
    register: 'பதிவுசெய்க',
    loginSubtitle1: 'உங்கள் தொலைபேசி எண் அல்லது மின்னஞ்சல் மூலம் உள்நுழைக',
    loginSubtitle2: 'கடவுச்சொல்லை மறந்துவிட்டால் வாடிக்கையாளர் சேவையைத் தொடர்பு கொள்ளவும்',
    registerSubtitle: 'தொலைபேசி எண் அல்லது மின்னஞ்சல் மூலம் பதிவுசெய்க',
    phoneNumber: 'தொலைபேசி எண்',
    phoneNumberField: 'தொலைபேசி எண்',
    registerPhone: 'உங்கள் தொலைபேசியைப் பதிவுசெய்க',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    setPassword: 'கடவுச்சொல் அமைக்கவும்',
    confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    inviteCode: 'அழைப்புக் குறியீடு',
    enterPhone: 'தயவுசெய்து தொலைபேசி எண்ணை உள்ளிடவும்',
    enterEmail: 'தயவுசெய்து மின்னஞ்சலை உள்ளிடவும்',
    enterPassword: 'கடவுச்சொல்',
    enterSetPassword: 'கடவுச்சொல் அமைக்கவும்',
    enterConfirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    enterInviteCode: 'தயவுசெய்து அழைப்புக் குறியீட்டை உள்ளிடவும்',
    rememberPassword: 'கடவுச்சொல்லை நினைவில் கொள்க',
    forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
    haveAccountLogin: 'எனக்கு கணக்கு உள்ளது உள்நுழைக',
    readAndAgree: 'நான் படித்து ஒப்புக்கொண்டேன்',
    privacyAgreement: '【தனியுரிமை ஒப்பந்தம்】',
    pleaseFillAll: 'அனைத்து தேவையான விவரங்களையும் நிரப்பவும்',
    passwordsDoNotMatch: 'கடவுச்சொற்கள் பொருந்தவில்லை',
    phoneMustBe10Digits: 'தொலைபேசி எண் குறைந்தபட்சம் 10 இலக்கங்கள் இருக்க வேண்டும்',
    welcomeBack: 'மீண்டும் நல்வரவு',
    loginSuccess: 'உள்நுழைவு வெற்றிகரமானது!',
    registerSuccess: 'பதிவு வெற்றிகரமானது! யங் கிளப்பிற்கு நல்வரவு! 🎉',
  },
  TE: {
    login: 'లాగిన్',
    register: 'రిజిస్టర్',
    loginSubtitle1: 'దయచేసి మీ ఫోన్ నంబర్ లేదా ఇమెయిల్‌తో లాగిన్ అవ్వండి',
    loginSubtitle2: 'మీరు మీ పాస్‌వర్డ్‌ను మరచిపోతే, దయచేసి కస్టమర్ సేవను సంప్రదించండి',
    registerSubtitle: 'దయచేసి ఫోన్ నంబర్ లేదా ఇమెయిల్ ద్వారా నమోదు చేసుకోండి',
    phoneNumber: 'ఫోన్ నంబర్',
    phoneNumberField: 'ఫోన్ నంబర్',
    registerPhone: 'మీ ఫోన్‌ను నమోదు చేసుకోండి',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    setPassword: 'పాస్‌వర్డ్ సెట్ చేయండి',
    confirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
    inviteCode: 'ఆహ్వాన కోడ్',
    enterPhone: 'దయచేసి ఫోన్ నంబర్‌ను నమోదు చేయండి',
    enterEmail: 'దయచేసి ఇమెయిల్‌ను నమోదు చేయండి',
    enterPassword: 'పాస్‌వర్డ్',
    enterSetPassword: 'పాస్‌వర్డ్ సెట్ చేయండి',
    enterConfirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
    enterInviteCode: 'దయచేసి ఆహ్వాన కోడ్‌ను నమోదు చేయండి',
    rememberPassword: 'పాస్‌వర్డ్ గుర్తుంచుకో',
    forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    haveAccountLogin: 'నాకు ఖాతా ఉంది లాగిన్ చేయండి',
    readAndAgree: 'నేను చదివాను మరియు అంగీకరిస్తున్నాను',
    privacyAgreement: '【గోప్యతా ఒప్పందం】',
    pleaseFillAll: 'దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి',
    passwordsDoNotMatch: 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు',
    phoneMustBe10Digits: 'ఫోన్ నంబర్ కనీసం 10 అంకెలు ఉండాలి',
    welcomeBack: 'తిరిగి స్వాగతం',
    loginSuccess: 'లాగిన్ విజయవంతమైంది!',
    registerSuccess: 'రిజిస్ట్రేషన్ విజయవంతమైంది! యంగ్ క్లబ్‌కు స్వాగతం! 🎉',
  }
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('youngclub_language') || 'EN';
  });

  const changeLanguage = (code) => {
    setCurrentLanguage(code);
    localStorage.setItem('youngclub_language', code);
  };

  const t = (key) => {
    const langDict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.EN;
    return langDict[key] || TRANSLATIONS.EN[key] || key;
  };

  const activeLangObj = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        languages: LANGUAGES,
        activeLangObj,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
