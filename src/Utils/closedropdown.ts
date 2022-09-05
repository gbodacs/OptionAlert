export default function closeDropDown() {
  if (document !== null) {
    // Close the UL list
    if (document.activeElement !== document.body) (document.activeElement as HTMLElement).blur();
  }
}
