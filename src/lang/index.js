import i18n from 'i18n-js';

import en from './en';
import my from './my';


i18n.translations = {
	en,
	my
};
i18n.fallbacks = true;

i18n.locale = 'en';
export default i18n;