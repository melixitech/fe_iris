const LOCAL_STORAGE_KEY = 'IRIS_DATA';

export const LStorage = {
  keyName(key) {
    return LOCAL_STORAGE_KEY + '_' + key;
  },
  read(key) {
    const name = this.keyName(key);
    let rt = localStorage.getItem(name);
    if (!rt) rt = '';
  },
  readObj(key, defaultValue = {}) {
    let str = this.read(key);
    let rt = defaultValue;
    if (str != '') {
      try {
        rt = JSON.parse(str);
      } catch (e) {}
    }
    return rt;
  },
  save(key, val) {
    const name = this.keyName(key);
    if (val) {
      localStorage.setItem(name, val);
      return true;
    } else {
      return false;
    }
  },
  saveObj(key, objA) {
    let val = '';
    try {
      val = JSON.stringify(objA);
    } catch (e) {}
    if (val != '') {
      return this.save(key, val);
    }
    return false;
  },
  delete(key) {
    const name = this.keyName(key);
    localStorage.removeItem(name);
  },
};
