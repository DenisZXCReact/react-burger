export default function calcConstructorListHeight(el) {
  const h = el.getBoundingClientRect().height;

  if (h >= 464) {
    el.style.height = `464px`;
  } else if (h >= 368) {
    el.style.height = `368px`;
  } else {
    el.style.height = `272px`;
  }
}
