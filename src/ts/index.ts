const clickEvent = () => {
  alert("test");
};

document.querySelector(".test")?.addEventListener("click", () => {
  clickEvent();
});
