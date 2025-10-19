import filter from 'leo-profanity';

// Настраиваем фильтр для русского языка
filter.loadDictionary('ru');

// Функция для очистки текста от нецензурных слов
export const cleanText = (text) => {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  return filter.clean(text);
};

// Функция для проверки, содержит ли текст нецензурные слова
export const containsProfanity = (text) => {
  if (!text || typeof text !== 'string') {
    return false;
  }
  
  return filter.check(text);
};

// Функция для получения списка нецензурных слов в тексте
export const getProfanityWords = (text) => {
  if (!text || typeof text !== 'string') {
    return [];
  }
  
  return filter.list(text);
};
