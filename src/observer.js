const Observer = (element) => {
  const observerConfig = {
    attributes: true,
    attributeOldValue: true,
    childList: true,
    subtree: true,
  };

  const callback = (mutationList, observer) => {
    for (let mutation of mutationList) {
      if (mutation.type === "childList") {
        console.log("Child node has been added or removed");
      } else if (mutation.type === "attributes") {
        console.log(`The ${mutation.attributeName} attribute was added`);
      } else {
        console.log(mutation, observer);
      }

      console.log(mutation.target.mId);
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(element, observerConfig);

  return observer;
};

export default Observer;
