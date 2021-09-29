export const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

export const tempStorage = {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(sessionStorage.getItem(key));
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
  getQuestionJSON(uniqueID) {
    let current = sessionStorage.getItem(uniqueID+"CURRENT");
    return JSON.parse(sessionStorage.getItem(uniqueID+current));
  },
  getQuestionAnswerJSON(uniqueID) {
    let current = sessionStorage.getItem(uniqueID+"CURRENT");
    let answer = sessionStorage.getItem(uniqueID+current+"ANSWER");
    if (answer !==null) {
      return JSON.parse(answer);
    } else {
      return {};
    }
  }
};


export default {storage,tempStorage};
