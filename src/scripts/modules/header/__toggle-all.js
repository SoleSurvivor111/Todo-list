/* ########################### activate checkbox ########################### */
const activateCheckbox = () => {
  const setAllCheckboxes = (where, value) => {
    const checkboxes = where.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(checkboxes, (item) => {
      item.checked = !!value;
    });
  };
  const checkboxes = document.querySelectorAll('.js-todoapp');
  Array.prototype.forEach.call(checkboxes, (item) => {
    const count = item.getElementsByClassName('js-toggle').length;
    let currentCount = 0;

    item.addEventListener('change', (evt) => {
      if (evt.target.classList.contains('js-toggle-all')) {
        if (evt.target.checked) {
          setAllCheckboxes(item, true);
          currentCount = count;
        } else {
          setAllCheckboxes(item, false);
          currentCount = 0;
        }
      } else {
        if (evt.target.checked) {
          currentCount += 1;
        } else {
          currentCount -= 1;
        }

        if (currentCount === count - 1) {
          if (!evt.target.checked) {
            item.getElementsByClassName('js-toggle-all')[0].checked = false;
          }
        }
      }
    }, false);
  });
};

activateCheckbox();
