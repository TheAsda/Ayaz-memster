export const setall = data => {
  return {
    type: 'SETALL',
    data: data,
  };
};

export const getall = () => {
  return {
    type: 'GETALL',
  };
};

export const setcur = (name, img) => {
  return {
    type: 'SETCUR',
    name: name,
    img: img,
  };
};
