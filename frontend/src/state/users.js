import { atom } from 'recoil';

const userAddressAtom = atom({
  key: "userAddress",
  default: localStorage.getItem('userAddress'),
})

const accessTokenAtom = atom({
  key: "accessToken",
  default: localStorage.getItem('accessToken'),
})

export {
    userAddressAtom,
    accessTokenAtom
};