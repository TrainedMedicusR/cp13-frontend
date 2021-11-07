import {unique} from "webpack-merge";

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
  setRTL(uniqueID,bool){
    let key = uniqueID+"RTL";
    sessionStorage.setItem(key,bool);
  },
  getRTL(uniqueID){
    return sessionStorage.getItem(uniqueID + "RTL");
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
  },
  setStartTime(uniqueID, time) {
    let key = uniqueID+"STARTTIME";
    sessionStorage.setItem(key,time);
  },
  getStartTime(uniqueID) {
    return sessionStorage.getItem(uniqueID + "STARTTIME");
  },

  setDuration(uniqueID, duration) {
    let key = uniqueID+"DURATION";
    sessionStorage.setItem(key,duration);
  },
  getDuration(uniqueID) {
    return sessionStorage.getItem(uniqueID + "DURATION");
  },

  clear() {
    sessionStorage.clear();
  }
};


export default {storage,tempStorage};
