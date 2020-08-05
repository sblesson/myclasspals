import ReactGA from 'react-ga';
export const initGA = () => {
  ReactGA.initialize('UA-174905338-1');
};

export const GApageView = page => {
  ReactGA.pageview(page);
};

export const GAmodalView = modal => {
  ReactGA.modalview(modal);
};
export const GAevent = (categoryName, eventName) => {
  ReactGA.event({
    category: categoryName, // Required
    action: eventName, // Required
    label: 'labelName',
    value: 10,
    nonInteraction: false
  });
};

export const GAexception = detail => {
  ReactGA.exception({ description: detail });
};
